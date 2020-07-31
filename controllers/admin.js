const Product = require("../models/product");
const User = require("../models/user");

// show dashboard
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        user: "admin",
      });
    })
    .catch((err) => console.log(err));
};

// add product
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    user: "admin",
  });
};
exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl
  );
  product
    .save()
    .then(() => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// add user
exports.getAddUser = (req, res, next) => {
  res.render("admin/add-user", {
    pageTitle: "Add User",
    path: "/admin/add-user",
    user: "admin",
  });
};
exports.postAddUser = (req, res, next) => {
  const user = new User(req.body.username, req.body.email, req.body.pass);
  user
    .save()
    .then(() => {
      console.log("User Added!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// edit product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/admin/products");
  }
  Product.findByID(req.params.productID)
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        user: "admin",
      });
    })
    .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description,
    req.body.imageUrl
  );
  product
    .update(req.body.productID)
    .then(() => {
      console.log("Product Updated!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// delete product
exports.postDeleteProduct = (req, res, next) => {
  Product.delete(req.body.productID)
    .then(() => {
      console.log("Product Deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
