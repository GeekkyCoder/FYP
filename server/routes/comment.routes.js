const authMiddleware = require('.././middlewares/authMiddleware');
const { createComment } = require('../controllers/comments');

const commentRouter = require('express').Router();

commentRouter.post('/createcomment', authMiddleware, createComment);

module.exports = {
  commentRouter,
};
