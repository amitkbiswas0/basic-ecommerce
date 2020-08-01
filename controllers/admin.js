const Product = require("../models/product");
const User = require("../models/user");

// show dashboard
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        user: "admin",
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/products");
    });
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
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageURL: req.body.imageURL,
  });
  // saving new product to db
  product
    .save()
    .then(() => {
      console.log("Created Product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/admin/products");
    });
};

// edit product
exports.getEditProduct = (req, res, next) => {
  if (!req.query.edit) {
    return res.redirect("/admin/products");
  }
  // console.log(Product.findById);
  Product.findById(req.params.productID)
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: req.query.edit,
        product: product,
        user: "admin",
      });
    })
    .catch((err) => console.log(err));
};
exports.postEditProduct = (req, res, next) => {
  Product.findById(req.body.productID)
    .then((product) => {
      product.title = req.body.title;
      product.price = req.body.price;
      product.description = req.body.description;
      product.imageURL = req.body.imageURL;
      // saving updated product
      return product.save();
    })
    .then(() => {
      console.log("Product Updated!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// delete product
exports.postDeleteProduct = (req, res, next) => {
  Product.findByIdAndRemove(req.body.productID)
    .then(() => {
      console.log("Product Deleted!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
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
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.pass,
    cart: { items: [] },
  });
  // saving new user to db
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
