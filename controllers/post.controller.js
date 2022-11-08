const ApiError = require('../error/ApiError')
const PostService = require('../services/post.service')

class PostController {
  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await PostService.create(req.body, token, req.files)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await PostService.update(req.params, req.body, token, req.files)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await PostService.delete(req.params, token)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await PostService.getAll(req.query)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getByOwner(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await PostService.getByOwner(req.params, token)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const response = await PostService.getOne(req.params)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new PostController();
