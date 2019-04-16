const express = require("express");
const cors = require("cors");
const router = express.Router();
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());
// var isAuthenticated_product = require("../middlewares/isAuthenticated_product");
var isAuthenticated = require("../middlewares/isAuthenticated");
var uploadPictures = require("../middlewares/uploadPictures.js");

const uid2 = require("uid2");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

//Ajout d'un produit
router.post("/create-category", function(req, res, next) {
  const createUrl = uid2(11);

  var obj = {
    date: req.body.date,
    title: req.body.title,
    url: createUrl,
  };

  try {
    const newCategory = new Category(obj);
    newCategory.save(function(err) {
      if (!err) {
        return res.json({
          _id: newCategory._id,
          title: newCategory.title,
          date: newCategory.date,
          url: newCategory.url,
        });
      } else {
        return next(err.message);
      }
    });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
