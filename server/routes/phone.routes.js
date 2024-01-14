const authorize = require('../middlewares/authorize');
const authMiddleware = require('.././middlewares/authMiddleware');
const {
  addNewPhoneEntry,
  getAllPhones,
  getCommentsOfPhone,
  deletePhone,
  updatePhone,
  showPhoneStatus,
  getUserPhones,
  getPhoneStatusCounts,
} = require('../controllers/phone');

const phoneRouter = require('express').Router();

phoneRouter.post('/add/new-entry', authMiddleware, addNewPhoneEntry);
phoneRouter.get('/getallphones', getAllPhones);
phoneRouter.get('/getcomments', authMiddleware, getCommentsOfPhone);
phoneRouter.delete('/deletephone', [authMiddleware, authorize('admin', 'user')], deletePhone);
phoneRouter.put('/updatephone', [authMiddleware, authorize('admin', 'user')], updatePhone);
phoneRouter.post('/showphonestatus', [authMiddleware, authorize('admin', 'user')], showPhoneStatus);
phoneRouter.get('/user-phones', [authMiddleware, authorize('admin', 'user')], getUserPhones);
phoneRouter.get("/phone-stats", getPhoneStatusCounts )

module.exports = {
  phoneRouter,
};
