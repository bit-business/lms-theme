import api from "./config";

let apiPrefix = "/skijasi-api";

export default {
  async joinCourse(payload) {
    const apiUrl = apiPrefix + "/module/lms/v1/course/join";

    let [data, error, errorMessage] = [null, null, null];
    try {
      const response = await api.post(apiUrl, payload);

      if (!!response.errors) {
        throw response.errors;
      }

      data = response.data;
    } catch (e) {
      error = e;
      errorMessage = "Code is invalid or you've been registered";
    }

    return { data, error, errorMessage }
  }
}
