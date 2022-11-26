import instance from "./axios.instance";

const axiosDensityPeopleUrl = "/api/density/people";
export const axiosDensityPeople = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosDensityPeopleUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosDensityRoadUrl = "/api/density/road";
export const axiosDensityRoad = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosDensityRoadUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosAccidentUrl = "/api/accident";
export const axiosAccident = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosAccidentUrl);
    return response;
  } catch (error) {
    throw error;
  }
};
