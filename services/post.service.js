const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const { Post, User, Comments } = require('../models/model')
const { Op } = require('sequelize')
const { imageService, paginateService } = require('./utils.service')

class PostService {
  async create(data, token, image) {
    let { title, content, tags } = data
    const { id } = jwt.verify(token, process.env.SECRET_KEY)
    let post

    if (image) {
      const fileName = await imageService(image)
      post = await Post.create({
        title,
        content,
        img: fileName,
        userId: id,
        tags,
      })
    }

    if (!image) {
      post = await Post.create({
        title,
        content,
        img: 'post.jpg',
        userId: id,
        tags,
      })
    }

    return post
  }

  async update(params, data, token, image) {
    const { id } = params
    const { title, content, tags } = data
    const updatePost = await Post.findByPk(id)
    const postUserId = updatePost.userId
    const { id: currentUserId } = jwt.verify(token, process.env.SECRET_KEY)

    if (postUserId === currentUserId) {
      if (image) {
        const postImage = updatePost.img
        if (postImage !== 'post.jpg') {
          fs.unlinkSync(path.resolve(__dirname, '..', 'static', postImage))
        }
        const fileName = await imageService(image)
        await Post.update(
          { title, content, tags, img: fileName },
          { where: { id } }
        )
      }
      if (!image) {
        await Post.update(
          { title, content, tags, img: updatePost.img },
          { where: { id } }
        )
      }
    }

    if (postUserId !== currentUserId) {
      throw new Error('You are not the author of this post')
    }

    return { message: 'the post has been successfully updated' }
  }

  async delete(params, token) {
    const { id } = params
    const removePost = await Post.findByPk(id)
    const postUserId = removePost.userId
    const { id: currentUserId } = jwt.verify(token, process.env.SECRET_KEY)

    if (postUserId === currentUserId) {
      await Post.destroy({
        where: {
          id: id,
        },
      })
    }

    if (postUserId !== currentUserId) {
      throw new Error('You are not the author of this post')
    }

    return { message: 'post successfully deleted' }
  }

  async getAll(data) {
    let { title, content, limit, page } = data
    const where = {}
    if (title) where.title = { [Op.iLike]: `%${title}%` }
    if (content) where.content = { [Op.iLike]: `%${content}%` }
    let posts

    if (limit) {
      const { limit: limitCount, offset } = paginateService(page, limit)
      posts = await Post.findAndCountAll({
        where: {
          ...where,
        },
        limit: limitCount,
        offset,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'img'],
          },
        ],
      })
    }

    if (!limit) {
      posts = await Post.findAll({
        where: {
          ...where,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'img'],
          },
        ],
      })
    }

    return posts
  }

  async getByOwner(params, token) {
    const id = parseInt(params.id)
    const { id: currentUserId } = jwt.verify(token, process.env.SECRET_KEY)
    let posts

    if (id === currentUserId) {
      posts = await Post.findAll({
        where: {
          userId: currentUserId,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'img'],
          },
        ],
      })
    }

    if (id !== currentUserId) {
      throw new Error('the passed parameters are invalid')
    }

    return posts
  }

  async getOne(params) {
    const { id } = params
    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'img'],
        },
        {
          model: Comments,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'firstName', 'lastName', 'img'],
            },
          ],
        },
      ],
    })

    return post
  }
}

module.exports = new PostService();