import {config} from 'dotenv'
config()

export const PORT = process.env.PORT 
export const DB_HOST = process.env.DB_HOST 
// || 'bm8fengdh5km3jnzmaq5-mysql.services.clever-cloud.com'
export const DB_USER = process.env.DB_USER
//  || 'upm2ddeqpesjtvdq'
export const DB_PASSWORD = process.env.DB_PASSWORD
//  || '0mMSUhmfqV09kjAY9ByT'
export const DB_NAME = process.env.DB_NAME
//  || 'bm8fengdh5km3jnzmaq5'
export const DB_PORT = process.env.DB_PORT
//  || 3306

