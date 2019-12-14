<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="app1">
            <v-client-table :columns="columns" :data="shows" :options="options">
                <a slot="purchase" slot-scope="props" class="fa fa-money fa-2x" @click="purchase(props.row._id)"></a>
                <a slot="Delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteShow(props.row._id)"></a>
            </v-client-table>
        </div>
    </div>
</template>

<script>
    import showService from '@/services/showService'
    import Vue from 'vue'
    import VueTables from 'vue-tables-2'

    Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

    export default {
        name: 'shows',
        data () {
            return {
                messagetitle: ' Shows List ',
                shows: [],
                errors: [],
                columns: ['_id', 'title', 'season', 'released','cost','stock', 'purchase','Delete'],
                options: {
                    headings: {
                        _id: 'ID',
                        title: 'Title',
                        season: 'Season',
                        released: 'released',
                        cost: 'cost',
                        stock: 'stock'
                    }
                }
            }
        },
        // Fetches Donations when the component is created.
        created () {
            this.loadShows()
        },
        methods: {
            loadShows: function () {
                showService.fetchShows()
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.shows = response.data
                        console.log(this.shows)
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })
            },
            purchase: function (id) {
                showService.buyShow(id)
                    .then(response => {
                        // if(id.stock > 1){
                        //     console.log(this.errors)
                        //   }

                        this.loadShows()
                        console.log(response)
                    })
                    .catch(error => {
                        this.errors.push(error)
                        console.log(error)
                    })

            },
            deleteShow: function (id) {
                // let test;
                //  test=  stock

                // if (test === 0 ){
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
                        showService.deleteShow(id)
                            .then(response => {
                                // JSON responses are automatically parsed.
                                this.message = response.data;
                                console.log(this.message);
                                this.loadShows();
                                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                                this.$swal('Deleted', 'You successfully deleted this Show ' + JSON.stringify(response.data, null, 5), 'success')
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