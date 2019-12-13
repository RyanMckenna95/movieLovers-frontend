import Api from "@/services/api";

export default {
    fetchMovies () {
        return Api().get("/movie");
    },
    findMovie(id){
        return Api().get(`/movie/${id}`)
    },
    postMovie (movie) {
        return Api().post('/movie',movie,
            {headers:{'Content-type': 'application/json'} })
    },
    buyMovie (id) {
        return Api().put(`/movie/${id}/purchase`)
    },
    deleteMovie (id) {
        return Api().delete(`/movie/${id}`)
    },

    fetchReviews (){
        return Api().get("/review");
    },
    postReview (review) {
        return Api().post(`/review/write`,review,
            {headers:{'Content-type': 'application/json'} })
    },
    ReviewLike (id){
        return Api().put(`/review/${id}/like`)
    },
    reviewDelete (id){
        return Api().delete(`/review/${id}`)
    }



};
