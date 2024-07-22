const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  user_password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile_image: { type: String, required: false } 
});

module.exports = mongoose.model('User', userSchema);
