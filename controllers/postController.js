const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const { userModel, postModel } = require("../models/models")

class PostController {
  async createPost(req, res, next) {
    try {
      const { title, text } = req.body;
      if (!title || !text) {
        throw ApiError.internalError("Invalid password!");
      } else {
        const post = postModel.findOrCreate({where: {title: title, text: text}})
        const responseData = {
          response: "Get your post!",
          post: post
        }
        res.send(JSON.stringify(responseData));
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new PostController();