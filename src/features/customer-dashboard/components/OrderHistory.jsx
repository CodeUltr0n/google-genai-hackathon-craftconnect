import React from 'react';

// A reusable component for the section header
const PageHeader = ({ title, subtitle }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500 mt-2 text-lg">{subtitle}</p>
    </div>
);

// The Order History component
const OrderHistory = () => {
    // Mock data for demonstration
    const orders = [
        { id: 'BB-2025-0910', date: 'Sep 10, 2025', item: 'Bandhani Silk Dupatta', price: 3200, status: 'Processing' },
        { id: 'BB-2025-0901', date: 'Sep 1, 2025', item: 'Hand-Painted Madhubani Saree', price: 4500, status: 'Delivered' },
        { id: 'BB-2025-0825', date: 'Aug 25, 2025', item: 'Terracotta Clay Diyas (Set of 12)', price: 850, status: 'Delivered' },
        { id: 'BB-2025-0819', date: 'Aug 19, 2025', item: 'Pattachitra Scroll Painting', price: 2200, status: 'Delivered' },
    ];

    // Helper function to get the correct color for the status chip
    const getStatusChip = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <PageHeader title="Order History" subtitle="Review your past purchases and track current ones." />
            <div className="bg-white rounded-lg shadow-sm">
                <div className="divide-y divide-gray-200">
                    {orders.map(order => (
                        <div key={order.id} className="p-6 grid grid-cols-4 items-center gap-4 hover:bg-gray-50 transition-colors">
                            <div>
                                <p className="font-semibold text-gray-800">{order.item}</p>
                                <p className="text-sm text-gray-500">Order #{order.id}</p>
                            </div>
                            <p className="text-gray-600 text-sm text-center">{order.date}</p>
                            <div className="text-center">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusChip(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>
                            <p className="text-right font-semibold text-gray-800">₹{order.price.toLocaleString('en-IN')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;