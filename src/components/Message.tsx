import React from 'react';
import { Message as MessageType } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  // Extract emoji status from bot message if present
  const hasCheckmark = isBot && message.content.includes('✅');
  const hasCross = isBot && message.content.includes('❌');
  
  // Format message content to remove emoji if present
  const formattedContent = isBot 
    ? message.content.replace(/^(✅|❌)\s*/, '') 
    : message.content;

  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
      data-testid={`message-${message.id}`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 ${
          isBot 
            ? 'bg-gray-100 text-gray-800 rounded-tl-none' 
            : 'bg-blue-600 text-white rounded-tr-none'
        } shadow-sm`}
      >
        {isBot && (hasCheckmark || hasCross) && (
          <div className="flex items-center mb-2 font-semibold">
            {hasCheckmark && (
              <span className="flex items-center text-emerald-600">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span>Eligible for Warranty</span>
              </span>
            )}
            {hasCross && (
              <span className="flex items-center text-red-600">
                <XCircle className="w-5 h-5 mr-1" />
                <span>Not Eligible</span>
              </span>
            )}
          </div>
        )}
        <p className="break-words">{formattedContent}</p>
        <div className={`text-xs mt-1 ${isBot ? 'text-gray-500' : 'text-blue-200'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default Message;