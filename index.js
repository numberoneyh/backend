require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/model')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/router')
const path = require('path')
const {
  ErrorHandlingMiddleware,
} = require('./middleware/ErrorHandlingMiddleware')
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(ErrorHandlingMiddleware)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log('server started on port:' + PORT))
  } catch (e) {
    console.log(e.message)
  }
}

start();
