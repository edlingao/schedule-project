import express from 'express'
import path from 'path'
import { default as mongodb } from 'mongodb'
const { MongoClient } = mongodb

const app = express()
const port = 3000
const __dirname = path.resolve()

app.use(express.json());
app.use(express.static(`${__dirname}/dist`))

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})
MongoClient.connect('mongodb://localhost:27017', (err, db) => {
  if(err){
    throw err
  }
  const document = db.db('schedule');
  const schedule = document.collection('activities')
  app.get('/schedule', async (req, res) => {
    const data = await schedule.find().toArray()
    res.json(data)
  });
  app.post('/schedule', async (req, res) => {
    const newSchedule = req.body
    let response = await schedule.insertOne(newSchedule)
    response = !response.result.ok == 1 ? {status: false} : response
    res.json(response)
    // console.log( response )
  })
  app.delete('/schedule/:id', async (req, res) => {
    const response = await schedule.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.json(response);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
