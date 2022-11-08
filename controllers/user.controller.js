const ApiError = require('../error/ApiError')
const UserService = require('../services/user.service')

class UserController {
  async registration(req, res, next) {
    try {
      const response = await UserService.registration(req.body, req.files)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res, next) {
    try {
      const response = await UserService.login(req.body)
      return res.json(response)
    } catch (e) {
      next(ApiError.forbidden(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const response = await UserService.update(req.body, req.files, token)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async check(req, res) {
    const response = await UserService.check(req)
    return res.json(response)
  }

  async getAll(req, res) {
    const response = await UserService.getAll(req.query)
    return res.json(response)
  }
  
  async getOne(req, res, next) {
    try {
      const response = await UserService.getOne(req.params)
      res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new UserController();
