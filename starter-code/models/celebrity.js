const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const celebSchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String
}
)

module.exports = model('Celebrity', celebSchema);
// ^^ Really good simple layout for adding to MongoDB ^^ //