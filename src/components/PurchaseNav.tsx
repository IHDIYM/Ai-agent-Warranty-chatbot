import React, { useEffect, useState } from 'react';
import { Package, ChevronRight } from 'lucide-react';
import { getUserPurchases } from '../lib/mongodb';
import { Purchase } from '../types';

interface PurchaseNavProps {
  userId: string;
}

const PurchaseNav: React.FC<PurchaseNavProps> = ({ userId }) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getUserPurchases(userId);
        setPurchases(data);
      } catch (err) {
        setError('Failed to load purchases');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchases();
  }, [userId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: Purchase['status']) => {
    switch (status) {
      case 'active':
        return 'text-green-600';
      case 'expired':
        return 'text-red-600';
      case 'claimed':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border-r border-gray-200 w-64 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border-r border-gray-200 w-64 p-4">
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isExpanded ? 'w-80' : 'w-16'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-600" />
          {isExpanded && <span className="font-medium">Recent Purchases</span>}
        </div>
        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4">
          {purchases.length === 0 ? (
            <div className="text-sm text-gray-500 text-center py-4">
              No purchases found
            </div>
          ) : (
            purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{purchase.productName}</span>
                  <span className={`text-xs font-medium ${getStatusColor(purchase.status)}`}>
                    {purchase.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Brand: {purchase.brand}</div>
                  <div>Type: {purchase.productType}</div>
                  <div>Purchased: {formatDate(purchase.purchaseDate)}</div>
                  <div>Warranty until: {formatDate(purchase.warrantyEndDate)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PurchaseNav; 