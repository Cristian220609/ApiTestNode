import { Router } from 'express'
import { MovieController } from '../controllers/movie.js'

export const MovieRoutes = ({ movieModel }) => {
  const router = Router()
  const movieController = new MovieController({ movieModel })
  router.get('/', movieController.getAll)
  router.get('/title/:title', movieController.getByTitle)
  router.get('/id/:id', movieController.getById)
  router.post('/', movieController.create)
  router.patch('/id/:id', movieController.update)
  return router
}
