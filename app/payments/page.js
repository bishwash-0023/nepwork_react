"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { paymentController } from "@/app/controllers/PaymentController";

export default function PaymentsPage() {
	const [transactions, setTransactions] = useState([]);
	const [stats, setStats] = useState({
		availableBalance: 0,
		formattedAvailableBalance: "$0.00",
		pendingClearance: 0,
		formattedPendingClearance: "$0.00",
		totalEarnings: 0,
		formattedTotalEarnings: "$0.00",
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPaymentData();
	}, []);

	const fetchPaymentData = async () => {
		setLoading(true);
		try {
			const [txResponse, statsData] = await Promise.all([
				paymentController.getTransactions(),
				paymentController.getPaymentStats(),
			]);
			setTransactions(txResponse.results || []);
			setStats(statsData);
		} catch (error) {
			console.error("Failed to fetch payment data:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<DashboardLayout>
			<div className='min-h-screen bg-background-light dark:bg-background-dark p-4 md:p-8'>
				<div className='max-w-5xl mx-auto'>
					<h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
						Payments & Transactions
					</h1>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
						<div className='bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
							<p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>
								Available Balance
							</p>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mt-2'>
								{loading
									? "..."
									: stats.formattedAvailableBalance}
							</h2>
							<button className='mt-4 w-full py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors'>
								Withdraw Funds
							</button>
						</div>
						<div className='bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
							<p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>
								Pending Clearance
							</p>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mt-2'>
								{loading
									? "..."
									: stats.formattedPendingClearance}
							</h2>
							<p className='text-xs text-gray-400 mt-4'>
								Funds in escrow or processing
							</p>
						</div>
						<div className='bg-white dark:bg-[#192430] p-6 rounded-xl border border-gray-200 dark:border-gray-700'>
							<p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>
								Total Earnings
							</p>
							<h2 className='text-3xl font-bold text-gray-900 dark:text-white mt-2'>
								{loading ? "..." : stats.formattedTotalEarnings}
							</h2>
							<p className='text-xs text-green-500 font-bold mt-4'>
								Lifetime earnings
							</p>
						</div>
					</div>

					<div className='bg-white dark:bg-[#192430] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
						<div className='p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center'>
							<h3 className='font-bold text-lg text-gray-900 dark:text-white'>
								Transaction History
							</h3>
							<button className='text-primary text-sm font-bold hover:underline'>
								Download CSV
							</button>
						</div>
						{loading ? (
							<div className='p-8 text-center text-gray-500'>
								Loading transactions...
							</div>
						) : transactions.length > 0 ? (
							<div className='overflow-x-auto'>
								<table className='w-full text-left text-sm'>
									<thead className='bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
										<tr>
											<th className='px-6 py-3 font-medium'>
												Date
											</th>
											<th className='px-6 py-3 font-medium'>
												Description
											</th>
											<th className='px-6 py-3 font-medium'>
												Status
											</th>
											<th className='px-6 py-3 font-medium text-right'>
												Amount
											</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
										{transactions.map((tx) => (
											<tr
												key={tx.id}
												className='hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors'
											>
												<td className='px-6 py-4 text-gray-900 dark:text-white'>
													{tx.date}
												</td>
												<td className='px-6 py-4 text-gray-900 dark:text-white font-medium'>
													{tx.description}
												</td>
												<td className='px-6 py-4'>
													<span
														className={`px-2 py-1 rounded-full text-xs font-bold ${
															tx.status ===
															"completed"
																? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
																: tx.status ===
																	  "pending"
																	? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
																	: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
														}`}
													>
														{tx.status
															?.charAt(0)
															.toUpperCase() +
															tx.status?.slice(1)}
													</span>
												</td>
												<td
													className={`px-6 py-4 text-right font-bold ${tx.type === "credit" ? "text-green-500" : "text-gray-900 dark:text-white"}`}
												>
													{tx.formattedAmount}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className='p-8 text-center text-gray-500'>
								No transactions yet
							</div>
						)}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
