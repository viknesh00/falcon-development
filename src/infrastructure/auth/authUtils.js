/**
 * Auth Utilities - Helper functions for authentication
 */

/**
 * Parse JWT token (without verification - for client-side use only)
 */
export const parseJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to parse JWT:', error);
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  const decoded = parseJWT(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

/**
 * Get token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Set token in localStorage
 */
export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

/**
 * Clear token from localStorage
 */
export const clearToken = () => {
  localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};

/**
 * Get user role from stored auth data
 */
export const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || null;
  } catch (error) {
    console.error('Failed to get user role:', error);
    return null;
  }
};

/**
 * Get user data from localStorage
 */
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch (error) {
    console.error('Failed to get user data:', error);
    return null;
  }
};
