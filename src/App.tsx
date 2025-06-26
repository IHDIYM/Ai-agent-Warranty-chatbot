import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';
import Auth from './components/Auth';

export type UserType = {
  _id: string;
  name: string;
  email: string;
  whatsapp: string;
  role: 'user' | 'technician';
};

function App() {
  const [user, setUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ChatInterface user={user} />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
        <Route
          path="/auth"
          element={
            !user ? (
              <Auth setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;