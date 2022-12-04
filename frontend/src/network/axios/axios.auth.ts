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

const axiosAuthPasswordFindUrl = "/auth/password/find";
export const axiosAuthPasswordFind = async (body: object): Promise<any> => {
  try {
    const response = await instance.patch(axiosAuthPasswordFindUrl, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthPasswordChangeUrl = "/auth/password/change";
export const axiosAuthPasswordChange = async (body: object): Promise<any> => {
  try {
    const response = await instance.patch(axiosAuthPasswordChangeUrl, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthPasswordAssertUrl = "/auth/password/assert";
export const axiosAuthPasswordAssert = async (body: object): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthPasswordAssertUrl, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthLoginUrl = "/auth/login";
export const axiosAuthLogin = async (body: object): Promise<any> => {
  try {
    const response = await instance.post(axiosAuthLoginUrl, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAuthLogoutUrl = "/auth/logout";
export const axiosAuthLogout = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAuthLogoutUrl);
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
