// import { validate, validatePart } from '../../schemas/movies.js'
// import crypto from 'crypto'

import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testbd'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const query = 'SELECT movies.*, genre.* FROM movies JOIN movie_genres ON movies.id = movie_genres.movie_id JOIN genre ON movie_genres.genre_id = genre.id WHERE genre.name = ?'
      const [movies] = await connection.query(query, genre)
      return movies
    }
    const [movies] = await connection.query('SELECT * FROM movies')
    return movies
  }

  static async getByTitle (title) {
    const [movies] = await connection.query('SELECT * FROM movies WHERE title = ?', title)
    return movies
  }

  static async getById (id) {
    const [movies] = await connection.query('SELECT * FROM movies WHERE id = ?', id)
    return movies
  }

  static async create (movieData) {

  }

  static async update (movieData, movieId) {

  }
}
