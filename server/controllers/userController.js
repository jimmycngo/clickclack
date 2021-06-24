const User = require('../models/userModel');

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  // write code here
  console.log('req.body', req.body)
  User.create({username:req.body.username, password: req.body.password})
    .then(() => res.redirect('/signin'))
    .catch((err) => console.log('whoops an error creating user', err))
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  User.find({username:req.body.username})
    .then(data => {if(req.body.password === data[0].password) {
      return next();
    }
    })
    .catch(() => res.redirect('/signup'))
};

userController.updateStats = (req, res, next) => {
  console.log(req.body)
  User.findOneAndUpdate(
    {username:req.body[4]}, 
    {$push: {date:[req.body[0]], wpm:[req.body[1]], netWpm:[req.body[2]], accuracy:[req.body[3]]}},
    {upsert: true, new: true}
    )
  .then(data => console.log('did the update', data))
  .catch((err) => console.log('error updating stats', err))
};

userController.getStats = (req, res, next) => {
  // write code here
  User.find({username:req.body.username})
    .then(data => {
      console.log(data)
    })
    .catch(() => res.redirect('/signup'))
};

module.exports = userController;