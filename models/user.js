const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

// timestamps for keep record of creation/updation

const User = mongoose.model('User',userSchema);

module.exports = User;
