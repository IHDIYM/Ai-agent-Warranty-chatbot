# Warranty Assistant Frontend

A React-based frontend for the AI-powered warranty chatbot application.

## Features

- **User Authentication**: Sign up and login for users and technicians
- **Real-time Chat**: Interactive chat interface with the warranty AI assistant
- **Responsive Design**: Modern UI built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing for seamless navigation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Lucide React** for icons
- **UUID** for unique identifiers

## Backend Integration

This frontend connects to the deployed backend at:
- **Backend URL**: `https://warranty-backend.onrender.com`
- **API Endpoints**:
  - `/api/auth` - User authentication
  - `/api/users` - User registration
  - `/api/query` - Chat messages
  - `/api/chat-history` - Chat history retrieval

## Development

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

No environment variables are required for the frontend as all API URLs are hardcoded to the deployed backend.

## Deployment

This frontend is deployed on **Netlify** at:
- **URL**: `https://waaranty-assistant.netlify.app`
- **Auto-deploy**: Enabled on push to main branch

## Project Structure

```
src/
├── api/
│   └── chatService.ts      # Chat API service
├── components/
│   ├── Auth.tsx           # Authentication component
│   ├── ChatInterface.tsx  # Main chat interface
│   ├── Header.tsx         # Application header
│   ├── Message.tsx        # Individual message component
│   ├── MessageInput.tsx   # Message input component
│   ├── MessageList.tsx    # Message list component
│   ├── ChatControls.tsx   # Chat control buttons
│   └── PurchaseNav.tsx    # Purchase navigation
├── lib/
│   └── mongodb.ts         # User authentication API service
├── types/
│   └── index.ts           # TypeScript type definitions
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## API Integration

The frontend communicates with the backend through RESTful APIs:

### Authentication
- **POST** `/api/auth` - User login
- **POST** `/api/users` - User registration

### Chat
- **POST** `/api/query` - Send chat message
- **GET** `/api/chat-history/:userId` - Get chat history
- **GET** `/api/chat-history/:userId/:sessionId` - Get specific chat session

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the backend is running at `https://warranty-backend.onrender.com`
2. **CORS Errors**: Backend CORS is configured to allow the Netlify domain
3. **Build Errors**: Check that all dependencies are installed with `npm install`

### Development vs Production

- **Development**: Uses Vite dev server with hot reload
- **Production**: Built with Vite and served by Netlify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Warranty Assistant application. 