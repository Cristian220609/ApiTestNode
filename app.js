import express, { json } from 'express'
import { router } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
const PORT = process.env.PORT ?? 1234

app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.use('/movies', router)

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
