import { Blog } from './blog';

async function main () {
  const blog = new Blog();
  await blog.initialize();
  await blog.createPost(4, 'ho', 'aaa1', 210820)
  const posts = await blog.getAllPosts();
  if (posts.length === 0) {
    console.log('[JONGMAN_LOG] No post available', new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  }
  for (const post of posts) {
    console.log('[JONGMAN_LOG] post.title', post.title, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
    console.log('[JONGMAN_LOG] post.content', post.content, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  }
}

main()
