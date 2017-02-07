var mongoose = require('mongoose');

var siteSchema = mongoose.Schema({
    id: Number,
    author: String,
    url: String,
    category: String,
    placement: Number
});

module.exports = mongoose.model('Site', siteSchema);