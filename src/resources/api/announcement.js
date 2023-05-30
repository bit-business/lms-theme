import api from "./config";

let apiPrefix = "/skijasi-api";

export const getAnnouncementsAPI = async (courseId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/announcement?courseId=${courseId}`;
  return api.get(apiUrl);
};

export const createAnnouncementAPI = async (payload) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/announcement/`;

  let [data, error, errorMessage] = [null, null, null];
  try {
    const response = await api.post(apiUrl, payload);

    if (!!response.errors) {
      throw response.errors;
    }

    data = response.data;
  } catch (e) {
    error = e;
    errorMessage = "Something went wrong, please try again later";
  }

  return {data, error, errorMessage};
};

export const editAnnouncementAPI = async (payload, announcementId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/announcement/${announcementId}`;

  let [data, error, errorMessage] = [null, null, null];
  try {
    const response = await api.put(apiUrl, payload);

    if (!!response.errors) {
      throw response.errors;
    }

    data = response.data;
  } catch (e) {
    error = e;
    errorMessage = "Something went wrong, please try again later";
  }

  return { data, error, errorMessage };
};

export const deleteAnnouncementAPI = async (announcementId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/announcement/${announcementId}`;

  let [data, error, errorMessage] = [null, null, null];
  try {
    const response = await api.delete(apiUrl);

    if (!!response.errors) {
      throw response.errors;
    }

    data = response.data;
  } catch (e) {
    error = e;
    errorMessage = "Something went wrong, please try again later";
  }

  return {data, error, errorMessage};
};
