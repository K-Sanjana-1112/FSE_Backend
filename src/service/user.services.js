const userDao = require('../dao/userDao');

const createUser = async (data) => {
  const newUser = await userDao.createUser(data);
  return newUser;
};
 
const userLogin = async (email,password,role) => {
  const newUser = await userDao.loginUser(email,password,role);
  return newUser;
};

const resetPwd = async (loginId,password,confirmPwd) => {
  const newUser = await userDao.resetPwd(loginId,password,confirmPwd);
  return newUser;
};

module.exports = {
  createUser,
  userLogin,
  resetPwd
};

