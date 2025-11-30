import api from "@/app/services/api";

/**
 * CommentController - New controller for job comments
 *
 * Endpoints (from z_readmes/comments.md):
 * - POST /comments/new - Create a new comment
 * - GET /comments/list/{job_id}/ - List all comments for a job
 * - PUT/PATCH /comments/update/{id}/ - Update a comment
 * - DELETE /comments/delete/{id}/ - Delete a comment
 * - GET /comments/mine/ - Get all comments by current user
 * - GET /comments/job/{job_id}/ - Alternative endpoint for job comments
 * - GET /comments/user/{user_id}/ - List comments by a user (admin/staff only)
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

// Helper: transform comment data
const transformComment = (comment) => ({
	id: comment.id,
	// Job info
	jobId: comment.job?.id,
	jobTitle: comment.job?.title,
	// Author info
	userId: comment.user?.id,
	userEmail: comment.user?.email,
	userName: comment.user?.full_name || comment.user?.email,
	userAvatar: comment.user?.profile_image,
	// Comment content
	content: comment.content,
	// Timestamps
	createdAt: comment.created_at,
	updatedAt: comment.updated_at,
	postedTime: getRelativeTime(comment.created_at),
});

export const commentController = {
	/**
	 * Create a new comment on a job
	 * Endpoint: POST /comments/new
	 */
	async createComment({ jobId, content }) {
		try {
			const { data } = await api.post("/comments/new", {
				job_id: jobId,
				content: content,
			});
			return { success: true, comment: transformComment(data) };
		} catch (error) {
			console.error("Error creating comment:", error);
			return {
				success: false,
				error:
					error.response?.data?.detail ||
					error.response?.data?.message ||
					"Failed to create comment",
			};
		}
	},

	/**
	 * Get all comments for a specific job
	 * Endpoint: GET /comments/list/{job_id}/
	 */
	async getCommentsForJob(jobId) {
		try {
			const { data } = await api.get(`/comments/list/${jobId}/`);
			const comments = data.results || data;
			return Array.isArray(comments)
				? comments.map(transformComment)
				: [];
		} catch (error) {
			console.error("Error fetching comments for job:", error);
			return [];
		}
	},

	/**
	 * Get all comments by the current user
	 * Endpoint: GET /comments/mine/
	 */
	async getMyComments() {
		try {
			const { data } = await api.get("/comments/mine/");
			const comments = data.results || data;
			return Array.isArray(comments)
				? comments.map(transformComment)
				: [];
		} catch (error) {
			console.error("Error fetching my comments:", error);
			return [];
		}
	},

	/**
	 * Update a comment (owner only)
	 * Endpoint: PATCH /comments/update/{id}/
	 */
	async updateComment(commentId, { content }) {
		try {
			const { data } = await api.patch(`/comments/update/${commentId}/`, {
				content: content,
			});
			return { success: true, comment: transformComment(data) };
		} catch (error) {
			console.error("Error updating comment:", error);
			return {
				success: false,
				error:
					error.response?.data?.detail || "Failed to update comment",
			};
		}
	},

	/**
	 * Delete a comment (owner or admin only)
	 * Endpoint: DELETE /comments/delete/{id}/
	 */
	async deleteComment(commentId) {
		try {
			await api.delete(`/comments/delete/${commentId}/`);
			return { success: true };
		} catch (error) {
			console.error("Error deleting comment:", error);
			return {
				success: false,
				error:
					error.response?.data?.detail || "Failed to delete comment",
			};
		}
	},

	/**
	 * Get comments for a job (alternative endpoint)
	 * Endpoint: GET /comments/job/{job_id}/
	 */
	async getJobComments(jobId) {
		try {
			const { data } = await api.get(`/comments/job/${jobId}/`);
			const comments = data.results || data;
			return Array.isArray(comments)
				? comments.map(transformComment)
				: [];
		} catch (error) {
			console.error("Error fetching job comments:", error);
			return [];
		}
	},

	/**
	 * Get comments by a specific user (admin/staff only)
	 * Endpoint: GET /comments/user/{user_id}/
	 */
	async getCommentsByUser(userId) {
		try {
			const { data } = await api.get(`/comments/user/${userId}/`);
			const comments = data.results || data;
			return Array.isArray(comments)
				? comments.map(transformComment)
				: [];
		} catch (error) {
			console.error("Error fetching user comments:", error);
			return [];
		}
	},
};
