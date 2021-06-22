const express = require('express')
const app = express()
const port = 3000
const path = require('path')
app.use(express.json());

// app.use(express.static(path.resolve(__dirname, 'public')));

const client_id = process.env.GITHUB_CLIENT_ID
const client_secret = process.env.GITHUB_CLIENT_SECRET

console.log({client_id,client_secret});

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'))
})

// app.get('/index.js', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.js'))
// })

// app.get('/index.css', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.css'))
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// app.get('/user/signin', (req, res) => {
  
// })

// app.get('/user/signin/callback', (req, res) => {
  
// })

app.listen(port, () => {
  console.log(`Listening in at http://localhost:${port}`)
})