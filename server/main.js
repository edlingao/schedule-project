import express from 'express'
import path from 'path'
const app = express()
const port = 3000
const __dirname = path.resolve();

app.use(express.static(`${__dirname}/dist`));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist/index.html`))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
