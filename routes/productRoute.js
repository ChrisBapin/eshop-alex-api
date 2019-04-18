const express = require("express");
const cors = require("cors");
const router = express.Router();
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());
// var isAuthenticated_product = require("../middlewares/isAuthenticated_product");
var isAuthenticated = require("../middlewares/isAuthenticated");
var uploadPictures = require("../middlewares/uploadPictures.js");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

//Ajout d'un produit
router.post("/create-product", uploadPictures, function(req, res, next) {
  var obj = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    size: req.body.size,
    quantity: req.body.quantity,
    // date: req.body.date,
    picture: req.body.picture,
    category: req.body.category,
  };

  try {
    const newProduct = new Product(obj);
    newProduct.save(function(err) {
      if (!err) {
        return res.json({
          _id: newProduct._id,
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
          size: newProduct.size,
          date: newProduct.date,
          picture: newProduct.picture,
          category: newProduct.category,
        });
        console.log("create-product ok");
      } else {
        return next(err.message);
      }
    });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// Obtenir les infos produit d'un meme vendeur
router.get("/get-category-product-info/:category", async (req, res) => {
  try {
    // const products = await Product.find({
    //   category: req.query.category,
    // }).populate(category);
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// router.get("/all_product", async (req, res) => {
//   try {
//     const all_key = await Product.find({}.key);
//     const alllist = await Product.find();
//     res.json(all_key);
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

// // Obtenir les infos d'un produit
// router.get("/get_product_info", async (req, res) => {
//   try {
//     const product = await Product.findOne({ _id: req.query.id });
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

// router.post("/update_product_info", isAuthenticated, async function(req, res) {
//   try {
//     console.log("req.user._id ", req.user._id);
//     const newProduct = await Product.findOne({ creator: req.user._id });
//     //console.log(newProduct);
//     if (req.body.title) {
//       newProduct.title = req.body.title;
//     }
//     if (req.body.description) {
//       newProduct.description = req.body.description;
//     }
//     if (req.body.etat) {
//       newProduct.etat = req.body.etat;
//     }
//     if (req.body.localisation) {
//       newProduct.localisation = req.body.localisation;
//     }
//     if (req.body.price) {
//       newProduct.price = req.body.price;
//     }
//     if (req.body.size) {
//       newProduct.size = req.body.size;
//     }
//     if (req.body.id_style) {
//       newProduct.id_style = req.body.id_style;
//     }

//     //modification a faire
//     newProduct.save();
//     res.json("update okay");
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });
// router.get("/delete_product", async (req, res) => {
//   try {
//     const deleteproduct = await Product.findById({ _id: req.query.id });
//     await deleteproduct.remove();
//     let user = await USER.find({});
//     for(let i = 0;i < user.length;i++){
//       for (let x= 0; x < user[i].favory.length;x++){
//         if(user[i].favory[x]===req.query.id){
//           user[i].favory.splice(x,1)
//           user[i].save()}
//       }
//     }

//     res.json(user);
//     //res.json("Delete okay");

//   } catch (error) {
//     //res.status(400).json({ error: { message: error.message } });
//     res.json({ message: error.message,user});
//   }
// });

// router.post("/Product", async (req, res) => {
//   let NewParametre = {};
//   let parameter = req.body;

//   if (req.body.id_style!=="") {
//     NewParametre.id_style = req.body.id_style;
//   }
//   if (req.body.title!=="") {
//     NewParametre.title = new RegExp(req.body.title, "i");
//   }
//   if (req.body.size!=="") {
//     NewParametre.size = req.body.size;
//   }
//   if (req.body.etat!=="") {
//     NewParametre.etat = req.body.etat;
//   }
//   if (req.body.priceMin!=="" && req.body.priceMax!=="") {
//     NewParametre.price = { $gt: req.body.priceMin, $lt: req.body.priceMax };
//   }
//   if ("priceMin" in parameter && !("priceMax" in parameter)) {
//     NewParametre.price = { $gt: req.body.priceMin };
//   }

//   if (req.body.sort === "price-asc") {
//     const selectProduct = await Product.find(NewParametre).sort({ price: 1 });
//     res.json(selectProduct);
//   } else if (req.body.sort === "price-desc") {
//     const selectProduct = await Product.find(NewParametre).sort({ price: -1 });
//     res.json(selectProduct);
//   }
//   if (req.body.sort === "date-asc") {
//     const selectProduct = await Product.find(NewParametre).sort({
//       date: 1,
//     });

//     res.json(selectProduct);
//   } else if (req.body.sort === "date-desc") {
//     const selectProduct = await Product.find(NewParametre).sort({
//       date: -1,
//     });
//     res.json(selectProduct);
//   } else {
//     const selectProduct = await Product.find(NewParametre);
//     res.json(selectProduct);
//   }
// });

module.exports = router;
