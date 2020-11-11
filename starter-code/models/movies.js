const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  name: String,
  celebrities: {
    type: Schema.Types.ObjectId, //Foreign key
    ref: 'Celebrity' //relates to author model... connections book to author model
  },
  rating: Number
}
)

module.exports = model('Movie', movieSchema);
// ^^ Really good simple layout for adding to MongoDB ^^ //