import BASE_URL from '../api/axiosForgot';

export const verifyEmail = async (email) => {
  const response = await BASE_URL.post(`/verifyMail/${email}`);
  return response.data;
};

export const verifyOtp = async ({ otp, email }) => {
  const otpNumber = Number(otp);
  if (isNaN(otpNumber)) {
    throw new Error('OTP phải là một số hợp lệ');
  }
  const response = await BASE_URL.post(`/verifyOtp/${otpNumber}/${email}`);
  return response.data;
};

export const changePassword = async ({ email, newPassword, repeatPassword }) => {
  const response = await BASE_URL.post(`/changePassword/${email}`, {
    newPassword,
    repeatPassword,
  });
  return response.data;
};
