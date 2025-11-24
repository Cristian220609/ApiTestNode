import express from 'express'
import movies from './movies.json' with { type: 'json' }
import crypto from 'crypto'
import { validate, validatePart } from './movies.js'

const app = express()
const PORT = 3000

app.disable('x-powered-by')
app.use(express.json())

app.get('/movies', (req, res) => {
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

app.get('/movies/title/:title', (req, res) => {
  const { title } = req.params
  const movie = movies.find((movie) => movie.title.toLowerCase() === title.toLowerCase())
  if (movie) return res.json(movie)
  res.status(404).send('Movie not foundxd')
})

app.get('/movies/id/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
    return res.status(404).send('Movie not found')
})

app.post('/movies', (req, res) => {
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

app.patch('/movies/id/:id', (req, res) => {
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

app.use((req, res) => {
  res.status(404).send('404 Not Found')
})

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})
