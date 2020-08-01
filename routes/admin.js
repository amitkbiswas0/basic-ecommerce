const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// ADMIN HOMEPAGE /admin/products => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// /admin/add-user => GET
router.get("/add-user", adminController.getAddUser);
// /admin/add-user => POST
router.post("/add-user", adminController.postAddUser);

// /admin/edit-product/:id => GET
router.get("/edit-product/:productID", adminController.getEditProduct);
// /admin/edit-product => POST
router.post("/edit-product", adminController.postEditProduct);

// /admin/delete-product => POST
router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
