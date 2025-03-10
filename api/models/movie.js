const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    director: { 
        type: String,
        required: true
    },
    release_date: { 
        type: Date,
        required: true
    },
    genre: { 
        type: String,
        required: true
    },
    description: { 
        type: String,
        required: true
    },
    poster_path: { 
        type: String,
        required: true
    },
    created_at: { 
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model('Movie', movieSchema)