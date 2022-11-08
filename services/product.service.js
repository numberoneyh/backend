const { Product, ProductInfo } = require('../models/model')
const { imageService, paginateService } = require('./utils.service')
const { Op } = require('sequelize')
const fs = require('fs')
const path = require('path')

class ProductService {
  async create(date, image) {
    let { name, price, brandId, typeId, info } = date
    let product

    if (image) {
      const fileName = await imageService(image)
      product = await Product.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      })
    }

    if (!image) {
      product = await Product.create({
        name,
        price,
        brandId,
        typeId,
        img: 'product.jpg',
      })
    }

    if (info) {
      info.forEach(el =>
        ProductInfo.create({
          title: el.title,
          description: el.description,
          productId: product.id,
        })
      )
    }

    return product
  }

  async update(params, data, image) {
    const { id } = params
    let { name, price, brandId, typeId, info } = data

    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }],
    })

    if (image) {
      const productImage = product.img

      if (productImage !== 'product.jpg') {
        fs.unlinkSync(path.resolve(__dirname, '..', 'static', productImage))
      }

      const fileName = await imageService(image)
      await Product.update(
        {
          name: name,
          price: price,
          brandId: brandId,
          typeId: typeId,
          img: fileName,
        },
        {
          where: {
            id: id,
          },
        }
      )
    }

    if (!image) {
      await Product.update(
        {
          name: name,
          price: price,
          brandId: brandId,
          typeId: typeId,
          img: product.img,
        },
        {
          where: {
            id: id,
          },
        }
      )
    }

    if (info) {
      info.forEach(el =>
        ProductInfo.update(
          {
            title: el.title,
            description: el.description,
          },
          {
            where: { id: id },
          }
        )
      )
    }
    return { message: 'success updated' }
  }

  async delete(params) {
    const { id } = params

    await Product.destroy({
      where: {
        id: id,
      },
    })

    return { message: 'success deleted' }
  }

  async getAll(data) {
    let { brandId, typeId, name, limit, page } = data
    const where = {}

    if (brandId) where.brandId = { [Op.eq]: brandId }
    if (typeId) where.typeId = { [Op.eq]: typeId }
    if (name) where.name = { [Op.iLike]: `%${name}%` }
    let products

    if (limit) {
      const { limit: limitCount, offset } = paginateService(page, limit)
      products = await Product.findAndCountAll({
        limit: limitCount,
        offset,
        where: {
          ...where,
        },
      })
    }

    if (!limit) {
      products = await Product.findAll({
        where: {
          ...where,
        },
      })
    }

    return products
  }

  async getOne(params) {
    const { id } = params

    const product = await Product.findByPk(id, {
      include: [{ model: ProductInfo, as: 'info' }],
    })

    return product
  }
}

module.exports = new ProductService();