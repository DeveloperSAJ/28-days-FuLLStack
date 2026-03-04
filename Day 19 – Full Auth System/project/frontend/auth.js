// Auth.js - Handles all authentication-related API calls
const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your backend URL

const Auth = {
    // Register new user
    async register(username, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Registration failed'
                };
            }

            // Store token if returned
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            return {
                success: true,
                user: data.user,
                token: data.token
            };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    },

    // Login user
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    message: data.message || 'Login failed'
                };
            }

            // Store token and user data
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            return {
                success: true,
                user: data.user,
                token: data.token
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    },

    // Get user profile
    async getProfile() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                return {
                    success: false,
                    message: 'No token found'
                };
            }

            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                // If token is invalid, clear storage
                if (response.status === 401) {
                    this.logout();
                }
                return {
                    success: false,
                    message: data.message || 'Failed to fetch profile'
                };
            }

            return {
                success: true,
                user: data
            };
        } catch (error) {
            console.error('Profile fetch error:', error);
            return {
                success: false,
                message: 'Network error. Please try again.'
            };
        }
    },

    // Logout user
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    // Get current user from storage
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    // Get auth token
    getToken() {
        return localStorage.getItem('token');
    }
};

// Make Auth available globally
window.Auth = Auth;