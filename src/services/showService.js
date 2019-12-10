import Api from "@/services/api";

export default {
    fetchShows () {
        return Api().get("/show");
    }
};
