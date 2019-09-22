const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    email: String
});
const user = mongoose.model('user', UserSchema);
module.exports = user;