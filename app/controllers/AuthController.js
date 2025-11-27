class AuthController {
    constructor() {
        this.tokenKey = 'nepwork_auth_token';
        this.userKey = 'nepwork_user';
    }

    // Helper to set cookie
    setCookie(name, value, days = 7) {
        if (typeof document === 'undefined') return;
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    // Helper to get cookie
    getCookie(name) {
        if (typeof document === 'undefined') return null;
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, null);
    }

    // Helper to delete cookie
    deleteCookie(name) {
        if (typeof document === 'undefined') return;
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }

    async login(email, password) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'admin@test.com' && password === 'admin123') {
                    const token = 'jwt_admin_token_' + Date.now();
                    const user = {
                        id: 1,
                        name: 'Admin User',
                        email: email,
                        role: 'client', 
                        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAgs6fSmkTf_uzSaZF1mOLr6nluNuGwtd7aV42-C1ZSIOzjC5RQR3u5MTkY9-qePhwT5LGzOANqoFo7tPKWEY3q_kmd_BQ3QAfKx0akzDULzrg-GCd1itahuAgu2jhXHFwA_s0Lv0S9Xx7M92br-VZ0hPqafbt0k12uYKncHOFncSlAHU4ELNCDJVHWnhxrUTaQf7mWw8rMc3fZC_6KKy2IVePfDbBYWmMahmJ-3rZq-beq6BZ1IJa2VBscmBaaAdeCFIBx1yUFpX7',
                        onboardingCompleted: true // Admin is already onboarded
                    };
                    this.setCookie(this.tokenKey, token);
                    localStorage.setItem(this.userKey, JSON.stringify(user));
                    resolve({ success: true, user, token });
                } else if (email && password) {
                     // Generic login for testing other flows
                    const token = 'dummy_token_' + Date.now();
                    const user = {
                        id: Math.floor(Math.random() * 1000),
                        name: 'Test User',
                        email: email,
                        role: 'freelancer',
                        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaddvfg_K9JEOqKP2DbvFtKKvhyDsdf0P-DP2icTIlilDL8phFUbyEz0u5LCf7TZFs3-vZ11LnrqUXqBqixS5d8Qahv6GnTiI0UhcY1toVLO2CydfcNvdEhK5FZLur6G5DP4RjcHCPkFF8aoPk8ZDrUJjMs7hEJm2g6UYfmZpMlPzw6O-YPr640EpG9DYmR0HAMZCs2ujx_LIJceDDWVvni1MKKfTAJNTWexBhIaT8Ncs9uWZd_cXSYQVzSXDk3RNsdg92Jq5mERA',
                        onboardingCompleted: false // New users need onboarding
                    };
                    this.setCookie(this.tokenKey, token);
                    localStorage.setItem(this.userKey, JSON.stringify(user));
                    resolve({ success: true, user, token });
                } else {
                    reject({ success: false, message: 'Invalid credentials' });
                }
            }, 1000);
        });
    }

    async signup(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const token = 'dummy_token_' + Date.now();
                const user = {
                    id: Math.floor(Math.random() * 1000),
                    name: data.fullName || 'New User',
                    email: data.email,
                    role: data.role || 'freelancer',
                    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHaddvfg_K9JEOqKP2DbvFtKKvhyDsdf0P-DP2icTIlilDL8phFUbyEz0u5LCf7TZFs3-vZ11LnrqUXqBqixS5d8Qahv6GnTiI0UhcY1toVLO2CydfcNvdEhK5FZLur6G5DP4RjcHCPkFF8aoPk8ZDrUJjMs7hEJm2g6UYfmZpMlPzw6O-YPr640EpG9DYmR0HAMZCs2ujx_LIJceDDWVvni1MKKfTAJNTWexBhIaT8Ncs9uWZd_cXSYQVzSXDk3RNsdg92Jq5mERA',
                    onboardingCompleted: false
                };
                this.setCookie(this.tokenKey, token);
                localStorage.setItem(this.userKey, JSON.stringify(user));
                resolve({ success: true, user, token });
            }, 1000);
        });
    }

    async completeOnboarding(details) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = this.getUser();
                if (user) {
                    const updatedUser = { ...user, ...details, onboardingCompleted: true };
                    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
                    resolve({ success: true, user: updatedUser });
                } else {
                    resolve({ success: false, message: 'User not found' });
                }
            }, 800);
        });
    }

    logout() {
        this.deleteCookie(this.tokenKey);
        localStorage.removeItem(this.userKey);
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    isAuthenticated() {
        return !!this.getCookie(this.tokenKey);
    }

    getUser() {
        if (typeof localStorage === 'undefined') return null;
        const userStr = localStorage.getItem(this.userKey);
        return userStr ? JSON.parse(userStr) : null;
    }
}

export const authController = new AuthController();
