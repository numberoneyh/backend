const jwt = require('jsonwebtoken')
const { Comments, User } = require('../models/model')

class CommentService {
  async create(data, token) {
    const { title, postId } = data
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    const comment = await Comments.create({ title, postId, userId: id })

    return comment
  }

  async update(data, params, token) {
    const { id } = params
    const { title } = data
    const { id: userId } = jwt.verify(token, process.env.SECRET_KEY)
    const updateComment = await Comments.findByPk(id)

    if (userId === updateComment.userId) {
      await Comments.update({ title }, { where: { id } })
    } else {
      throw new Error('You are not the author of this comment')
    }

    return { message: 'Comment successfully updated' }
  }

  async delete(params, token) {
    const { id } = params
    const updateComment = await Comments.findByPk(id)
    const { id: userId } = jwt.verify(token, process.env.SECRET_KEY)

    if (userId === updateComment.userId) {
      await Comments.destroy({ where: { id } })
    } else {
      throw new Error('You are not the author of this comment')
    }

    return { message: 'Comment successfully removed' }
  }

  async getAll() {
    const comments = await Comments.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'img'],
        },
      ],
    })

    return comments
  }
}

module.exports = new CommentService();