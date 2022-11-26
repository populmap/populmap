import instance from "./axios.instance";

const axiosBookmarkPostUrl = "/api/event/bookmark/post/";
export const axiosBookmarkPost = async (eventId: number): Promise<any> => {
  try {
    const response = await instance.post(`${axiosBookmarkPostUrl}${eventId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

const axiosBookmarkDeleteUrl = "/api/event/bookmark/delete/";
export const axiosBookmarkDelete = async (eventId: number): Promise<any> => {
  try {
    const response = await instance.delete(
      `${axiosBookmarkDeleteUrl}${eventId}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
