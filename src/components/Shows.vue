<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="app1">
            <v-client-table :columns="columns" :data="shows" :options="options">
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
                columns: ['_id', 'title', 'season', 'released','cost','stock'],
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