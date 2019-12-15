import Api from "@/services/api";

export default {
    fetchMovies () {
        return Api().get("/movie");
    },
    findMovie(id){
        return Api().get(`/movie/${id}`);
    },
    postMovie (movie) {
        return Api().post('/movie',movie,
            {headers:{'Content-type': 'application/json'} });
    },
    buyMovie (id) {
        return Api().put(`/movie/${id}/purchase`);
    },
    deleteMovie (id) {
        return Api().delete(`/movie/${id}`);
    },

    fetchReviews (){
        return Api().get("/review");
    },
    postReview (reviewAdd) {
        return Api().post(`/review/write`,reviewAdd,
            {headers:{'Content-type': 'application/json'} });
    },
    ReviewLike (id){
        return Api().put(`/review/${id}/like`);
    },
    reviewDelete (id){
        return Api().delete(`/review/${id}`);
    },
    fetchReview (id) {
        return Api().get(`/review/${id}`);
    },
    putReview (id, reviewEd) {
        console.log('REQUESTING ' + reviewEd._id + ' ' +
            JSON.stringify(reviewEd, null, 5));
        return Api().put(`/review/edit/${id}`, reviewEd,
            { headers: {'Content-type': 'application/json'} });
    }



};
