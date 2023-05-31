const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");
const { userModel, postModel } = require("../models/models")

class PostController {
  async getPosts(req, res, next) {
    try {
      const authUser = req.user;
      let { page, count } = req.query;
      page = page ? page : 1;
      count = count ? count : 10;
      console.log(page, count);
      const offset = page * count - count;
      const posts = await postModel.findAll({offset: offset, limit: count})

      const responseData = {
        response: "Posts!",
        posts
      }
      res.send(JSON.stringify(responseData));
      
    } catch (err) {
      return next(err);
    }
  };

  async createPost(req, res, next) {
    try {
      const { title, text } = req.body;
      const authUser = req.user;
      if (!title || !text) {
        throw ApiError.internalError("No data for blog post creation!");
      } else {
        let post = await postModel.findOne({where: {title: title, text: text}})
        if (post) {
          return next(new ApiError(400, 'Post already exists'));
        } else {
          post = await postModel.create({title: title, text: text, UserId: authUser.id});
        }
        const responseData = {
          response: "Blog post created!",
          post: post
        }
        res.statusCode = 201;
        res.send(JSON.stringify(responseData));
      }
    } catch (err) {
      return next(err);
    }
  };

  async editPost(req, res, next) {
    try {
      const { title, text } = req.body;
      const postId = req.params.id;
      const authUser = req.user;
      const post = await postModel.findOne({where: {id: postId}, include: { model: userModel, where: {id: authUser.id}}});
      if (!post) {
        throw ApiError.internalError("You cant edit this blog post!");
      } else {
        await post.update({title: title, text: text});
        const response = {
          response: `Post ${postId} updated!`
        }
        res.send(JSON.stringify(response));
      }
    } catch (err) {
      return next(err);
    }
  };

  async deletePost(req, res, next) {
    try {
      const postId = req.params.id;
      const authUser = req.user;
      const post = await postModel.findOne({where: {id: postId}, include: { model: userModel, where: {id: authUser.id}}});
      if (!post) {
        throw new ApiError(404, "Blog post not found!");
      } else {
        await post.destroy();
        const response = {
          response: `Post ${postId} deleted`
        }
        res.send(JSON.stringify(response));
      }
    } catch (err) {
      return next(err);
    }
  };
}

module.exports = new PostController();