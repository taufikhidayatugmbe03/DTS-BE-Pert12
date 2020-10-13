import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import router from './router.js'

const app = express()

//connect to db
mongoose.connect(process.env.MONGODB_URI,
    {useNewUrlParser: true, useUnifiedTopology: true,}
).then(() => {
    console.log('Connect to DB success')
}).catch(err => {
    console.log('Connect to failed ' + err)
})

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.get('/', (req, res, next) => {
  res.json({
    message: 'success',
  })
})

app.use('/api', router)


app.listen(process.env.PORT, () => {
  console.log(`App listens to port ${process.env.PORT}`);
})