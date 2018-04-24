<template>
  <div id='app'>
    <div id='header'>
      <vue-progress-bar></vue-progress-bar>
      <navbar></navbar>
    </div>
    <div id="app1">
    <transition name='fade'>
      <router-view/>
     </transition>
     <br>
     <br>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  data() {
    return {
      relEl:'#app1',
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    this.$Progress.finish();
  },
  created () {
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },
};
</script>

<style>
.up {
  position:relative;
  left:0;
  margin-left:0;
  margin-right:0;
  bottom:0;
}
html, body{
    height: 99%;
}
a,
a:hover,
a:visited {
  color: #42b983;
}
#header{
  width:100%;  
z-index:-1;
}
#app1 {
  z-index: 9999;
  width: 80%;
  margin-right:2em;
  margin-left:2em;
  margin:auto;
  height:auto;
  padding-top:2em;
}
    ::-webkit-scrollbar {
display: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.35s;
}
.fade-enter-active {
  transition-delay: 0.35s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-leave-active,
.slide-enter-active {
  transition-duration: 0.2s;
}
.slide-active {
  transition-delay: 0.2s;
}
.slide-enter,
.slide-leave-active {
  transform: translate(100%, 0);
}

</style>
