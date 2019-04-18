const mongoose = require("mongoose");

const Product = mongoose.model("Product", {
  picture: {
    type: Array,
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 15,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = Product;
