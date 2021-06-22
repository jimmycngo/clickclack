const models = require('../models/userModel');

const userController = {};

userController.getCharacters = (req, res, next) => {
  models.Person.find({})
    .then(data => res.locals.username = data)
    .then(() => next())
    .catch(err => console.log('error', err));
};

userController.addCharacter = (req, res, next) => {
  models.Person.create({
    username: req.body.username, 
    wpm: req.body.wpm, 
    date: req.body.date,

  }, (err, username) => {
    try {
      res.locals.username = username;
      return next();
    } catch {
      console.log('error on the add user', err);
    } 
  });
};

module.exports = userController;
