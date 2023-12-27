const authorize = require('../middlewares/authorize');
const authMiddleware = require('.././middlewares/authMiddleware');
const { createComment, deleteComment } = require('../controllers/comments');

const commentRouter = require('express').Router();

commentRouter.post('/createcomment', authMiddleware, createComment);
commentRouter.delete('/deletecomment', [authMiddleware,authorize("admin","user")], deleteComment);


module.exports = {
  commentRouter,
};
