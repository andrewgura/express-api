var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChatLogSchema = new Schema({
    name: String,
    message: String
});

module.exports = mongoose.model('ChatLog', ChatLogSchema);
