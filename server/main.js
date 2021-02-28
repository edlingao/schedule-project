import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import Moment from 'moment'
import { default as mongodb } from 'mongodb'
import { default as ExtendMoment } from 'moment-range';
const { MongoClient } = mongodb
const { extendMoment } = ExtendMoment
const moment = extendMoment(Moment);

const app = express()
const __dirname = path.resolve()

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}
const port = process.env.PORT
app.use(express.json());
app.use(express.static(`${__dirname}/dist`))

app.get('/.well-known/pki-validation/40C952D3A11BAEC7CBF0A5325468A4BD.txt', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/40C952D3A11BAEC7CBF0A5325468A4BD.txt`))
})
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
    const activitiesForTheNextDays = []
    const today = moment().day(req.params.day).day()
    const format = 'HH:mm'

    for (let i = 0; i <= 3; i++){
      const day = moment().day(today+i).format('dddd').toLowerCase()
      const activities = await schedule.find({ week_day: day }).toArray()
      activities.sort( ( activity, nextActivity) => {
        const fisrtHour = moment(activity.end_hour, format)
        const secondHour = moment(nextActivity.start_hour, format)
        //activity < nextActivity
        if(fisrtHour.isAfter(secondHour)){
          return -1
        }
      }).reverse()
      
      activitiesForTheNextDays.push({day, activities})
    }
    res.json(activitiesForTheNextDays)
  })

  app.post('/schedule', async (req, res) => {
    const newSchedule = req.body
    const format = 'HH:mm'
    schedule.find({ week_day: newSchedule.week_day}).toArray().then( async (thisDayActivities) => {
      const noOverLaps = thisDayActivities.every( ({ end_hour, start_hour}) => {
        const requestedStart = moment(newSchedule.start_hour, format)
        const requestedEnd = moment(newSchedule.end_hour, format)
        const requestedRange = moment.range(requestedStart, requestedEnd, format)
        const comparedStart = moment(start_hour, format)
        const comparedEnd = moment(end_hour, format)
        const comparedRange = moment.range(comparedStart, comparedEnd, format)
        console.log(requestedRange.overlaps(comparedRange));
        return !requestedRange.overlaps(comparedRange)
      })
      if(noOverLaps){
        let response = await schedule.insertOne(newSchedule)
        response = !response.result.ok == 1 ? {status: false} : response
  
        res.json(response)
      }else{
        res.json({status: false})
      }
    })
  })

  app.delete('/schedule/:id', async (req, res) => {
    const response = await schedule.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.json(response);
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
