const ApiError = require('../error/ApiError')
const BrandService = require('../services/brand.service')

class BrandController {
  async create(req, res, next) {
    try {
      const response = await BrandService.create(req.body)

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const response = await BrandService.update(req.params, req.body)

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const response = await BrandService.delete(req.params)

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await BrandService.getAll()

      return res.json(response)
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new BrandController();
