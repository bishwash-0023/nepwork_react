import api from "@/app/services/api";

// Helper: transform dispute
const transformDispute = (d) => ({
	id: d.id,
	jobId: d.job?.id,
	jobTitle: d.job?.title,
	initiator: d.initiator,
	initiatorId: d.initiator?.id,
	initiatorName: d.initiator?.full_name,
	reason: d.reason,
	status: d.status,
	createdAt: d.created_at,
	resolvedAt: d.resolved_at,
	date: d.created_at?.split("T")[0] || null,
});

export const disputeController = {
	// Get all disputes
	async getDisputes() {
		try {
			const { data } = await api.get("/api/disputes/");
			return (data.results || data).map(transformDispute);
		} catch {
			return [];
		}
	},

	// Get single dispute
	async getDispute(id) {
		try {
			const { data } = await api.get(`/api/disputes/${id}/`);
			return transformDispute(data);
		} catch {
			return null;
		}
	},

	// Create dispute
	async createDispute({ jobId, reason }) {
		try {
			const { data } = await api.post("/api/disputes/", {
				job_id: jobId,
				reason,
			});
			return { success: true, dispute: transformDispute(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to file dispute",
			};
		}
	},

	// Update dispute
	async updateDispute(id, updates) {
		try {
			const payload = {};
			if (updates.status !== undefined) payload.status = updates.status;
			if (updates.reason !== undefined) payload.reason = updates.reason;
			const { data } = await api.patch(`/api/disputes/${id}/`, payload);
			return { success: true, dispute: transformDispute(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},
};
