const fs = require("fs");
const path = require("path");
const root = require("../util/path");
const { isLoggedIn } = require("../util/session");

const Product = require("../models/product");
const User = require("../models/user");

exports.getHome = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      Product.fetchAll()
        .then((products) => {
          res.render("shop/home", {
            prods: products,
            pageTitle: "Shop Homepage",
            path: "/shop",
            user: "user",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.redirect("/");
    }
  });
};
exports.getProducts = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      Product.fetchAll()
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
      res.redirect("/");
    }
  });
};
exports.getProduct = (req, res, next) => {
  isLoggedIn((user) => {
    if (user) {
      Product.findByID(req.params.productID)
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
      res.redirect("/");
    }
  });
};

exports.getCart = (req, res, next) => {
  isLoggedIn(async (user) => {
    if (user) {
      const items = [];
      if (user.cart) {
        for (let item of user.cart) {
          items.push({
            ...(await Product.findByID(item._id)),
            quantity: item.quantity,
          });
        }
      }
      console.log(items);
      res.render("shop/cart", {
        products: items,
        pageTitle: "Shopping Cart",
        path: "/shop/cart",
        user: "user",
      });
    } else {
      res.redirect("/");
    }
  });
};
exports.postCart = (req, res, next) => {
  const file = path.join(root, "data", "sessions.txt");
  fs.readFile(file, "utf-8", (err, userID) => {
    if (err) throw "read error";
    User.addToCart(userID, req.body.productID).then((err) => {
      if (err) console.log(err);
      res.redirect("/shop");
    });
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const file = path.join(root, "data", "sessions.txt");
  fs.readFile(file, "utf-8", (err, userID) => {
    if (err) throw "read error";
    User.deleteFromCart(userID, req.body.productID).then((err) => {
      if (!err) {
        console.log("Item Deleted!");
      } else {
        console.log("Delete Error!");
      }
      res.redirect("/shop/cart");
    });
  });
};

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((result) => {
//       return fetchedCart.setProducts(null);
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       res.render("shop/orders", {
//         path: "/orders",
//         pageTitle: "Your Orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };
