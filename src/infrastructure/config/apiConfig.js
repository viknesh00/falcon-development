/**
 * Base API URL loaded from environment variables.
 *
 * This value should be defined in the `.env` file:
 * REACT_APP_API_BASE_URL=https://api.example.com
 *
 * It is used as the base URL for all backend API requests.
 */
export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * API Timeout
 *
 * **/
export const API_TIMEOUT = 30000; // 30 sec

/**
 * API Headers
 * **/
export const API_HEADERS = {
  'Content-Type': 'application/json',
};
