import express from 'express'
import morgan from 'morgan'

const app = express()

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