import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Auth from './components/Auth';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import OrderHistory from './components/OrderHistory';

function App() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('products');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth onSuccess={() => setCurrentPage('products')} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'products':
        return <ProductGrid />;
      case 'cart':
        return <Cart />;
      case 'orders':
        return <OrderHistory />;
      case 'admin':
        return user.user_metadata?.role === 'admin' ? <AdminDashboard /> : <ProductGrid />;
      default:
        return <ProductGrid />;
    }
  };

  return (
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;