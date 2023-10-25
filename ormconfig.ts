import { DataSource } from 'typeorm'

require('dotenv').config()

const ds = new DataSource({
  host: process.env.PG_HOST,
  type: 'postgres',
  port: Number(process.env.PGPORT),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['dist/**/**.entity.js'],
  migrations: ['dist/src/migration/*.js'],
  synchronize: false,
})

export default ds
