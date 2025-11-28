export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getByTitle = async (req, res) => {
    const { title } = req.params
    const movie = await this.movieModel.getByTitle(title)
    if (movie) return res.json(movie)
    res.status(404).send('Movie not foundxd')
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById(id)
    if (movie) return res.json(movie)
    return res.status(404).send('Movie not found')
  }

  create = async (req, res) => {
    const result = await this.movieModel.create(req.body)
    if (result) return res.status(400).send('Invalid request body')
    res.status(201).json(result)
  }

  update = async (req, res) => {
    const result = await this.movieModel.update(req.body, req.params.id)
    res.json(result)
  }
}
