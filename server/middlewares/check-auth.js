const chechPermissions = (requestUser, resourceUserId) => {
  console.log(requestUser)
  if (requestUser?.role === 'admin') return true;
  if (requestUser?.userId === resourceUserId) return true;
  return false;
};

module.exports = chechPermissions;
