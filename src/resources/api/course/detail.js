import api, { apiPrefix } from "../config";

export const courseDetail = async (id) => {
  const apiUrl = `${apiPrefix}/module/lms/v1/course`;

  let [data, error, errorMessage] = [null, null, null];
  try {
    const response = await api.get(apiUrl + "/" + id);

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
