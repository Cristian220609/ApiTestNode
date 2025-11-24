import { MovieModel } from '../models/movie.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getByTitle (req, res) {
    const { title } = req.params
    const movie = await MovieModel.getByTitle(title)
    if (movie) return res.json(movie)
    res.status(404).send('Movie not foundxd')
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById(id)
    if (movie) return res.json(movie)
    return res.status(404).send('Movie not found')
  }

  static async create (req, res) {
    const result = await MovieModel.create(req.body)
    if (result) return res.status(400).send('Invalid request body')
    res.status(201).json(result)
  }

  static async update (req, res) {
    const result = await MovieModel.update(req.body, req.params.id)
    res.json(result)
  }
}
