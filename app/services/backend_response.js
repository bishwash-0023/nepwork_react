import axios from "axios";

class BackendResponse {
	/**
	 * @param {Object} params
	 * @param {boolean} params.success - Indicates if the request was successful
	 * @param {*} [params.response] - The actual response data from the backend
	 * @param {Object|null} [params.error] - Error details if the request failed
	 * @param {import('axios').AxiosResponse|null} [params.axiosResponse] - The axios response object
	 */
	constructor({
		success,
		response = null,
		error = null,
		axiosResponse = null,
	}) {
		this.success = success;
		this.response = response;
		this.error = error;
		this.axiosResponse = axiosResponse;
		this.timestamp = new Date();
	}

	/** Returns true if error is not null */
	get hasError() {
		return this.error != null;
	}

	/** Indicates if the error was in client side such as network error or timeout */
	get isClientError() {
		return this.axiosResponse == null && this.hasError;
	}

	get statusCode() {
		return this.axiosResponse?.status ?? -1;
	}

	get statusMessage() {
		return this.axiosResponse?.statusText ?? "Unknown";
	}

	get contentType() {
		return this.axiosResponse?.headers?.["content-type"] ?? "Unknown";
	}

	get contentLength() {
		return this.axiosResponse?.headers?.["content-length"] ?? "Unknown";
	}

	/** Returns detailed information about the response */
	get deepDetails() {
		if (this.axiosResponse == null) {
			return "No response available. Probably request did not reach the server.";
		}

		const requestHeaders = this.axiosResponse.config?.headers || {};
		const wasAuthenticated =
			requestHeaders["Authorization"] != null ||
			requestHeaders["authorization"] != null ||
			requestHeaders["AUTHORIZATION"] != null;

		const tokenSent = wasAuthenticated
			? (requestHeaders["Authorization"] ??
				requestHeaders["authorization"] ??
				requestHeaders["AUTHORIZATION"])
			: "N/A";

		const sentData = this.axiosResponse.config?.data;
		let sentDataStr;
		if (sentData instanceof FormData) {
			const fields = [];
			sentData.forEach((value, key) => fields.push(`${key}: ${value}`));
			sentDataStr = `FormData: [${fields.join(", ")}]`;
		} else {
			sentDataStr = JSON.stringify(sentData) ?? "None";
		}

		const lines = [
			"\n========== Response Details: ==========",
			`Timestamp: ${this.timestamp.toISOString()}`,
			`Authenticated request: ${wasAuthenticated}`,
			`Token Sent: ${tokenSent}`,
			`Status Code Meaning: ${this.axiosResponse.statusText ?? "Unknown"}`,
			`\n`,
			"-------- Request details (sent data details) -------------",
			`url: ${this.axiosResponse.config?.url ?? "Unknown"}`,
			`sentData: ${sentDataStr}`,
			`sentHeaders: ${JSON.stringify(requestHeaders) ?? "None"}`,
			`methodUsed: ${this.axiosResponse.config?.method?.toUpperCase() ?? "Unknown"}`,
			`requestTypeUsed: ${this.axiosResponse.config?.headers?.["Content-Type"] ?? "Unknown"}`,
			`timeout: ${this.axiosResponse.config?.timeout ?? "Default"}`,
			`maxRedirects: ${this.axiosResponse.config?.maxRedirects ?? "Default"}`,
			`\n`,
			"----- Server sent details (details from server side) ----------",
			`statusCode: ${this.axiosResponse.status ?? "Unknown"}`,
			`responseData: ${JSON.stringify(this.axiosResponse.data) ?? "None"}`,
			`responseHeaders: ${JSON.stringify(this.axiosResponse.headers) ?? "None"}`,
			`responseType: ${this.axiosResponse.config?.responseType ?? "Unknown"}`,
			`contentType: ${this.contentType}`,
			`contentLength: ${this.contentLength}`,
			"",
		];

		return lines.join("\n");
	}

	toString() {
		return this.deepDetails;
	}

	/**
	 * @param {import('axios').AxiosResponse} axiosResp
	 * @returns {BackendResponse}
	 */
	static fromAxiosResponse(axiosResp) {
		const data = axiosResp.data;

		if (typeof data !== "object" || data === null) {
			return new BackendResponse({
				success: false,
				error: { message: "Invalid response format", details: data },
				axiosResponse: axiosResp,
			});
		}

		const isSuccess = data.success === true;

		return new BackendResponse({
			success: isSuccess,
			response: data.response,
			error: isSuccess ? null : data.error,
			axiosResponse: axiosResp,
		});
	}

	/**
	 * @param {Object} details
	 * @returns {BackendResponse}
	 */
	static fromJson(details) {
		const isSuccess = details.success === true;

		return new BackendResponse({
			success: isSuccess,
			response: details.response,
			error: isSuccess ? null : details.error,
		});
	}

	/**
	 * @param {Function} UserInfoClass - A class with a static fromJson method
	 * @returns {Object|null}
	 */
	toUserInfo(UserInfoClass) {
		if (this.axiosResponse == null) return null;

		if (this.hasError) {
			console.debug(
				"UserInfoConverter: 'this' has an error, we cannot convert to UserInfo."
			);
			return null;
		}

		try {
			const data = this.axiosResponse.data;
			if (typeof data === "object" && data !== null) {
				return UserInfoClass.fromJson(
					this.response ?? data.response ?? data
				);
			}
		} catch (e) {
			console.error(
				`Error in BackendResponse.toUserInfo: '${e.name}'\n Message: ${e.message} \n\n Stack Trace:\n ${e.stack}`
			);

			if (this.axiosResponse != null) {
				console.log(this.deepDetails);
			}
		}

		return null;
	}
}

export default BackendResponse;
