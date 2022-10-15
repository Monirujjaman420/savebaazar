const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    min: 3,
    max: 20,
  },
  image: {
    type: String,
    trim: true,
    require: true,
  },
  home: {
    type: Boolean,
    default: false,
  },
  cat_status: {
    type: Boolean,
    default: false,
  },
},{
    timestamps: true
});

const categories = model("categories", categorySchema)
module.exports = categories