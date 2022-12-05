import instance from "./axios.instance";

const axiosCityPeopleUrl = "/api/city/people";
export const axiosCityPeople = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosCityPeopleUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosCityRoadAvgUrl = "/api/city/road/avg/";
export const axiosCityRoadAvg = async (cityId: number): Promise<any> => {
  try {
    const response = await instance.get(`${axiosCityRoadAvgUrl}${cityId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosCityAccidentUrl = "/api/city/accident";
export const axiosCityAccident = async (): Promise<any> => {
  try {
    const response = await instance.get(axiosCityAccidentUrl);
    return response;
  } catch (error) {
    throw error;
  }
};
