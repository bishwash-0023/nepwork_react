'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function DisputePage() {
  const disputes = [
    { id: 1, job: 'Mobile App Development', freelancer: 'John Doe', date: '2023-11-01', status: 'Open', reason: 'Incomplete work' },
    { id: 2, job: 'SEO Audit', freelancer: 'Jane Smith', date: '2023-10-15', status: 'Resolved', reason: 'Communication issues' },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dispute Center</h1>
                <button className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                    File a New Dispute
                </button>
            </div>

            <div className="bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How Disputes Work</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    If you have an issue with a contract that cannot be resolved directly with the other party, you can file a dispute. 
                    Our support team will review the evidence provided by both parties and make a binding decision. 
                    We encourage you to communicate and try to resolve issues amicably before filing a dispute.
                </p>
            </div>
            
            <div className="bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">My Disputes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">ID</th>
                                <th className="px-6 py-3 font-medium">Job Title</th>
                                <th className="px-6 py-3 font-medium">Counterparty</th>
                                <th className="px-6 py-3 font-medium">Date Filed</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {disputes.map((dispute) => (
                                <tr key={dispute.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-900 dark:text-white">#{dispute.id}</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{dispute.job}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{dispute.freelancer}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{dispute.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            dispute.status === 'Open' 
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                                            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                        }`}>
                                            {dispute.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary font-bold hover:underline">View Details</button>
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
