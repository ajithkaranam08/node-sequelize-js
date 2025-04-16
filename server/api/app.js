import express from 'express'
import errorHandling from '../utils/errorHandling'
import router from './v1'

const app = express()

app.use(express.json())

app.use("v1", router)

app.use(errorHandling)

export default app