import api, { apiPrefix } from "../config";

export const createQuiz = async (payload) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/quiz`;

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

export const getQuizById = async (materialId) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/quiz/${materialId}`;

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
};

export const updateQuizById = async (materialId, payload) => {
  console.log(payload)
  const apiUrl = `${apiPrefix}/module/lms/v1/quiz/${materialId}`;

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

export const deleteQuizById = async (materialId, payload) => {
  console.log(payload)
  const apiUrl = `${apiPrefix}/module/lms/v1/quiz/${materialId}`;

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
