<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="appM">
        <v-client-table :columns="columns" :data="movie" :options="options">
        </v-client-table>
    </div>
    </div>
</template>

<script>
import movieService from '@/services/movieService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Movies',
  data () {
    return {
      messagetitle: ' Movies List ',
      movie: [],
      errors: [],
      columns: ['_id', 'title', 'released', 'cost', 'stock'],
      options: {
        headings: {
          _id: 'ID',
          title: 'title',
          released: 'released',
          cost: 'cost',
          stock: 'stock'
        }
      }
    }
  },
  // Fetches movies when the component is created.
  created () {
    this.loadMovies()
  },
  methods: {
    loadMovies: function () {
      movieService.fetchMovies()
        .then(response => {
          // JSON responses are automatically parsed.
          this.movie = response.data
          console.log(this.movie)
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

    #appM {
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
