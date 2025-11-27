import mysql from 'mysql2/promise'

export class MySQLConnection {
  constructor () {
    this.connection = null
  }

  async connect () {
    try {
      this.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'testbd'
      })
      console.log('Conexión exitosa a la base de datos')
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error.message)
    }
  }

  async query (sql, params = []) {
    if (!this.connection) {
      throw new Error('No hay conexión establecida')
    }

    const [results] = await this.connection.execute(sql, params)
    return results
  }

  async close () {
    if (this.connection) {
      await this.connection.end()
      console.log('Conexión cerrada')
    }
  }
}
