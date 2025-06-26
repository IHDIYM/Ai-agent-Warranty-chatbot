import React, { useState, useCallback } from 'react';
import { Message, ChatState } from '../types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Header from './Header';
import ChatControls from './ChatControls';
import PurchaseNav from './PurchaseNav';
import { sendMessage } from '../api/chatService';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../App';

interface ChatInterfaceProps {
  user: UserType;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user }) => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });

  const addMessage = useCallback((content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date(),
    };

    setChatState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, newMessage],
      error: null,
    }));

    return newMessage;
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    addMessage(content, 'user');

    setChatState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendMessage(content, user._id, user.name);
      addMessage(response, 'bot');
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to get response';
      
      setChatState((prevState) => ({
        ...prevState,
        error: errorMessage,
      }));
      
      addMessage(
        "I'm sorry, I couldn't process your request at this time. Please try again later.",
        'bot'
      );
    } finally {
      setChatState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [addMessage, user._id, user.name]);

  const handleResetChat = useCallback(() => {
    setChatState({
      messages: [],
      isLoading: false,
      error: null,
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <PurchaseNav userId={user.name} />
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <div className="flex-1 overflow-hidden relative">
          <ChatControls 
            onResetChat={handleResetChat}
            messagesCount={chatState.messages.length}
          />
          <MessageList 
            messages={chatState.messages} 
            isLoading={chatState.isLoading} 
          />
        </div>
        <MessageInput 
          onSendMessage={handleSendMessage} 
          isLoading={chatState.isLoading} 
        />
      </div>
    </div>
  );
};

export default ChatInterface;