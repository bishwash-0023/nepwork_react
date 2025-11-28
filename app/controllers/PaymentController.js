import api from "@/app/services/api";

// Helper: format currency
const formatCurrency = (amount) =>
	`$${parseFloat(amount || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Helper: transform transaction
const transformTransaction = (tx) => ({
	id: tx.id,
	userId: tx.user?.id,
	userName: tx.user_name || tx.user?.full_name,
	amount: parseFloat(tx.amount),
	formattedAmount: tx.type === "credit" ? `+$${tx.amount}` : `-$${tx.amount}`,
	type: tx.type,
	description: tx.description,
	status: tx.status,
	createdAt: tx.created_at,
	date: tx.created_at?.split("T")[0] || null,
});

export const paymentController = {
	// Get transactions
	async getTransactions(filters = {}) {
		try {
			const params = {};
			if (filters.page) params.page = filters.page;
			if (filters.type) params.type = filters.type;
			if (filters.status) params.status = filters.status;

			const { data } = await api.get("/api/transactions/", { params });
			const txs = data.results || data;
			return {
				count: data.count || txs.length,
				results: txs.map(transformTransaction),
			};
		} catch {
			return { count: 0, results: [] };
		}
	},

	// Get wallet balance
	async getWalletBalance() {
		try {
			const { data } = await api.get("/api/wallet/balance/");
			return {
				balance: parseFloat(data.balance),
				formattedBalance: formatCurrency(data.balance),
			};
		} catch {
			return { balance: 0, formattedBalance: "$0.00" };
		}
	},

	// Get payment stats
	async getPaymentStats() {
		try {
			const [wallet, txData] = await Promise.all([
				this.getWalletBalance(),
				this.getTransactions(),
			]);
			let totalEarnings = 0,
				pending = 0;
			txData.results.forEach((tx) => {
				if (tx.type === "credit" && tx.status === "completed")
					totalEarnings += tx.amount;
				if (tx.status === "pending") pending += tx.amount;
			});
			return {
				availableBalance: wallet.balance,
				formattedAvailableBalance: wallet.formattedBalance,
				pendingClearance: pending,
				formattedPendingClearance: formatCurrency(pending),
				totalEarnings,
				formattedTotalEarnings: formatCurrency(totalEarnings),
			};
		} catch {
			return {
				availableBalance: 0,
				formattedAvailableBalance: "$0.00",
				pendingClearance: 0,
				formattedPendingClearance: "$0.00",
				totalEarnings: 0,
				formattedTotalEarnings: "$0.00",
			};
		}
	},

	// Withdraw funds
	async withdrawFunds(amount, method) {
		try {
			const { data } = await api.post("/api/wallet/withdraw/", {
				amount: String(amount),
				method,
			});
			return { success: true, transaction: transformTransaction(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Withdrawal failed",
			};
		}
	},

	// Add funds
	async addFunds(amount, method) {
		try {
			const { data } = await api.post("/api/wallet/deposit/", {
				amount: String(amount),
				method,
			});
			return { success: true, transaction: transformTransaction(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Deposit failed",
			};
		}
	},
};
