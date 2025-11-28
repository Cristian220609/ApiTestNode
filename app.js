import express, { json } from 'express'
import { MovieRoutes } from './routes/movies.js'
import { CorsMiddleware } from './middlewares/cors.js'
import { ErrorMiddleware } from './middlewares/error.js'
import { MovieModel } from './models/sql/movie.js'

const app = express()
const PORT = process.env.PORT ?? 1234

app.use(CorsMiddleware())
app.use(json())
app.disable('x-powered-by')
app.use('/movies', MovieRoutes({ movieModel: MovieModel }))
app.use(ErrorMiddleware())

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
