<template>
    <div class="hero">
        <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
        <div id="appM">
        <v-client-table :columns="columns" :data="movie" :options="options">
            <a slot="purchase" slot-scope="props" class="fa fa-money fa-2x" @click="purchase(props.row._id)"></a>
            <a slot="Delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteMovie(props.row._id)"></a>
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
        props:['_id','stock', 'title'],
      errors: [],
      columns: ['_id', 'title', 'released', 'cost', 'stock', 'purchase','Delete'],
      options: {
          perPage:10,
          filterable: ['title', 'released'],
          sortable: ['cost', 'stock'],
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
    },
      purchase: function (id) {
        movieService.buyMovie(id)
            .then(response => {
              // if(id.stock > 1){
              //     console.log(this.errors)
              //   }

                this.loadMovies()
                console.log(response)
            })
            .catch(error => {
                this.errors.push(error)
                console.log(error)
            })

      },

      deleteMovie: function (id) {
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
                  movieService.deleteMovie(id)
                      .then(response => {
                          // JSON responses are automatically parsed.
                          this.message = response.data;
                          console.log(this.message);
                          this.loadMovies();
                          // Vue.nextTick(() => this.$refs.vuetable.refresh())
                          this.$swal('Deleted', 'You successfully deleted this Movie ' + JSON.stringify(response.data, null, 5), 'success')
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
        // } else{
        //     this.$swal('Unable to delete', 'Movie not deleted. more then 0 in stock', 'info')
        // }
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
