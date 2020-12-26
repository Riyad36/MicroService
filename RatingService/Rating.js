const mongoose = require("mongoose")

mongoose.model("Rating", {

    productId: {
        type: Number,
        require: true
    },
    raterId: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    }


});