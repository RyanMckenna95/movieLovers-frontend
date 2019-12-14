import Api from "@/services/api";

export default {
    fetchShows () {
        return Api().get("/show");
    },
    postShow (show) {
        return Api().post('/show',show,
            {headers:{'Content-type': 'application/json'} })
    },
    buyShow (id) {
        return Api().put(`/show/${id}/purchase`)
    },
    deleteShow (id) {
        return Api().delete(`/show/${id}`)
    },
};
