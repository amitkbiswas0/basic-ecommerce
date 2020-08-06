const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

// show homepage/products page/single product => GET
router.get("/", shopController.getHome);
router.get("/products/:productID", shopController.getProduct);

// show cart/add to cart/delete from cart
router.get("/user/cart", shopController.getCart);
router.post("/user/cart", shopController.postCartAddProduct);
router.post("/user/cart/delete-item", shopController.postCartDeleteProduct);

module.exports = router;
