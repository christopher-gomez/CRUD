import Vue from 'vue';
import Router from 'vue-router';
import Posts from '@/components/Posts';
import Editor from '@/components/Editor';
import Post from '@/components/Post';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: __dirname,
	routes: [
		{
			path: '/posts',
			name: 'Posts',
			component: Posts,
			children: [
				{ path: '/posts/editor/new', name: 'NewPost', component: Editor, props: true },
				{ path: '/posts/editor/:id', name: 'EditPost', component: Editor, props: true },
			],
		},
		{ path: '/posts/:id', name: 'Post', component: Post },
	],
});
