export const startSignup = async (data) => {
    // This would call the initial signup/account creation endpoint
    // return await postRequest('/auth/register', data);
    console.log('API: Starting signup', data);
    return { success: true };
};

export const verifyOTP = async (data) => {
    // This would call the OTP verification endpoint
    // return await postRequest('/auth/verify-otp', data);
    console.log('API: Verifying OTP', data);
    return { success: true };
};

export const submitPersonalDetails = async (data) => {
    // This would call the personal/financial details endpoint
    // return await postRequest('/auth/details', data);
    console.log('API: Submitting details', data);
    return { success: true };
};

export const uploadIdentity = async (data) => {
    // This would call the identity upload endpoint (likely a multipart form)
    // return await postRequest('/auth/upload-id', data);
    console.log('API: Uploading identity', data);
    return { success: true };
};
