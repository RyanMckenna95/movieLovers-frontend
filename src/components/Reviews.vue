<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="app1">
            <v-client-table :columns="columns" :data="reviews" :options="options">
                <a slot="like" slot-scope="props" class="fa fa-thumbs-up fa-2x" @click="likeReview(props.row._id)"></a>
                <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editReview(props.row._id)"></a>
                <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteReview(props.row._id)"></a>
            </v-client-table>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'
    import movieService from "@/services/movieService";

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

    export default {
        name: 'reviews',
        data () {
            return {
                messagetitle: ' Reviews of movie ',
                reviews: [],
                errors: [],
                columns: ['_id', 'author', 'reviewedTitle','review' ,'rating','likes', 'edit', 'like', 'delete'],
                options: {
                    perPage:10,
                    filterable: ['author', 'reviewedTitle'],
                    sortable: ['likes', 'rating'],
                    headings: {
                        _id: 'ID',
                        author: 'author',
                        titleID: 'titleID',
                        reviewedTitle: 'reviewedTitle',
                        review: 'review',
                        rating: 'rating',
                        likes: 'likes'
                    }
                }
            }
        },
        // Fetches Donations when the component is created.
        created () {
            this.loadReviews()
        },
        methods: {
            loadReviews: function () {
                movieService.fetchReviews()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.reviews = response.data
                        console.log(this.reviews)
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            editReview: function (id) {
                this.$router.params = id
                this.$router.push('reviewEdit')
            },
            likeReview: function (id) {
                    movieService.ReviewLike(id)
                        .then(response => {

                            this.loadReviews()
                            console.log(response)
                        })
                        .catch(error => {
                            this.errors.push(error)
                            console.log(error)
                        })

            },
            deleteReview: function (id) {
                this.$swal({
                    title: 'Are you totaly sure?',
                    text: 'You can\'t Undo this action',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'OK Delete it',
                    cancelButtonText: 'Cancel',
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    console.log('SWAL Result : ' + result);
                    if (result === true) {
                        movieService.reviewDelete(id)
                            .then(response => {
                                // JSON responses are automatically parsed.
                                this.message = response.data;
                                console.log(this.message);
                                this.loadReviews();
                                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                                this.$swal('Deleted', 'You successfully deleted this Review ' + JSON.stringify(response.data, null, 5), 'success')
                            })
                            .catch(error => {
                                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                                this.errors.push(error);
                                console.log(error)
                            })
                    } else {
                        this.$swal('Cancelled', 'Movie not deleted!', 'info')
                    }
                })
            }

        }
    }
</script>

<style scoped>
    #app1 {
        width: 60%;
        margin: 0 auto;
    }
    .vue-title {
        margin-top: 30px;
        text-align: center;
        font-size: 45pt;
        margin-bottom: 10px;
    }

</style>