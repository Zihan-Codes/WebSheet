const mongoose = require("mongoose");


const tableSchema = new mongoose.Schema({
    col1: {
        type: String,
    },
    col2: {
        type: String,
    },
    col3: {
        type: String,
    },
    col4: {
        type: String,
    },
    col5: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: new Date(),
    },
});

module.exports = mongoose.model("Table", tableSchema);