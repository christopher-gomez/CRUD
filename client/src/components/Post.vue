/* eslint-disable */
<template>
  <!-- Page Content -->
    <div class="container-fluid">

      <div class="">

        <!-- Post Content Column -->
        <div class="">

          <!-- Title -->
          <h1 class="mt-4">{{post.title}}</h1>

          <!-- Author -->
          <p class="lead">
            by
            <a href="#">{{post.author}}</a>
          </p>

          <!-- Date/Time -->
          <p>Posted on {{post.creation.dateCreated}} at {{post.creation.timeCreated}}</p>

          <!-- Preview Image -->
          <!--<img class="img-fluid rounded" src="http://placehold.it/900x300" alt="">-->

          <hr>

          <!-- Need to watch out for XSS Attacks (Sanatize Data/Sqreen) -->
          <!-- Post Content -->
          <div v-html='content'></div>

          <hr>
        </div>
      </div>
    </div>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'Post',
  data() {
    return {
      post: Object,
      content: '',
    };
  },
  created() {
    this.getPost();
  },
  methods: {
    async getPost() {
      const response = await PostsService.getPost({
        id: this.$route.params.id,
      });
      this.post = response.data.post;
      this.content = this.post.content;
    },
  },
};
</script>

<style>
a {
    color: #42b983;
}
ul {
  list-style: none;
}
</style>
