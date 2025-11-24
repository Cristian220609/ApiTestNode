import { Router } from 'express'
import { MovieController } from '../controllers/movie.js'

export const router = Router()

router.get('/', MovieController.getAll)
router.get('/title/:title', MovieController.getByTitle)
router.get('/id/:id', MovieController.getById)
router.post('/', MovieController.create)
router.patch('/id/:id', MovieController.update)
