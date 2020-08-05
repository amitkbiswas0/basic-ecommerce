const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

// ADMIN HOMEPAGE
router.get("/dashboard", adminController.getDashboard);

// FOR USERS
router.get("/users", adminController.getUsers);

router.get("/add-user", adminController.getAddUser);
router.post("/add-user", adminController.postAddUser);

router.get("/edit-user/:userID", adminController.getEditUser);
router.post("/edit-user", adminController.postEditUser);

router.post("/delete-user", adminController.postDeleteUser);

// FOR PRODUCTS
router.get("/add-product", adminController.getAddProduct);
router.post("/add-product", adminController.postAddProduct);

router.get("/edit-product/:productID", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);

module.exports = router;
