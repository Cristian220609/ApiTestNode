// import { validate, validatePart } from '../../schemas/movies.js'
// import crypto from 'crypto'
import { MySQLConnection } from './mysql.js'

export class MovieModel {
  static async getAll ({ genre }) {
    const db = new MySQLConnection()
    await db.connect()
    try {
      let SQLquery = 'SELECT * FROM test'
      if (genre) {
        SQLquery += ' WHERE genre = ?'
        const rows = await db.query(SQLquery, [genre])
        return rows
      } else {
        const rows = await db.query(SQLquery)
        return rows
      }
    } catch (error) {
      console.error('Error al obtener las películas:', error.message)
      throw new Error('No se pudieron obtener las películas')
    } finally {
      await db.close()
    }
  }

  static async getByTitle (title) {

  }

  static async getById (id) {

  }

  static async create (movieData) {

  }

  static async update (movieData, movieId) {

  }
}
