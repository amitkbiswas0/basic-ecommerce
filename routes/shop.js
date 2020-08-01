const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

// show homepage/products page/single product => GET
router.get("/", shopController.getHome);
router.get("/products", shopController.getAllProducts);
router.get("/products/:productID", shopController.getProduct);

// show cart/add to cart/delete from cart
router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCartAddProduct);
router.post("/cart/delete-item", shopController.postCartDeleteProduct);

module.exports = router;
