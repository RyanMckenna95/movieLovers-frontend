import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Movies from "@/components/Movies";
import Shows from "@/components/Shows";
import Reviews from "@/components/Reviews";

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
        }

    ]
});
