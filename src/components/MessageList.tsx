import React, { useEffect, useRef } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: MessageType[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto p-4" data-testid="message-list">
      <div className="flex flex-col min-h-full">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center text-gray-500 max-w-md">
              <h3 className="text-lg font-semibold mb-2">Welcome to Warranty Assistant</h3>
              <p className="mb-4">
                Ask about your product warranty eligibility. Describe your device issue and include details like:
              </p>
              <ul className="text-sm text-left list-disc px-4 mb-4 space-y-1">
                <li>Product type (TV, refrigerator, etc.)</li>
                <li>Problem description</li>
                <li>When the issue started</li>
                <li>Any physical damage</li>
                <li>Purchase date (if relevant)</li>
              </ul>
              <p className="text-sm italic">Example: "My Samsung TV has lines on the screen after 14 months of use"</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-start mt-4">
            <div className="bg-gray-100 rounded-lg rounded-tl-none p-4 flex items-center space-x-2 text-gray-500 animate-pulse">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Assistant is thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;