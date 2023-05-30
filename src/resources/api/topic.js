import api from "./config";

let apiPrefix = "/skijasi-api";

export const getTopicAPI = async (courseId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/topic/?course_id=${courseId}`;
  return api.get(apiUrl);
};

export const createTopicAPI = async (payload) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/topic/`;

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

  return { data, error, errorMessage };
};

export const editTopicAPI = async (payload, topicId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/topic/${topicId}`;

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

export const deleteTopicAPI = async (topicId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/topic/${topicId}`;

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

  return { data, error, errorMessage };
};
