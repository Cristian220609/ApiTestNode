import movies from './movies.json' with { type: 'json' }
import { validate, validatePart } from '../../schemas/movies.js'
import crypto from 'crypto'

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(movie => {
        movie.genre === genre
      })
    }
    return movies
  }

  static async getByTitle (title) {
    return movies.find((movie) => {
      movie.title.toLowerCase() === title.toLowerCase()
    })
  }

  static async getById (id) {
    return movies.find((movie) => movie.id === id)
  }

  static async create (movieData) {
    const result = validate(movieData)
    if (result.error) return false
    const newMovie = {
      id: crypto.randomUUID(),
      ...result.data
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update (movieData, movieId) {
    const result = validatePart(movieData)
    if (result.error) return false
    const movie = movies.findIndex((movie) => movie.id === movieId)
    if (movie === -1) return false
    const updateMovie = {
    ...movies[movie],
    ...result.data
    }
    movies[movie] = updateMovie
    return updateMovie
  }
}
