import { Router } from 'express'
import movies from '../movies.json' with { type: 'json' }
import crypto from 'crypto'
import { validate, validatePart } from '../schemas/movies.js'

export const router = Router()

router.get('/', (req, res) => {
  const { genre } = req.query
  const moviesByGenre = []
  if (genre === undefined) return res.json(movies)
  movies.forEach(movie => {
    movie.genre.forEach(movieGenre => {
      if (movieGenre.toLowerCase() === genre.toLowerCase()) {
        moviesByGenre.push(movie)
      }
    })
  })
  return res.json(moviesByGenre)
})

router.get('/title/:title', (req, res) => {
  const { title } = req.params
  const movie = movies.find((movie) => movie.title.toLowerCase() === title.toLowerCase())
  if (movie) return res.json(movie)
  res.status(404).send('Movie not foundxd')
})

router.get('/id/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
    return res.status(404).send('Movie not found')
})

router.post('/', (req, res) => {
  const result = validate(req.body)
  if (result.error) {
    return res.status(400).send("Invalid request body")
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

router.patch('/id/:id', (req, res) => {
  const result = validatePart(req.body)
  if (result.error) {
    return res.status(400).send('Invalid request body')
  }
  const { id } = req.params
  const movie = movies.findIndex((movie) => movie.id === id)
  if (movie === -1) {
    return res.status(404).send('Error not found')
  }

  const updateMovie = {
    ...movies[movie],
    ...result.data
  }
  movies[movie] = updateMovie
  res.json(updateMovie)
})

router.use((req, res) => {
  res.status(404).send('404 Not Found')
})
