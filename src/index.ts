import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import myUserRoute from './routes/MyUserRoute'

/* CONNECT TO DATABASE */
mongoose.connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log('Connected to database!')
  })

/* CONFIGURATIONS */
const app = express()
app.use(express.json())
app.use(cors())

app.get('/health', (req: Request, res: Response) => {
  res.send({ message: 'health OK!' })
})

/* ROUTES */
app.use('/api/my/user', myUserRoute)

/* RUN SERVER ON PORT 7000 */
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log('Server started on localhost:7000')
})