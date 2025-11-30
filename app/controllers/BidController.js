import api from "@/app/services/api";

/**
 * BidController - New controller for bid management
 *
 * Endpoints (from z_readmes/bids.md):
 * - POST /bids/new - Create a new bid
 * - GET /bids/list/{job_id}/ - List all bids for a job
 * - PUT/PATCH /bids/update/{id}/ - Update a bid
 * - DELETE /bids/delete/{id}/ - Withdraw a bid
 * - GET /bids/mine/ - Get all bids by current user
 * - GET /bids/user/{user_id}/ - List bids by a user (admin only)
 * - POST /bids/accept/{id}/ - Accept a bid
 * - POST /bids/reject/{id}/ - Reject a bid
 *
 * Bid Status Options:
 * - pending: Awaiting decision
 * - accepted: Bid accepted
 * - rejected: Bid rejected
 * - withdrawn: Bidder withdrew bid
 */

// Helper: relative time
const getRelativeTime = (dateString) => {
	if (!dateString) return "";
	const diff = Date.now() - new Date(dateString).getTime();
	const mins = Math.floor(diff / 60000);
	const hours = Math.floor(diff / 3600000);
	const days = Math.floor(diff / 86400000);
	if (mins < 60) return `${mins}m ago`;
	if (hours < 24) return `${hours}h ago`;
	if (days < 7) return `${days}d ago`;
	return `${Math.floor(days / 7)}w ago`;
};

// Helper: transform bid data
const transformBid = (bid) => ({
	id: bid.id,
	// Job info
	jobId: bid.job?.id,
	jobTitle: bid.job?.title,
	// Bidder info
	userId: bid.user?.id,
	userEmail: bid.user?.email,
	userName: bid.user?.full_name || bid.user?.email,
	userAvatar: bid.user?.profile_image,
	// Bid details
	amount: parseFloat(bid.amount) || 0,
	formattedAmount: `$${parseFloat(bid.amount || 0).toLocaleString()}`,
	status: bid.status, // pending, accepted, rejected, withdrawn
	notes: bid.notes,
	// Timestamps
	createdAt: bid.created_at,
	updatedAt: bid.updated_at,
	postedTime: getRelativeTime(bid.created_at),
	// Attachments
	attachments: bid.attachments || [],
});

export const bidController = {
	/**
	 * Create a new bid on a job
	 * Endpoint: POST /bids/new
	 * Note: Users can only place one bid per job, cannot bid on own jobs
	 */
	async createBid({ jobId, amount, notes }) {
		try {
			const { data } = await api.post("/bids/new", {
				job_id: jobId,
				amount: String(amount),
				notes: notes || "",
			});
			return { success: true, bid: transformBid(data) };
		} catch (error) {
			console.error("Error creating bid:", error);
			return {
				success: false,
				error:
					error.response?.data?.detail ||
					error.response?.data?.message ||
					"Failed to create bid",
			};
		}
	},

	/**
	 * Get all bids for a specific job
	 * Endpoint: GET /bids/list/{job_id}/
	 * Note: Job owner sees all bids, others see only their own
	 */
	async getBidsForJob(jobId) {
		try {
			const { data } = await api.get(`/bids/list/${jobId}/`);
			const bids = data.results || data;
			return Array.isArray(bids) ? bids.map(transformBid) : [];
		} catch (error) {
			console.error("Error fetching bids for job:", error);
			return [];
		}
	},

	/**
	 * Get all bids by the current user
	 * Endpoint: GET /bids/mine/
	 * Query params: status (optional filter)
	 */
	async getMyBids(filters = {}) {
		try {
			const params = {};
			if (filters.status) params.status = filters.status;

			const { data } = await api.get("/bids/mine/", { params });
			const bids = data.results || data;
			return Array.isArray(bids) ? bids.map(transformBid) : [];
		} catch (error) {
			console.error("Error fetching my bids:", error);
			return [];
		}
	},

	/**
	 * Update a bid (owner only, pending bids only)
	 * Endpoint: PATCH /bids/update/{id}/
	 */
	async updateBid(bidId, { amount, notes }) {
		try {
			const payload = {};
			if (amount !== undefined) payload.amount = String(amount);
			if (notes !== undefined) payload.notes = notes;

			const { data } = await api.patch(`/bids/update/${bidId}/`, payload);
			return { success: true, bid: transformBid(data) };
		} catch (error) {
			console.error("Error updating bid:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to update bid",
			};
		}
	},

	/**
	 * Withdraw/delete a bid (owner only)
	 * Endpoint: DELETE /bids/delete/{id}/
	 */
	async withdrawBid(bidId) {
		try {
			await api.delete(`/bids/delete/${bidId}/`);
			return { success: true };
		} catch (error) {
			console.error("Error withdrawing bid:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to withdraw bid",
			};
		}
	},

	/**
	 * Accept a bid (job owner only)
	 * Endpoint: POST /bids/accept/{id}/
	 * Note: This will:
	 * - Set bid status to 'accepted'
	 * - Reject all other pending bids
	 * - Set job's hired_to to the bidder
	 * - Set job status to 'in_progress'
	 */
	async acceptBid(bidId) {
		try {
			const { data } = await api.post(`/bids/accept/${bidId}/`);
			return { success: true, bid: transformBid(data) };
		} catch (error) {
			console.error("Error accepting bid:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to accept bid",
			};
		}
	},

	/**
	 * Reject a bid (job owner only)
	 * Endpoint: POST /bids/reject/{id}/
	 */
	async rejectBid(bidId) {
		try {
			const { data } = await api.post(`/bids/reject/${bidId}/`);
			return { success: true, bid: transformBid(data) };
		} catch (error) {
			console.error("Error rejecting bid:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to reject bid",
			};
		}
	},

	/**
	 * Get bids by a specific user (admin only)
	 * Endpoint: GET /bids/user/{user_id}/
	 */
	async getBidsByUser(userId) {
		try {
			const { data } = await api.get(`/bids/user/${userId}/`);
			const bids = data.results || data;
			return Array.isArray(bids) ? bids.map(transformBid) : [];
		} catch (error) {
			console.error("Error fetching user bids:", error);
			return [];
		}
	},

	/**
	 * Get a single bid by ID
	 * Note: This may need to use the list endpoint filtered by ID
	 */
	async getBid(bidId, jobId) {
		try {
			// If we have jobId, fetch from the job's bids list
			if (jobId) {
				const bids = await this.getBidsForJob(jobId);
				return bids.find((b) => b.id === bidId) || null;
			}
			// Otherwise try to get from my bids
			const myBids = await this.getMyBids();
			return myBids.find((b) => b.id === bidId) || null;
		} catch (error) {
			console.error("Error fetching bid:", error);
			return null;
		}
	},
};
