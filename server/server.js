//import fetch from 'node-fetch';
const fetch = require('node-fetch')
//import cookieSession from 'cookie-session';
const cookieSession = require('cookie-session')
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userController = require('./controllers/userController');
const mongoose = require('mongoose');


const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const cookie_secret = process.env.COOKIE_SECRET;

app.use(cookieSession({
  secret: cookie_secret,
  })
);

app.use(express.static(__dirname + '/public'));

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'))
})

// app.get('/index.js', (req, res) => {
//   res.sendFile(path.join(__dirname, '../src/index.js'))
// })

app.get('/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.css'))
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

//oauth

app.get('/user/signin', (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/user/signin/callback`
  res.redirect(redirectUrl)
});

async function getAccessToken (code) {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  })
  const data = await res.text()
  const params = new URLSearchParams(data)
  return params.get('access_token')
};

async function getGithubUser(access_token) {
  const req = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${access_token}`
    }
  })
  const data = await req.json()
  return data;
};

app.get('/user/signin/callback', async (req, res) => {
  const code = req.query.code;
  const token = await getAccessToken(code);
  const githubData = await getGithubUser(token);
  if(githubData) {
    req.session.githubId = githubData.id
    req.session.token = token
    req.session.login = githubData.login
    console.log(`${req.session.login} logged in`)
    res.locals.username = req.session.login;
  } else {
    console.log('Error verifying user')
    res.send('Error verifying user')
  }
});

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Listening in at http://localhost:${port}`)
});