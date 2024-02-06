const { timeStamp } = require("console");
const { Schema, models, model } = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type:String,
        required: true,
    },
}, {timeStamp: true});

export const Category = models?.Category || model('Category', CategorySchema);