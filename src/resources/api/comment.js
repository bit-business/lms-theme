import api from "./config";

let apiPrefix = "/skijasi-api";

export const createComment = async (payload) => {
    const apiUrl = `${apiPrefix}/module/lms/v1/comment/`;

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

export const deleteComment = async (commentId) => {
    const apiUrl = `${apiPrefix}/module/lms/v1/comment/${commentId}`;

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

export const editComment = async (payload, commentId) => {
    const apiUrl = `${apiPrefix}/module/lms/v1/comment/${commentId}`;

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
