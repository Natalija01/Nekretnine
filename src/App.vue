<template>
  <div id="app">
    <v-app>
      <Loading />
      <navBar></navBar>

      <router-view />
    </v-app>
  </div>
</template>

<script>
import NavBar from '@/components/navBar.vue';
import Loading from '@/components/Common/Loading';

export default {
  components: {
    NavBar,
    Loading
  }
};
</script>
