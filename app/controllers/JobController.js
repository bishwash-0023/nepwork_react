import api from "@/app/services/api";

/**
 * JobController - Updated to match new backend API structure
 *
 * Endpoints (from z_readmes/jobs.md):
 * - POST /jobs/new - Create a new job
 * - GET /jobs/list - List all jobs with filtering
 * - GET /jobs/detail/{id}/ - Get job details
 * - PUT/PATCH /jobs/update/{id}/ - Update a job
 * - DELETE /jobs/delete/{id}/ - Delete a job
 * - GET /jobs/mine/ - List jobs created by current user
 * - GET /jobs/hired/ - List jobs where current user is hired
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

// Helper: transform job data to match new backend response format
const transformJob = (job) => ({
	id: job.id,
	title: job.title,
	description: job.description,
	status: job.status, // open, in_progress, closed
	createdAt: job.created_at,
	updatedAt: job.updated_at,
	postedTime: getRelativeTime(job.created_at),
	// Creator info (new backend structure)
	createdBy: job.created_by,
	posterId: job.created_by?.id,
	posterName: job.created_by?.full_name || job.created_by?.email || "Unknown",
	posterEmail: job.created_by?.email,
	// Hired user info
	hiredTo: job.hired_to,
	hiredToId: job.hired_to?.id,
	hiredToName: job.hired_to?.full_name || job.hired_to?.email,
	// Media attachments
	images: job.images || [],
	files: job.files || [],
});

export const jobController = {
	/**
	 * Get all jobs with filtering and pagination
	 * NEW ENDPOINT: GET /jobs/list
	 * Query params: status, created_by, search, ordering, page
	 */
	async getJobs(filters = {}) {
		try {
			const params = {};
			if (filters.status && filters.status !== "All")
				params.status = filters.status.toLowerCase();
			if (filters.created_by) params.created_by = filters.created_by;
			if (filters.search) params.search = filters.search;
			if (filters.ordering) params.ordering = filters.ordering;
			if (filters.page) params.page = filters.page;

			const { data } = await api.get("/jobs/list", { params });
			const jobs = data.results || data;
			return {
				count: data.count || jobs.length,
				next: data.next,
				previous: data.previous,
				results: Array.isArray(jobs) ? jobs.map(transformJob) : [],
			};
		} catch (error) {
			console.error("Error fetching jobs:", error);
			return { count: 0, results: [], next: null, previous: null };
		}
	},

	/**
	 * Get single job details
	 * NEW ENDPOINT: GET /jobs/detail/{id}/
	 */
	async getJob(id) {
		try {
			const { data } = await api.get(`/jobs/detail/${id}/`);
			return transformJob(data);
		} catch (error) {
			console.error("Error fetching job:", error);
			return null;
		}
	},

	/**
	 * Get jobs created by the current user
	 * NEW ENDPOINT: GET /jobs/mine/
	 */
	async getMyJobs() {
		try {
			const { data } = await api.get("/jobs/mine/");
			const jobs = data.results || data;
			return Array.isArray(jobs) ? jobs.map(transformJob) : [];
		} catch (error) {
			console.error("Error fetching my jobs:", error);
			return [];
		}
	},

	/**
	 * Get jobs where the current user is hired
	 * NEW ENDPOINT: GET /jobs/hired/
	 */
	async getHiredJobs() {
		try {
			const { data } = await api.get("/jobs/hired/");
			const jobs = data.results || data;
			return Array.isArray(jobs) ? jobs.map(transformJob) : [];
		} catch (error) {
			console.error("Error fetching hired jobs:", error);
			return [];
		}
	},

	/**
	 * Create a new job
	 * NEW ENDPOINT: POST /jobs/new
	 * Supports multipart/form-data for image/file uploads
	 */
	async postJob(jobData) {
		try {
			const formData = new FormData();

			// Required fields
			formData.append("title", jobData.title);
			formData.append("description", jobData.description);

			// Handle image uploads if any
			if (jobData.images && jobData.images.length > 0) {
				jobData.images.forEach((image) => {
					if (image instanceof File) {
						formData.append("images", image);
					}
				});
			}

			// Handle file uploads if any
			if (jobData.files && jobData.files.length > 0) {
				jobData.files.forEach((file) => {
					if (file instanceof File) {
						formData.append("files", file);
					}
				});
			}

			const { data } = await api.post("/jobs/new", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return { success: true, job: transformJob(data) };
		} catch (error) {
			console.error("Error posting job:", error);
			return {
				success: false,
				error:
					error.response?.data?.detail ||
					error.response?.data?.message ||
					"Failed to post job",
			};
		}
	},

	/**
	 * Update an existing job
	 * NEW ENDPOINT: PATCH /jobs/update/{id}/
	 */
	async updateJob(id, updates) {
		try {
			const payload = {};
			if (updates.title !== undefined) payload.title = updates.title;
			if (updates.description !== undefined)
				payload.description = updates.description;
			if (updates.status !== undefined) payload.status = updates.status;
			if (updates.hired_to_id !== undefined)
				payload.hired_to_id = updates.hired_to_id;

			const { data } = await api.patch(`/jobs/update/${id}/`, payload);
			return { success: true, job: transformJob(data) };
		} catch (error) {
			console.error("Error updating job:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Update failed",
			};
		}
	},

	/**
	 * Delete a job
	 * NEW ENDPOINT: DELETE /jobs/delete/{id}/
	 */
	async deleteJob(id) {
		try {
			await api.delete(`/jobs/delete/${id}/`);
			return { success: true };
		} catch (error) {
			console.error("Error deleting job:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Delete failed",
			};
		}
	},

	/**
	 * Hire a user for a job (updates job status and sets hired_to)
	 * Note: This is typically done through accepting a bid via BidController
	 */
	async hireUser(jobId, userId) {
		try {
			const { data } = await api.patch(`/jobs/update/${jobId}/`, {
				hired_to_id: userId,
				status: "in_progress",
			});
			return { success: true, job: transformJob(data) };
		} catch (error) {
			console.error("Error hiring user:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to hire user",
			};
		}
	},

	/**
	 * Close a job (mark as completed)
	 */
	async closeJob(jobId) {
		try {
			const { data } = await api.patch(`/jobs/update/${jobId}/`, {
				status: "closed",
			});
			return { success: true, job: transformJob(data) };
		} catch (error) {
			console.error("Error closing job:", error);
			return {
				success: false,
				error: error.response?.data?.detail || "Failed to close job",
			};
		}
	},
};
