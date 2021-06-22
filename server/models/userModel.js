const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'clickclack'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  wpm: Number,
  date: Number,
});

const User = mongoose.model('user', userSchema);


// exports all the models in an object to be used in the controller
module.exports = {
  User,
};
