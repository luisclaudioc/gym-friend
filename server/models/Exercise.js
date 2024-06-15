const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User')

const Exercise = new Schema({
    exercise: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    repetitions: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        default: null
    },
    obs: {
        type: String,
        default: null
    },
    day: {
        type: String,
        required: true
    },
    group: {
        type: String,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('exercises', Exercise);