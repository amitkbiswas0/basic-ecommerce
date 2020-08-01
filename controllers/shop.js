const { isLoggedIn } = require("../util/session");

const Product = require("../models/product");
const User = require("../models/user");

// show homepage
exports.getHome = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      Product.find()
        .then((products) => {
          res.render("shop/home", {
            prods: products,
            pageTitle: "Homepage",
            path: "/shop",
            user: "user",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // logout if non-user tries to access route
      res.redirect("/");
    }
  });
};

// show products page
exports.getAllProducts = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      Product.find()
        .then((products) => {
          res.render("shop/product-list", {
            prods: products,
            pageTitle: "All Products",
            path: "/shop/products",
            user: "user",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // logout if non-user tries to access route
      res.redirect("/");
    }
  });
};

// show a single product
exports.getProduct = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      Product.findById(req.params.productID)
        .then((product) => {
          res.render("shop/product-detail", {
            product: product,
            pageTitle: product.title,
            path: "/shop/products",
            user: "user",
          });
        })
        .catch((err) => console.log(err));
    } else {
      // logout if non-user tries to access route
      res.redirect("/");
    }
  });
};

// show cart items
exports.getCart = (req, res, next) => {
  isLoggedIn(async (user) => {
    if (user) {
      user
        .populate("cart.items._id")
        .execPopulate()
        .then((user) => {
          const items = [];
          for (let item of user.cart.items) {
            if (item._id) {
              items.push(item);
            }
          }
          res.render("shop/cart", {
            products: items,
            pageTitle: "Shopping Cart",
            path: "/shop/cart",
            user: "user",
          });
        });
    } else {
      // logout if non-user tries to access route
      res.redirect("/");
    }
  });
};

// add to cart
exports.postCartAddProduct = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      user.addToCart(req.body.productID).then((product) => {
        if (!product) console.log("Adding to Cart error!");
        res.redirect("back");
      });
    } else {
      // logout if non-user tries to access route
      res.redirect("/");
    }
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      User.findByIdAndUpdate(
        user._id,
        {
          $pull: { "cart.items": { _id: req.body.productID } },
        },
        (err) => {
          if (!err) console.log("Item Deleted!");
          else console.log("Delete error!");
          res.redirect("/shop/cart");
        }
      );
    } else {
      // logout if non-user tries to access route
      res.redirect("/");
    }
  });
};
