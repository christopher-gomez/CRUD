import Api from '@/services/Api';

export default {
  fetchPosts() {
    return Api().get('/posts');
  },
  getPost(params) {
    return Api().get(`post/${params.id}`);
  },
  addPost(params) {
    return Api().post('/posts', params);
  },
  updatePost(params) {
    return Api().put(`posts/${params.id}`, params);
  },
  deletePost(id) {
    return Api().delete(`posts/${id}`);
  },
};
