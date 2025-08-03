import React from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderHistory: React.FC = () => {
  const orders = [
    {
      id: 'ORD-1001',
      date: '2024-01-15',
      status: 'delivered',
      total: 449.98,
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 299.99 },
        { name: 'Mechanical Gaming Keyboard', quantity: 1, price: 149.99 }
      ]
    },
    {
      id: 'ORD-1002',
      date: '2024-01-18',
      status: 'shipped',
      total: 199.99,
      items: [
        { name: 'Smart Fitness Watch', quantity: 1, price: 199.99 }
      ]
    },
    {
      id: 'ORD-1003',
      date: '2024-01-20',
      status: 'processing',
      total: 49.99,
      items: [
        { name: 'Wireless Charging Stand', quantity: 1, price: 49.99 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Package className="h-5 w-5 text-amber-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm">
                    Reorder
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600">Start shopping to see your orders here!</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;