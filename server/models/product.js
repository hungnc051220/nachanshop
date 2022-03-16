const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
    },
})

module.exports = mongoose.model('Product', productSchema);