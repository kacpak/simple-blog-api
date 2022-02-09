import { newPostRequestSchema, updatePostRequestSchema } from './dto';
import { createNewPost, deletePost, getAllPosts, getPost, updatePost } from '../db';
import express from 'express';
import { ensureAuth } from '../auth/auth';

const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const posts = await getPost(Number(req.params.id));
  res.json(posts);
});

router.post('/', ensureAuth, async (req, res) => {
  if (!req.header('content-type')) {
    res.status(415).json({ error: ['Server accepts only json payload'] });
  }
  try {
    const newPost = await newPostRequestSchema.validate(req.body, { strict: true });
    const newPostFromDB = await createNewPost(newPost, req.user!.id);
    return res.json(newPostFromDB);
  } catch (e) {
    res.status(400).json({ error: (e as any)?.errors ?? e });
  }
});

router.put('/:id', ensureAuth, async (req, res) => {
  if (!req.header('content-type')) {
    res.status(415).json({ error: ['Server accepts only json payload'] });
  }
  try {
    const postId = Number(req.params.id);
    const postUpdateDiff = await updatePostRequestSchema.validate(req.body, { strict: true });
    await updatePost(req.user!.id, postId, postUpdateDiff);
    return res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ error: (e as any)?.errors ?? e });
  }
});

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const postId = Number(req.params.id);
    await deletePost(req.user!.id, postId);
    return res.sendStatus(204);
  } catch (e) {
    res.status(400).json({ error: (e as any)?.errors ?? e });
  }
});
