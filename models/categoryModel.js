const mongoose = require("mongoose");

const Category = mongoose.model("Category", {
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = Category;
