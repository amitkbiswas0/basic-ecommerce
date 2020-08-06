const bcrypt = require("bcryptjs");
const Product = require("../models/product");
const User = require("../models/user");
const { isLoggedIn } = require("../util/session");

// show dashboard
exports.getDashboard = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      Product.find()
        .then((products) => {
          res.render("admin/dashboard", {
            pageTitle: "Admin Products",
            products: products,
            path: "/admin/dashboard",
            user: "admin",
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/");
        });
    } else {
      res.redirect("/");
    }
  });
};

// show users
exports.getUsers = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      User.find()
        .then((users) => {
          res.render("admin/users", {
            pageTitle: "Users",
            users: users,
            path: "/admin/users",
            user: "admin",
          });
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/admin/dashboard");
        });
    } else {
      res.redirect("/");
    }
  });
};

// add user
exports.getAddUser = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      res.render("admin/edit-users", {
        pageTitle: "Edit User",
        path: "/admin/add-user",
        user: "admin",
        editing: false,
      });
    } else {
      res.redirect("/");
    }
  });
};
exports.postAddUser = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", async (admin) => {
    const hashedPass = await bcrypt.hash(req.body.pass, 12);
    if (admin) {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
        cart: { items: [] },
      });
      // saving new user to db
      user
        .save()
        .then(() => {
          console.log("User Added!");
          res.redirect("/admin/users");
        })
        .catch((err) => {
          console.log(err);
        });
    } else res.redirect("/");
  });
};

// edit user
exports.getEditUser = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      if (!req.query.edit) {
        return res.redirect("/admin/users");
      }
      User.findById(req.params.userID)
        .then((user) => {
          if (!user) {
            return res.redirect("/admin/users");
          }
          res.render("admin/edit-users", {
            pageTitle: "Edit User",
            forUser: user,
            path: "/admin/edit-user",
            editing: req.query.edit,
            user: "admin",
          });
        })
        .catch((err) => console.log(err));
    } else res.redirect("/");
  });
};
exports.postEditUser = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      User.findById(req.body.userID)
        .then(async (user) => {
          user.username = req.body.username;
          user.email = req.body.email;
          user.password = await bcrypt.hash(req.body.pass, 12);
          // saving updated product
          return user.save();
        })
        .then(() => {
          console.log("User Edited!");
          res.redirect("/admin/users");
        })
        .catch((err) => {
          console.log(err);
        });
    } else res.redirect("/");
  });
};

// delete user
exports.postDeleteUser = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      User.findByIdAndRemove(req.body.userID)
        .then(() => {
          console.log("User Deleted!");
          res.redirect("/admin/users");
        })
        .catch((err) => console.log(err));
    } else res.redirect("/");
  });
};

// add product
exports.getAddProduct = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
        user: "admin",
      });
    } else res.redirect("/");
  });
};
exports.postAddProduct = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
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
          res.redirect("/admin/dashboard");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/admin/dashboard");
        });
    } else res.redirect("/");
  });
};

// edit product
exports.getEditProduct = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      if (!req.query.edit) {
        return res.redirect("/admin/dashboard");
      }
      Product.findById(req.params.productID)
        .then((product) => {
          if (!product) {
            return res.redirect("/admin/dashboard");
          }
          res.render("admin/edit-product", {
            pageTitle: "Edit Product",
            product: product,
            path: "/admin/edit-product",
            editing: req.query.edit,
            user: "admin",
          });
        })
        .catch((err) => console.log(err));
    } else res.redirect("/");
  });
};
exports.postEditProduct = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
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
          res.redirect("/admin/dashboard");
        })
        .catch((err) => console.log(err));
    } else res.redirect("/");
  });
};

// delete product
exports.postDeleteProduct = (req, res, next) => {
  isLoggedIn(req.session.userSess, "admin", (admin) => {
    if (admin) {
      Product.findByIdAndRemove(req.body.productID)
        .then(() => {
          console.log("Product Deleted!");
          res.redirect("/admin/dashboard");
        })
        .catch((err) => console.log(err));
    } else res.redirect("/");
  });
};
