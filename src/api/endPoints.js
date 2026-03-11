const BaeseUrl = process.env.REACT_APP_API_BASE_URL;

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
