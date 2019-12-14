<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img id="logo" src="./assets/reel.png" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Movie lovers Web App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/movie"><i class="fa fa-list" style="padding: 5px"> Manage Movies</i></b-nav-item>
          <b-nav-item to="/show"><i class="fa fa-list" style="padding: 5px"> Manage Shows</i></b-nav-item>
          <b-nav-item to="/review"><i class="fa fa-list" style="padding: 5px"> Manage Reviews</i></b-nav-item>
          <b-nav-item to="/addMovie"><i class="fa fa-plus" style="padding: 5px"> Add Movie</i></b-nav-item>
          <b-nav-item to="/addShow"><i class="fa fa-plus" style="padding: 5px"> Add show</i></b-nav-item>
          <b-nav-item to="/addReview"><i class="fa fa-plus" style="padding: 5px"> Add review</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about"><i class="fa fa-info" style="padding: 5px"> About Us</i></b-nav-item>
          <b-nav-item to="/contact"><i class="fa fa-comment" style="padding: 5px"> Contact Us</i></b-nav-item>
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eae6ee;
  margin-top: 60px;
  background-color: #aa5555;
}
  #logo {
    height: 50px;
    width: 50px;
  }
.VueTables__sortable {
  cursor: pointer;
}
</style>
