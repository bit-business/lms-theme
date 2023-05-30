import api, { apiPrefix } from "../config";

export const createSubmission = async (payload) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/submission`;

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

export const readSubmission = async (assignmentId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/submission/${assignmentId}`;

  let [data, error, errorMessage] = [null, null, null];
  try {
    const response = await api.get(apiUrl);

    if (!!response.errors) {
      throw response.errors;
    }

    data = response.data;
  } catch (e) {
    error = e;
    errorMessage = "Something went wrong, please try again later";
  }

  return {data, error, errorMessage};
}

export const editSubmission = async (payload, assignmentId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/submission/${assignmentId}`;

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
