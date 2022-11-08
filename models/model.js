const { User } = require('./user.model')
const { Post } = require('./post.model')
const { Comments } = require('./comments.model')
const { Like } = require('./like.model')
const { Basket } = require('./basket.model')
const { Rating } = require('./rating.model')
const { BasketDevice } = require('./basket-device.model')
const { Product } = require('./product.model')
const { Type } = require('./type.model')
const { Brand } = require('./brand.model')
const { ProductInfo } = require('./product-info.model')
const { TypeBrand } = require('./type-brand.model')

User.hasMany(Post)
Post.belongsTo(User)

Post.hasMany(Comments)
Comments.belongsTo(Post)

User.hasMany(Comments)
Comments.belongsTo(User)

User.hasMany(Like)
Like.belongsTo(User)

Post.hasMany(Like)
Like.belongsTo(Post)

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(BasketDevice)
BasketDevice.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
  User,
  Basket,
  BasketDevice,
  Product,
  Post,
  Type,
  Brand,
  Rating,
  Like,
  TypeBrand,
  ProductInfo,
  Comments,
}
