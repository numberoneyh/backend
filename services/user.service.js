const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require("path");
const { Op } = require('sequelize')
const { generateJwt } = require('./token.service')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/model')
const { imageService, paginateService } = require('./utils.service')


class UserService {
  async registration(data, avatar) {
    const { email, role, password, firstName, lastName, gender, dateBirth } =
      data
    let user
    if (!email || !password) {
      throw new Error('Invalid email or password')
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw new Error('A user with this email already exists')
    }
    const hashPassword = await bcrypt.hash(password, 5)
    if (avatar) {
      const fileName = await imageService(avatar)
      user = await User.create({
        email,
        role,
        password: hashPassword,
        firstName,
        lastName,
        dateBirth,
        gender,
        img: fileName,
      })
    }
    if (!avatar) {
      user = await User.create({
        email,
        role,
        password: hashPassword,
        firstName,
        lastName,
        dateBirth,
        gender,
        img: 'avatar.jpg',
      })
    }
    await Basket.create({ userId: user.id })
    return { message: 'the user has been successfully registered' }
  }

  async login(data) {
    const { email, password } = data
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('User not found')
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      throw new Error('Invalid password specified')
    }
    const token = generateJwt(
      user.id,
      user.email,
      user.role,
      user.firstName,
      user.lastName,
      user.dateBirth,
      user.gender,
      user.img
    )
    return { token }
  }

  async update(data, avatar, token) {
    const { email, password, firstName, lastName, dateBirth, gender } = data
    const { id, img } = jwt.verify(token, process.env.SECRET_KEY)
    const hashPassword = await bcrypt.hash(password, 5)

    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      throw new Error('A user with this email already exists')
    }

    if (avatar) {
      const user = await User.findByPk(id)
      const userAvatar = user.img
      if (userAvatar !== 'avatar.jpg') {
        fs.unlinkSync(path.resolve(__dirname, '..', 'static', userAvatar))
      }
      const fileName = await imageService(avatar)
      await User.update(
        {
          email,
          password: hashPassword,
          firstName,
          lastName,
          dateBirth,
          gender,
          img: fileName,
        },
        {
          where: {
            id: id,
          },
        }
      )
    }
    if (!avatar) {
      await User.update(
        {
          email,
          password: hashPassword,
          firstName,
          lastName,
          dateBirth,
          gender,
          img: img,
        },
        {
          where: {
            id: id,
          },
        }
      )
    }
    return {
      message: 'User successfully updated',
    }
  }

  async check(data) {
    const token = generateJwt(
      data.user.id,
      data.user.email,
      data.user.role,
      data.user.firstName,
      data.user.lastName,
      data.user.dateBirth,
      data.user.gender,
      data.user.img
    )
    return { token }
  }

  async getAll(data) {
    let { page, limit, firstName, lastName } = data
    const where = {}
    if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` }
    if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` }
    let users

    if (limit) {
      const { limit: limitCount, offset } = paginateService(page, limit)
      users = await User.findAndCountAll({
        limit: limitCount,
        offset,
        where: {
          ...where,
        },
        attributes: {
          exclude: ['role', 'password'],
        },
      })
    }

    if (!limit) {
      users = await User.findAll({
        where: {
          ...where,
        },
        attributes: {
          exclude: ['role', 'password'],
        },
      })
    }

    return users
  }
  
  async getOne(params) {
    const {id} = params
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['role', 'password'],
      },
    })
    return user
  }
}

module.exports = new UserService();
