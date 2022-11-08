const ApiError = require('../error/ApiError')
const TypeService = require('../services/type.service')

class TypeController {
  async create(req, res, next) {
    try {
      const response = await TypeService.create(req.body)

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const response = await TypeService.update(req.params, req.body)

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const response = await TypeService.delete(req.params)

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await TypeService.getAll()

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new TypeController();
