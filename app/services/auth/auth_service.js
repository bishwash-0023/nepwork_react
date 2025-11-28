class AuthService {
	// Singleton instance
	static instance = null;

	static init() {
		if (AuthService.instance == null) {
			AuthService.instance = new AuthService();
		}
		return AuthService.instance;
	}

    




}
