const authMiddleware = require('.././middlewares/authMiddleware');
const { addNewPhoneEntry } = require('../controllers/phone');

const phoneRouter = require('express').Router();

phoneRouter.post('/add/new-entry', authMiddleware, addNewPhoneEntry);

module.exports = {
  phoneRouter,
};
