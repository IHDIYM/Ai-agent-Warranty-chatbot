/**
 * Service for handling chat-related API requests
 */

const API_URL = 'https://warranty-backend.onrender.com/api/query';
const API_BASE_URL = 'https://warranty-backend.onrender.com';

interface ChatSession {
  _id: string;
  user_id: string;
  username: string;
  active: boolean;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  created_at: string;
  updated_at: string;
  login_time: string;
}

interface ChatHistoryResponse {
  sessions: ChatSession[];
  total_sessions: number;
}

export const sendMessage = async (prompt: string, userId: string, username: string): Promise<string> => {
  if (!userId) {
    throw new Error('No user ID provided');
  }
  if (!username) {
    throw new Error('No username provided');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ prompt, userId, username }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to get response from assistant';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If parsing JSON fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    }
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getChatHistory = async (userId: string): Promise<ChatHistoryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat-history/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat history');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

export const getChatSession = async (userId: string, sessionId: string): Promise<ChatSession> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat-history/${userId}/${sessionId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chat session');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching chat session:', error);
    throw error;
  }
};