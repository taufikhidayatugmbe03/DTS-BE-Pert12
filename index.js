import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'

const app = express()

// Connect to DB
mongoose.connect('mongodb+srv://admin:admin@restapi.spcdd.mongodb.net/jadwalin?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {

  console.log('Connect to database success');
})

// Middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.get('/', (req, res) => {
  res.json({
    message: 'success',
  })
})
app.listen('8000', () => {
  console.log('App listen on port 8000')
})