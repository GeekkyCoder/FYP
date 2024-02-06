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
  getPhone,
  getAllVerifiedPhones,
  verifyPhone,
  sendEmailForRequest,
} = require('../controllers/phone');

const phoneRouter = require('express').Router();

phoneRouter.post('/add/new-entry', authMiddleware, addNewPhoneEntry);
phoneRouter.get('/getallphonesverified', getAllVerifiedPhones);
phoneRouter.get('/getPhone', [authMiddleware,authorize('admin')],getPhone );
phoneRouter.post("/sendEmailForQueries",[authMiddleware,authorize("admin")], sendEmailForRequest)
phoneRouter.post("/verify-phone",[authMiddleware,authorize('admin')], verifyPhone)
phoneRouter.get("/getallphones", [authMiddleware,authorize('admin')], getAllPhones)
phoneRouter.get('/getcomments', authMiddleware, getCommentsOfPhone);
phoneRouter.delete('/deletephone', [authMiddleware, authorize('admin', 'user')], deletePhone);
phoneRouter.put('/updatephone', [authMiddleware, authorize('admin', 'user')], updatePhone);
phoneRouter.post('/showphonestatus', [authMiddleware, authorize('admin', 'user')], showPhoneStatus);
phoneRouter.get('/user-phones', [authMiddleware, authorize('admin', 'user')], getUserPhones);
phoneRouter.get("/phone-stats", getPhoneStatusCounts )

module.exports = {
  phoneRouter,
};
