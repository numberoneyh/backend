const ApiError = require('../error/ApiError')
const CommentService = require('../services/comment.service')

class CommentController {
  async create(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await CommentService.create(req.body, token)

      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await CommentService.update(req.body, req.params, token)

      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await CommentService.delete(req.params, token)

      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await CommentService.getAll()

      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new CommentController()