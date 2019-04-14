const express = require("express");
const cors = require("cors");
const router = express.Router();
// var isAuthenticated = require("../middlewares/isAuthenticated");
const body_parser = require("body-parser");
router.use(body_parser.json(), cors());
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/userModel");

//Cree a compte utilisateur
router.post("/sign-up", async (req, res) => {
  try {
    // console.log(req.body.password);
    const password = req.body.password;
    const token = uid2(64);
    const salt = uid2(64);
    const hash = SHA256(password + salt).toString(encBase64);

    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hash,
      token: token,
      salt: salt,
    });
    await newUser.save();
    res.json({
      _id: newUser._id,
      token: newUser.token,
      password: newUser.password,
      username: newUser.username,
      usermail: newUser.email,
    });
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

//login compare les information envoyer et reçu
router.post("/sign-in", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (
        user.password ===
        SHA256(req.body.password + user.salt).toString(encBase64)
      ) {
        res.json({
          _id: user._id,
          token: user.token,
          account: {
            username: user.username,
            usermail: user.email,
            poster_profile: user.poster_profile,
          },
        });
      } else {
        res.json("Le mot de passe est incorrect");
      }
    } else {
      res.json("Erreur dans l'adresse email");
    }
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

// router.get("/get_my_user_info", async (req, res) => {
//   try {
//     const allinfo = await USER.findOne({ token: req.query.token });
//     res.json(allinfo);
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

// router.get("/get_other_user_info", async (req, res) => {
//   try {
//     const sellerInfo = await USER.findOne({ _id: req.query.id });
//     res.json(sellerInfo);
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

// router.get("/get_other_user_info", async (req, res) => {
//   try {
//     const verification = await USER.findOne({ token: req.body.token });
//     if (verification) {
//       const userInfo = await USER.findById({ _id: req.query.id });
//       res.json({
//         _id: userInfo._id,
//         account: {
//           username: userInfo.username,
//           usermail: userInfo.email,
//           phone: userInfo.phone,
//         },
//       });
//     } else {
//       res.json({ message: "toto" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

// router.post("/update_user_info", isAuthenticated, async (req, res) => {
//   try {
//     // console.log("req body ", req.body);
//     // console.log("req user ", req.user);

//     if (req.body.email) {
//       req.user.email = req.body.email;
//     }
//     if (req.body.nom) {
//       req.user.nom = req.body.nom;
//     }
//     if (req.body.prenom) {
//       req.user.prenom = req.body.prenom;
//     }
//     if (req.body.adresse) {
//       req.user.adresse = req.body.adresse;
//     }
//     if (req.body.username) {
//       req.user.username = req.body.username;
//     }
//     if (req.body.size) {
//       req.user.size = req.body.size;
//     }

//     if (req.body.poster_profile) {
//       req.user.poster_profile = req.body.poster_profile;
//     }

//     if (req.body.password) {
//       const password = req.body.password;
//       const salt = req.user.salt;
//       const hash = SHA256(password + salt).toString(encBase64);
//       req.user.password = hash;
//       // console.log(req.user.password);
//     }
//     if (req.body.phone) {
//       req.user.phone = req.body.phone;
//     }

//     if (req.body.favory) {
//       console.log("req.body.favory ", req.body.favory);
//       console.log("req.user.favory ", req.user.favory);

//       const userFavsTab = req.user.favory;
//       const favCheck = req.body.favory;
//       let isInTab = false;
//       let position = null;

//       console.log("userFavsTab ", userFavsTab);
//       console.log("favCheck", favCheck);

//       for (let i = 0; i < userFavsTab.length; i++) {
//         if (userFavsTab[i] === favCheck) {
//           isInTab = true;
//           position = i;
//         }
//       }
//       console.log("isInTab ", isInTab);

//       if (isInTab) {
//         userFavsTab.splice(position, 1);
//       } else {
//         userFavsTab.push(favCheck);
//       }
//       console.log("userFavsTab ", userFavsTab);
//       console.log("=============");

//       req.user.favory = userFavsTab;
//     }

//     //modification a faire
//     req.user.save();
//     res.json("update okay");
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });

// router.post("/delete_user", async (req, res) => {
//   try {
//     const deleteUser = await USER.findOne({ token: req.body.token });
//     await deleteUser.remove();

//     // Supprimer les produits de l'utilisateur :
//     let products = await PRODUCT.find({});
//     // - Parcourir tous les produits
//     //   - Si l'id du créateur = id de l'utilisateur supprimé :
//     //     - supprimer le produit
//     for (let i = 0; i < products.length; i++) {
//       if (products[i].creator.toString() === deleteUser._id.toString()) {
//         await products[i].remove();
//       }
//     }

//     res.json("Votre compte a été supprimé !");
//   } catch (error) {
//     res.status(400).json({ error: { message: error.message } });
//   }
// });
module.exports = router;
