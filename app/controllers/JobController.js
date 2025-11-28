import api from "@/app/services/api";

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

// Helper: transform job data
const transformJob = (job) => ({
	id: job.id,
	title: job.title,
	description: job.description,
	category: job.category,
	type: job.type,
	budget: parseFloat(job.budget) || 0,
	budgetType: job.budget_type === "hourly" ? "Hourly" : "Fixed Price",
	requirements: job.requirements || [],
	tags: job.tags || [],
	skills: job.skills || job.tags || [],
	status: job.status,
	createdAt: job.created_at,
	postedTime: getRelativeTime(job.created_at),
	proposals: job.proposal_count || 0,
	posterId: job.poster?.id,
	posterName: job.poster_name || job.poster?.full_name || "Unknown",
	posterAvatar: job.poster?.avatar,
	company: job.poster_name || job.poster?.full_name || "Unknown",
	location: job.poster?.location || "Remote",
});

// Helper: transform proposal data
const transformProposal = (p, jobId) => ({
	id: p.id,
	jobId: jobId || p.job?.id,
	jobTitle: p.job_title || p.job?.title,
	freelancerId: p.freelancer?.id,
	freelancerName: p.freelancer_name || p.freelancer?.full_name,
	freelancerAvatar: p.freelancer_avatar || p.freelancer?.avatar,
	bidAmount: parseFloat(p.bid_amount) || 0,
	coverLetter: p.cover_letter,
	status: p.status,
	createdAt: p.created_at,
	rating: p.freelancer?.rating,
	skills: p.freelancer?.skills || [],
});

export const jobController = {
	// Get all jobs
	async getJobs(filters = {}) {
		try {
			const params = {};
			if (filters.category && filters.category !== "All")
				params.category = filters.category.toLowerCase();
			if (filters.type && filters.type !== "All")
				params.type = filters.type.toLowerCase().replace("-", "_");
			if (filters.search) params.search = filters.search;
			if (filters.page) params.page = filters.page;

			const { data } = await api.get("/api/jobs/", { params });
			const jobs = data.results || data;
			return {
				count: data.count || jobs.length,
				results: jobs.map(transformJob),
			};
		} catch {
			return { count: 0, results: [] };
		}
	},

	// Get single job
	async getJob(id) {
		try {
			const { data } = await api.get(`/api/jobs/${id}/`);
			return transformJob(data);
		} catch {
			return null;
		}
	},

	// Get my jobs
	async getMyJobs() {
		try {
			const { data } = await api.get("/api/jobs/my_jobs/");
			return (data.results || data).map(transformJob);
		} catch {
			return [];
		}
	},

	// Post new job
	async postJob(jobData) {
		try {
			const { data } = await api.post("/api/jobs/", {
				title: jobData.title,
				description: jobData.description,
				category: jobData.category?.toLowerCase() || "development",
				type: jobData.jobType || jobData.type || "freelance",
				budget: String(jobData.budget),
				budget_type:
					jobData.budgetType === "hourly" ? "hourly" : "fixed",
				requirements: jobData.requirements || "",
				skills: jobData.skills || [],
			});
			return { success: true, job: transformJob(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to post job",
			};
		}
	},

	// Update job
	async updateJob(id, updates) {
		try {
			const { data } = await api.patch(`/api/jobs/${id}/`, updates);
			return { success: true, job: transformJob(data) };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},

	// Delete job
	async deleteJob(id) {
		try {
			await api.delete(`/api/jobs/${id}/`);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Delete failed",
			};
		}
	},

	// Get proposals for a job
	async getProposals(jobId) {
		try {
			const { data } = await api.get(`/api/jobs/${jobId}/proposals/`);
			return (data.results || data).map((p) =>
				transformProposal(p, jobId)
			);
		} catch {
			return [];
		}
	},

	// Get my proposals (freelancer)
	async getMyProposals() {
		try {
			const { data } = await api.get("/api/proposals/");
			return (data.results || data).map((p) => transformProposal(p));
		} catch {
			return [];
		}
	},

	// Apply for job
	async applyForJob(jobId, { coverLetter, bidAmount }) {
		try {
			const { data } = await api.post(`/api/jobs/${jobId}/apply/`, {
				cover_letter: coverLetter,
				bid_amount: String(bidAmount),
			});
			return {
				success: true,
				application: transformProposal(data, jobId),
			};
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Application failed",
			};
		}
	},

	// Update proposal status
	async updateProposalStatus(jobId, proposalId, status) {
		try {
			const { data } = await api.patch(
				`/api/jobs/${jobId}/proposals/${proposalId}/update_status/`,
				{ status }
			);
			return { success: true, proposal: data };
		} catch (error) {
			return {
				success: false,
				error: error.response?.data?.detail || "Status update failed",
			};
		}
	},
};
