const { Brand } = require('../models/model')

class BrandService {
  async create(data) {
    const { name } = data
    const brand = await Brand.create({ name })

    return brand
  }

  async update(params, data) {
    const { id } = params
    await Brand.update({ data }, { where: { id } })

    return { message: 'brand successfully updated' }
  }

  async delete(params) {
    const { id } = params
    await Brand.destroy({
      where: { id: id },
    })

    return { message: 'brand successfully deleted' }
  }

  async getAll() {
    const brand = await Brand.findAll()

    return brand
  }
}

module.exports = new BrandService()