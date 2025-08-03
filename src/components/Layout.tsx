import React from 'react';
import { ShoppingCart, Heart, User, Search, Menu, Package } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { signOut } from '../lib/supabase';

interface LayoutProps {
  children: React.ReactNode;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Package className="h-8 w-8 text-slate-800" />
              <span className="ml-2 text-xl font-bold text-slate-800">EliteStore</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="Search products..."
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  <button 
                    onClick={() => onPageChange?.('wishlist')}
                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    <Heart className="h-6 w-6" />
                  </button>
                  <button 
                    onClick={() => onPageChange?.('cart')}
                    className="p-2 text-gray-600 hover:text-emerald-600 transition-colors relative"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => onPageChange?.('profile')}
                      className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span className="hidden sm:block">{user.email}</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => onPageChange?.('auth')}
                    className="text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => onPageChange?.('auth')}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        {user && (
          <div className="border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8">
                <button
                  onClick={() => onPageChange?.('products')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    currentPage === 'products'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => onPageChange?.('orders')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    currentPage === 'orders'
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Orders
                </button>
                {user.user_metadata?.role === 'admin' && (
                  <button
                    onClick={() => onPageChange?.('admin')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      currentPage === 'admin'
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Admin Dashboard
                  </button>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;