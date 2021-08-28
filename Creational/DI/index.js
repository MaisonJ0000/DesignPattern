import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Blog } from './blog';
import { createDb } from './db';
const __dirname = dirname(fileURLToPath(import.meta.url));


async function main () {
  const db = createDb(join(__dirname, 'data.sqlite'));
  const blog = new Blog(db); // this is injection!! => 장점: test mock 짜기도 편하다.
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
