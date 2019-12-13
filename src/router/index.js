import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Movies from "@/components/Movies";
import Shows from "@/components/Shows";
import Reviews from "@/components/Reviews";
import AddMovie from "@/components/AddMovie";
import AddShow from "@/components/AddShow";
import AddReview from "@/components/AddReview";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/movie",
            name: "Movies",
            component: Movies
        },
        {
            path: "/show",
            name: "Shows",
            component: Shows
        },
        {
            path: "/review",
            name: "Reviews",
            component: Reviews
        },
        {
            path: "/addMovie",
            name: "AddMovie",
            component: AddMovie
        },
        {
            path: "/addShow",
            name: "AddShow",
            component: AddShow
        },
        {
            path: "/addReview",
            name: "AddReview",
            component: AddReview
        }
    ]
});
