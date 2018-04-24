/* eslint-disable */
<template>
  <div class='posts'>
    <h1 class='underline' style='color:black'>Posts</h1>
    <div v-if = 'posts.length > 0'>
      <div class='add'>
        <router-link :to="{ name:'NewPost', params: {type: 'Add', show:true}}">
          <md-button class="md-fab md-primary" style='background: #42b983;'>
            <md-icon style='color:white'>add</md-icon>
          </md-button>
        </router-link>
      </div>
      <ul>
      <div v-for="(post,index) in posts" :key="index">
        <li>
        <md-card class='md-elevation-4' style='background:#FfFFA5'>
          <router-link :to="{name:'Post', params: {id:post._id, post:post}}" class='lnk'>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title"> {{ post.title }}</div>
                <div class="md-subhead" style='margin-top:6px'>
                  By {{post.author}} <br>
                  on {{ post.creation.dateCreated }}
                  @ {{post.creation.timeCreated }}
                </div>
              </md-card-header-text>
            </md-card-header>
          </router-link>
          <md-card-content>
            <div v-if='post.description == ""' v-html='post.content'>
            </div>
            <div v-else>
              <h4 style='font-size:1.4em;'>{{post.description}}</h4>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button style='position:absolute;left:15px;' @click='likePost(post)'>
            <md-icon>favorite</md-icon>
            <span> {{ post.likeCount }} </span>
            </md-button>
            <router-link :to="{ name:'EditPost', params: {type: 'Edit', show:true, id:post._id}}">
              <md-button class='md-icon-button'>
                <md-icon>edit</md-icon>
              </md-button>
            </router-link>
            <md-button class='md-icon-button' @click='deletePost(post._id)'>
              <md-icon>delete</md-icon>
            </md-button>
          </md-card-actions>
        </md-card>
        </li>
      </div>
      </ul>
    </div>

    <div v-else>
      There are no posts... Let's add one now <br/><br/>
      <router-link :to="{ name:'NewPost', params: {type: 'Add', show:true}}" class='add_post_link'>
        <md-button class="md-fab md-primary"
        style='background: #42b983;' @click="showNewPostModal = true; type='Add'">
          <md-icon style='color:white'>add</md-icon>
        </md-button>
      </router-link>
    </div>
    <router-view v-on:close='getPosts'></router-view>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService';

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      showNewPostModal: false,
      type: 'Add',
      post: Number,
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await PostsService.fetchPosts();
      this.posts = response.data.posts;
    },
    async deletePost(id) {
      await PostsService.deletePost(id);
      this.getPosts();
      this.$router.push({ name: 'Posts' });
    },
    async likePost(post) {
      await PostsService.updatePost({
        // eslint-disable-next-line
        id: post._id,
        title: post.title,
        author: post.author,
        creation: {
          dateCreated: post.creation.dateCreated,
          timeCreated: post.creation.timeCreated,
        },
        description: post.description,
        edited: post.edited,
        content: post.content,
        likeCount: post.likeCount + 1,
      });
      this.getPosts();
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
.lnk {
  text-decoration: none;
  color:black;
}
.lnk:hover {
  text-decoration: none;
}
.add {
  position: fixed;
  bottom: 20px;
  left: 20px;
}
.md-menu {
  margin: 12px;
}
.md-card {
  width: 320px;
  display: inline-block;
  margin-bottom: 20px;
  vertical-align: top;
  text-align: unset;
}
.md-button-group {
  display: flex;
}
.underline {
  display: inline-block;
  line-height: 0.85;
  text-shadow: 2px 2px white, 2px -2px white, -2px 2px white, -2px -2px white;
  margin-bottom: 30px;
}
</style>
