import api from "./config";

let apiPrefix = "/skijasi-api";

export default {
    async people(id) {
        let apiUrl = apiPrefix + "/module/lms/v1/course/" + id + "/people";
        let response = await api.get(apiUrl);

        if (response.data) {
            let peoples = response.data;
            localStorage.setItem("peoples", peoples);
        }
        return response;
    }
}
