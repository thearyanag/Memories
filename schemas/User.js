const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    state: Number,
    wallet: String,
    nfts: Number,
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);