/**
 * ---------------------------------------------------------
 * API ENDPOINTS CONFIGURATION
 * ---------------------------------------------------------
 *
 * This object contains all backend API endpoint definitions
 * used in the application.
 *
 * Structure:
 * Domain -> Action -> { api, method }
 *
 * Example usage:
 *
 * import { API_ENDPOINTS } from "@/config/apiEndpoints";
 *
 * const endpoint = API_ENDPOINTS.Auth.SiginIn;
 *
 * fetch(`${BaseUrl}/${endpoint.api}`, {
 *   method: endpoint.method,
 *   body: JSON.stringify(payload)
 * });
 *
 * ---------------------------------------------------------
 */
export const API_ENDPOINTS = {
  Auth: {
    SiginIn: {
      api: `Auth/SignIn`,
      method: 'POST',
    },
    Register: {
      api: `Auth/register`,
      method: 'POST',
    },
    RegisterUserInfo: {
      api: `Auth/RegisterUserInfo`,
      method: 'POST',
    },
    ForgotPassword: {
      api: `Auth/ForgotPassword`,
      method: 'POST',
    },
  },
};
