const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const userController = require('./controllers/userController');

//must use this to start server
//sudo service mongodb start

/*
Technical challenges

getting webpack and express set up to work with the front end
having trouble getting the development server to work
keeping track of states and what is happening where in a large application and making sure everything is still working properly
creating routes to communicate with the database and updating
user auth to track where to store data, intially started with oauth but had trouble tracking user progress
*/

// const client_id = process.env.GITHUB_CLIENT_ID;
// const client_secret = process.env.GITHUB_CLIENT_SECRET;
// const cookie_secret = process.env.COOKIE_SECRET;

// app.use(cookieSession({
//   secret: cookie_secret,
//   })
// );
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 100000000000}));
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  if (req.hostname !== 'localhost' && req.get('X-Forwarded-Proto') !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`)
  }
  return next()
})

app.set('view engine', 'ejs');

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'))
})

app.get('/index.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.css'))
})

app.get('/signup', (req, res) => {
  res.render('../public/signup', {error: null});
});

app.post('/signup', userController.createUser, (req, res) => {
  // what should happen here on successful sign up?
  console.log('thanks for signing up')
});

app.get('/signin', (req, res) => {
  res.render('../public/signin', {error: null});
});

app.post('/signin', userController.verifyUser, (req, res) => {
  // what should happen here on successful log in?
  console.log('welcome back')
  console.log('im back in signin', req.body)
  res.cookie('username', req.body.username)
  res.redirect('/')
});

app.get('/statsPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/statsPage.html'))
});

app.get('/getStats', userController.getAllUsers, (req,res) => {
  console.log(res.locals.users)
  res.json(res.locals.users)
})

app.put('/updatestats', userController.updateStats, (req, res) => {
  console.log('updated')
});



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

/**
 * 404 handler
 */
 app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Middleware error');
});

//oauth

// app.get('/user/signin', (req, res) => {
//   const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:3000/user/signin/callback`
//   res.redirect(redirectUrl)
// });

// async function getAccessToken (code) {
//   const res = await fetch('https://github.com/login/oauth/access_token', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       client_id,
//       client_secret,
//       code
//     })
//   })
//   const data = await res.text()
//   const params = new URLSearchParams(data)
//   return params.get('access_token')
// };

// async function getGithubUser(access_token) {
//   const req = await fetch('https://api.github.com/user', {
//     headers: {
//       Authorization: `bearer ${access_token}`
//     }
//   })
//   const data = await req.json()
//   return data;
// };

// app.get('/user/signin/callback', async (req, res) => {
//   const code = req.query.code;
//   const token = await getAccessToken(code);
//   const githubData = await getGithubUser(token);
//   if(githubData) {
//     req.session.githubId = githubData.id
//     req.session.token = token
//     req.session.login = githubData.login
//     console.log(`${req.session.login} logged in`)
//     res.locals.username = req.session.login;
//   } else {
//     console.log('Error verifying user')
//     res.send('Error verifying user')
//   }
// });

// app.get('/logout', (req, res) => {
//   req.session = null
//   res.redirect('/')
// });

app.listen(port, () => {
  console.log(`Listening in at http://localhost:${port}`)
});