/* eslint-disable */
<template>
  <modal :show="show" @close="close">
    <div class='posts'>
      <h1>{{type}} Post</h1>
      <div class='form'>
        <div>
          <input type="text" name="title" placeholder="Title" v-model="title">
        </div>
        <div>
          <input type='text' name="author" placeholder='Author' v-model="author">
        </div>
        <div>
          <input
          type='text'
          name='description'
          placeholder='(Optional) A short description about this post'
          v-model="description">
        </div>
        <div>
          <vue-editor v-model='content' placeholder='Content' style='max-width:650px'></vue-editor>
        </div>
        <div>
          <button class='post_btn' @click='foo'>Post It</button>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import PostsService from '@/services/PostsService';
import Modal from './Modal';

export default {
  name: 'Editor',
  props: ['type', 'show'],
  data() {
    return {
      title: '',
      author: '',
      description: '',
      content: '',
      post: Object,
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    async getPost() {
      const response = await PostsService.getPost({
        id: this.$route.params.id,
      });
      this.post = response.data.post;
      this.title = this.post.title;
      this.author = this.post.author;
      this.description = this.post.description;
      this.content = this.post.content;
    },
    async updatePost() {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.title,
        author: this.author,
        description: this.description,
        content: this.content,
        edited: true,
        likeCount: this.post.likeCount,
      });
      this.close();
    },
    foo() {
      if (this.type === 'Edit') {
        this.updatePost();
      } else {
        this.addPost();
      }
    },
    async addPost() {
      await PostsService.addPost({
        title: this.title,
        author: this.author,
        description: this.description,
        content: this.content,
      });
      this.close();
    },
    close() {
      this.$emit('close');
      this.$router.go(-1);
      this.title = '';
      this.content = '';
    },
  },
  components: {
    Modal,
    VueEditor,
  },
};
</script>

<style scoped>
.form input,
.form vue-editor {
  width: 550px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
  max-width: 600px;
}
.form div {
  margin: 20px;
}
.post_btn {
  background: #42b983;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 560px;
  border: none;
  cursor: pointer;
}
</style>
