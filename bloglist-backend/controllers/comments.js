const jwt = require('jsonwebtoken');
const commentsRouter = require('express').Router();
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

blogsRouter.get('/:id', async (request, response) => {
  const comments = await Comment.find({}).populate('blog', { title: 1 });
  response.json(comments);
});

commentsRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);

  if (!blog) return response.status(404).end();

  const comment = new Comment({
    blog: blog._id,
    title: body.title,
  });

  try {
    const savedComment = await comment.save();

    response.json(savedComment);
  } catch (exception) {
    next(exception);
  }
});

module.exports = commentsRouter;
