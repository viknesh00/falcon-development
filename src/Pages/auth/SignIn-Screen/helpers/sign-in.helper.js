export default class SignInHelper {
  // Validate email format
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate mobile number format
  static validateMobile(mobile) {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  }

  // validate OTP 6 digit
  static validateOTP(otp) {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
  }

  // sing-in function
  static SignInPress(email, password, mobile) {
    if (email && !this.validateEmail(email)) {
      console.log('Invalid email format');
      return;
    }
    if (mobile) {
      console.log(`Signing in with Mobile: ${mobile} and Password: ${password}`);
    } else if (email) {
      console.log(`Signing in with Email: ${email} and Password: ${password}`);
    } else {
      console.log('Please provide either email or mobile number.');
    }
  }
  // get otp function
  static GetOTPPress({ navigation, email, mobile, password }) {
    console.log(`Get OTP for Email: ${email}, Mobile: ${mobile}`);
    // Navigate to OTP screen
    navigation('/auth/otp', { state: { email, mobile, password } });
  }

  static ResendOTPPress({ email, mobile }) {
    console.log(`Resend OTP for Email: ${email}, Mobile: ${mobile}`);
  }

  // forgot password function
  static ForgotPasswordPress({ navigation }) {
    console.log('Forgot Password pressed');
  }

  static OnSingupPress(navigation) {
    navigation('/signup');
  }
}
