const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    harga: {
        type: String,
        required: true,
    },
    kategori: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    image :{
        type: String, 
        required :true
    }

});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;