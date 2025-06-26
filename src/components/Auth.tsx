import React, { useState } from 'react';
import { Shield, UserCog } from 'lucide-react';
import { authenticate, createUser } from '../lib/mongodb';
import { UserType } from '../App';

interface AuthProps {
  setUser: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ setUser }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isTechnician, setIsTechnician] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let user;
      if (isSignUp && !isTechnician) {
        user = await createUser(name, email, whatsapp);
      } else {
        user = await authenticate(email, whatsapp, isTechnician);
        if (!user) {
          throw new Error('Invalid credentials');
        }
      }

      if (!user) {
        throw new Error('Failed to create/authenticate user');
      }

      // Ensure user has required fields
      const userData: UserType = {
        _id: user._id || String(Date.now()),
        name: user.name,
        email: user.email,
        whatsapp: user.whatsapp,
        role: isTechnician ? 'technician' : 'user'
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          {isTechnician ? (
            <UserCog className="h-12 w-12 text-blue-600" />
          ) : (
            <Shield className="h-12 w-12 text-blue-600" />
          )}
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isTechnician 
            ? 'Technician Login'
            : isSignUp 
              ? 'Create your account' 
              : 'Sign in to your account'
          }
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Role Toggle */}
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setIsTechnician(!isTechnician);
                setIsSignUp(false); // Always show login for technicians
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                isTechnician
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isTechnician ? 'Switch to User Login' : 'Switch to Technician Login'}
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && !isTechnician && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isSignUp && !isTechnician}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <div className="mt-1">
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Processing...' : isTechnician ? 'Login as Technician' : (isSignUp ? 'Sign up' : 'Sign in')}
              </button>
            </div>
          </form>

          {!isTechnician && (
            <div className="mt-6">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;