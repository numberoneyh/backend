const uuid = require('uuid')
const path = require('path')

const imageService = async image => {
  let fileName = uuid.v4() + '.jpg'
  await image.img.mv(path.resolve(__dirname, '..', 'static', fileName))
  return fileName
}

const paginateService = (page, limit) => {
  page = page || 1
  limit = limit || 10
  let offset = page * limit - limit

  return { limit, offset }
}

module.exports = { imageService, paginateService }