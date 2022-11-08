const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role, firstName, lastName, dateBirth, gender, img) => {
  return jwt.sign(
    { id, email, role, firstName, lastName, dateBirth, gender, img },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

module.exports = {generateJwt}