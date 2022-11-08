const ApiError = require('../error/ApiError')
const ProductService = require('../services/product.service')

class ProductController {
  async create(req, res, next) {
    try {
      const image = req.files
      const response = await ProductService.create(req.body, image)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async update(req, res, next) {
    try {
      const image = req.files
      const response = await ProductService.update(req.params, req.body, image)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async delete(req, res, next) {
    try {
      const response = await ProductService.delete(req.params)     
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      const response = await ProductService.getAll(req.query)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const response = await ProductService.getOne(req.params)
      return res.json(response)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new ProductController();
