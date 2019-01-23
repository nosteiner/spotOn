const mongoose = require('mongoose');
const spotSchema = mongoose.Schema({
    xPos:  mongoose.Schema.Types.Number,
    yPos:  mongoose.Schema.Types.Number,
    width: mongoose.Schema.Types.Number,
    height: mongoose.Schema.Types.Number,
    rotation: mongoose.Schema.Types.Number
});

const settingsSchema = mongoose.Schema({
    brightness:  mongoose.Schema.Types.Number,
    contrast:  mongoose.Schema.Types.Number
});


const lensSchema = mongoose.Schema({
    isRight: mongoose.Schema.Types.Boolean,
    settings: settingsSchema,
    spots: [spotSchema]
});

const glassesSchema = mongoose.Schema({
    lenses: [lensSchema]
});

module.exports = mongoose.model('Glasses', glassesSchema, 'glasses')
