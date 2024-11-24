import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { consultations } from '../lib/api';
import { format } from 'date-fns';

export default function ConsultationChat() {
  const { consultationId } = useParams();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');

  const { data: consultation } = useQuery({
    queryKey: ['consultation', consultationId],
    queryFn: () => consultations.getById(consultationId!),
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      consultations.sendMessage(consultationId!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultation', consultationId] });
      setMessage('');
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessageMutation.mutate({ content: message });
  };

  if (!consultation) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold">Consultation Chat</h2>
          <p className="text-gray-600">
            {format(new Date(consultation.date), 'PPP')} at {consultation.timeSlot.start}
          </p>
        </div>

        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {consultation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-lg ${
                msg.senderId === consultation.userId
                  ? 'bg-indigo-100 ml-auto'
                  : 'bg-gray-100'
              } max-w-[80%]`}
            >
              <p className="text-sm text-gray-600">
                {format(new Date(msg.timestamp), 'p')}
              </p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={sendMessageMutation.isPending}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}