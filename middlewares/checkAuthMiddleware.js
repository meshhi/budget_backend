const ApiError = require('../utils/ApiError');
const jsonwebtoken = require('jsonwebtoken');
const { userModel } = require('../models/models');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Unauthorized');
    } else {
      const tokenData = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findOne({where: { id: tokenData?.id }});
      if (user && user.email === tokenData.email) {
        req.user = user;
        return next();
      } else {
        throw new ApiError(401, 'No user with that credentials');
      }
    }
  } catch (err) {
    return process.env.DEBUG === "debug"
      ? next(err)
      : next(new ApiError(500, 'Internal authorization error'));
  }
};