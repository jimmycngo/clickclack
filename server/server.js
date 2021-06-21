const express = require('express')
const app = express()
const port = 3000
const path = require('path')
app.use(express.json());

app.use(express.static(path.resolve(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(port, () => {
  console.log(`Listening in at http://localhost:${port}`)
})