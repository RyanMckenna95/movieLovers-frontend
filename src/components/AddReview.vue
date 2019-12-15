<template>
    <div id="app1" class="hero">
        <h3 class="vue-title"><i class="fa fa-edit" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div class="container mt-3 mt-sm-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                        <review-form :review="reviewA" reviewBtnTitle="Add Review"
                                     @review-is-created-updated="addReview"></review-form>
                </div><!-- /col -->
            </div><!-- /row -->
        </div><!-- /container -->
    </div>
</template>

<script>
    import movieService from "@/services/movieService";
    import ReviewForm from "@/components/ReviewForm";

    export default {
        data () {
            return {
                reviewA: {author: '', titleID: "", reviewedTitle: "", review: "", rating: 1 },
                messagetitle: ' Add Review '
            }
        },
        components: {
            'review-form': ReviewForm
        },
        methods: {
            addReview: function (review) {
                movieService.postReview(review)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            }
        }
    }
</script>

<style scoped>
    #app1 {
        width: 95%;
        margin: 0 auto;
    }
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }
</style>
