import instance from "./axios.instance";

const axiosEventSearchSummaryUrl = "/api/event/search/summary/filter/";
export const axiosEventSearchSummary = async (
  city: string,
  progress: string
): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosEventSearchSummaryUrl}?=${city}&=${progress}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEventSearchDetailUrl = "/api/event/search/detail/";
export const axiosEventSearchDetail = async (eventId: number): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosEventSearchDetailUrl}${eventId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEventSearchListUrl = "/api/event/search/list/filter/";
export const axiosEventSearchList = async (
  page: number,
  length: number,
  city: string,
  progress: string
): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosEventSearchListUrl}?=${page}&=${length}&=${city}&=${progress}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEventBookmarkSummaryUrl = "/api/event/bookmark/summary/filter/";
export const axiosEventBookmarkSummary = async (
  page: number,
  length: number,
  city: string,
  progress: string
): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosEventBookmarkSummaryUrl}?=${page}&=${length}&=${city}&=${progress}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEventBookmarkListUrl = "/api/event/bookmark/list/filter/";
export const axiosEventBookmarkList = async (
  city: string,
  progress: string
): Promise<any> => {
  try {
    const response = await instance.get(
      `${axiosEventBookmarkListUrl}?=${city}&=${progress}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEventBookmarkPostUrl = "/api/event/bookmark/post/";
export const axiosEventBookmarkPost = async (eventId: number): Promise<any> => {
  try {
    const response = await instance.post(
      `${axiosEventBookmarkPostUrl}${eventId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosEventBookmarkDeleteUrl = "/api/event/bookmark/delete/";
export const axiosEventBookmarkDelete = async (
  eventId: number
): Promise<any> => {
  try {
    const response = await instance.delete(
      `${axiosEventBookmarkDeleteUrl}${eventId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
