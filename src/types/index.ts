export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface Purchase {
  _id: string;
  userId: string;
  productName: string;
  productType: string;
  purchaseDate: string;
  warrantyEndDate: string;
  modelNumber?: string;
  serialNumber?: string;
  brand: string;
  status: 'active' | 'expired' | 'claimed';
}