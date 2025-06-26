import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ChatControlsProps {
  onResetChat: () => void;
  messagesCount: number;
}

const ChatControls: React.FC<ChatControlsProps> = ({ onResetChat, messagesCount }) => {
  if (messagesCount === 0) return null;
  
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={onResetChat}
        className="flex items-center gap-1 bg-white/90 hover:bg-white text-gray-700 px-3 py-1.5 rounded-full text-sm shadow-sm border border-gray-200 transition-colors"
        title="Reset conversation"
        data-testid="reset-button"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default ChatControls;