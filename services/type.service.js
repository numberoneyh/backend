const { Type } = require("../models/model");

class TypeService {
  async create(data) {
    const { name } = data
    const type = await Type.create({ name })

    return type
  }

  async update(params, data) {
    const { id } = params
    await Type.update({ data }, { where: { id } })

    return { message: 'type successfully updated' }
  }

  async delete(params) {
    const { id } = params
    await Type.destroy({
      where: { id: id },
    })

    return { message: 'type successfully deleted' }
  }

  async getAll() {
    const type = await Type.findAll()

    return type
  }
}

module.exports = new TypeService()