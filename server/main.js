import express from 'express'
import path from 'path'
import { default as mongodb } from 'mongodb'
import dotenv from 'dotenv'

const { MongoClient } = mongodb

const app = express()
const __dirname = path.resolve()

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
const port = process.env.PORT
app.use(express.json());
app.use(express.static(`${__dirname}/dist`))

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

MongoClient.connect( process.env.MONGO_URL, (err, db) => {
  if(err){
    throw err
  }
  const document = db.db('schedule');
  const schedule = document.collection('activities')

  app.get('/schedule', async (req, res) => {
    const data = await schedule.find().toArray()
    res.json(data)
  })

  app.get('/schedule-day/:day', async (req, res) => {
    const response = await schedule.find({ week_day: req.params.day }).toArray()
    res.json(response)
  })

  app.post('/schedule', async (req, res) => {
    const newSchedule = req.body
    let response = await schedule.insertOne(newSchedule)
    response = !response.result.ok == 1 ? {status: false} : response
    res.json(response)
  })

  app.delete('/schedule/:id', async (req, res) => {
    const response = await schedule.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.json(response);
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
