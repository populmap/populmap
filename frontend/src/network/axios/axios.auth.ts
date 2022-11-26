import instance from "./axios.instance";

const axiosAuthRegisterUrl = "/auth/register";
export const axiosAuthRegister = async (body: object): Promise<any> => {
  try {
    const response = await instance.post(axiosAuthRegisterUrl, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthLoginUrl = "/auth/login";
export const axiosAuthLogin = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthLoginUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthKakaoLoginUrl = "/auth/kakao/login";
export const axiosAuthKakaoLogin = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthKakaoLoginUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthNaverLoginUrl = "/auth/naver/login";
export const axiosAuthNaverLogin = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthNaverLoginUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthGoogleLoginUrl = "/auth/google/login";
export const axiosAuthGoogleLogin = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthGoogleLoginUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthWithdrawUrl = "/auth/withdraw";
export const axiosAuthWithdraw = async (): Promise<any> => {
  try {
    const response = await instance.delete(axiosAuthWithdrawUrl);
    return response;
  } catch (error) {
    throw error;
  }
};
