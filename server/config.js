require('dotenv').config()


export const DATABASE_NAME = process.env.database;
export const DIALECT = process.env.dialect;
export const HOST = process.env.host;
export const DB_PASSWORD = process.env.password;
export const DB_USERNAME = process.env.username;
export const JWT_TOKEN = process.env.jwt_token

