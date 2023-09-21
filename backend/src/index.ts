import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './Config/config'
import userRoutes from './Routes/UsersRoutes'
import {
  generalErrorMiddleware,
  notFoundMiddleware,
} from './Middlewares/ErrorMiddleware'
import cors from 'cors'

const port = process.env.PORT || 5000

connectDB()

const options = {
  origin: ['http://localhost:3000', 'http://localhost:300*'],
}

const app = express()

app.use(express.json())
app.use(cors(options))
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Application is running')
  })
}

app.use(notFoundMiddleware)
app.use(generalErrorMiddleware)

app.listen(port, () => console.log(`Application is running on port #${port}`))
