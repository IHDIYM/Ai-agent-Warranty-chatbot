// This file should be replaced with API calls to your backend
// Example interface for type safety
interface User {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: 'user' | 'technician';
  createdAt: Date;
}

const API_BASE_URL = 'https://warranty-backend.onrender.com';

export const authenticate = async (email: string, whatsapp: string, isTechnician: boolean = false): Promise<User | null> => {
  // Replace with actual API call to your backend
  const response = await fetch(`${API_BASE_URL}/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, whatsapp, isTechnician }),
  });
  
  if (!response.ok) return null;
  return response.json();
};

export const createUser = async (name: string, email: string, whatsapp: string): Promise<User | null> => {
  // Replace with actual API call to your backend
  const response = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, whatsapp }),
  });
  
  if (!response.ok) return null;
  return response.json();
};

export const getUserPurchases = async (userId: string): Promise<Purchase[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/purchases/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch purchases');
    }
    const data = await response.json();
    return data.purchases;
  } catch (error) {
    console.error('Error fetching purchases:', error);
    throw error;
  }
};