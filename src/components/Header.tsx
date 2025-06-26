import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import { UserType } from '../App';

interface HeaderProps {
  user: UserType;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/auth';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-6 shadow-md">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Warranty Assistant</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium hidden sm:block">
            Welcome, {user.name}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1 text-white/90 hover:text-white"
            title="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;