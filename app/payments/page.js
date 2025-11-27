'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function PaymentsPage() {
  const transactions = [
    { id: 1, date: '2023-10-25', description: 'Payment for "Logo Design"', amount: '-$300.00', status: 'Completed', type: 'debit' },
    { id: 2, date: '2023-10-20', description: 'Deposit from PayPal', amount: '+$1,000.00', status: 'Completed', type: 'credit' },
    { id: 3, date: '2023-10-15', description: 'Escrow release for "React App"', amount: '-$2,500.00', status: 'Completed', type: 'debit' },
    { id: 4, date: '2023-10-10', description: 'Refund for "SEO Audit"', amount: '+$50.00', status: 'Processed', type: 'credit' },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Payments & Transactions</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Available Balance</p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">$1,250.00</h2>
                    <button className="mt-4 w-full py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Withdraw Funds
                    </button>
                </div>
                <div className="bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Pending Clearance</p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">$450.00</h2>
                    <p className="text-xs text-gray-400 mt-4">Available on Nov 30, 2023</p>
                </div>
                <div className="bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Earnings</p>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">$15,400.00</h2>
                    <p className="text-xs text-green-500 font-bold mt-4">+12% this month</p>
                </div>
            </div>

            <div className="bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">Transaction History</h3>
                    <button className="text-primary text-sm font-bold hover:underline">Download CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Description</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-900 dark:text-white">{tx.date}</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{tx.description}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-bold ${tx.type === 'credit' ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>
                                        {tx.amount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
