const mongoose = require('mongoose');

const glassesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lenses: []
});

module.exports = mongoose.model('Glasses', glassesSchema)