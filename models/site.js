var mongoose = require('mongoose');

var SiteSchema = mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    placement: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
});

SiteSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('site', SiteSchema);