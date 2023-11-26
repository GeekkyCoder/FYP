function errorResponse(res, status, msg) {
  return res.status(status).json({ msg });
}

module.exports = {
  errorResponse,
};
