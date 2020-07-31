const getdb = require("../util/database").getdb;
const mongodb = require("mongodb");

module.exports = class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  save() {
    return getdb()
      .collection("users")
      .insertOne(this)
      .then((res) => {
        console.log("User Insertion Successful.");
      })
      .catch((err) => {
        console.log("User Insertion failed.", err);
      });
  }
  static addToCart(userID, productID) {
    return User.fetchUser(userID).then((user) => {
      let updatedCart;
      if (user.hasOwnProperty("cart")) {
        const cart = user.cart;
        let updatedProduct;
        // console.log(cart);
        const cartProduct = cart.findIndex(
          (product) => product._id.toString() === productID
        );
        if (cartProduct == -1) {
          updatedProduct = {
            _id: new mongodb.ObjectID(productID),
            quantity: 1,
          };
          cart.push(updatedProduct);
          // console.log("new product added");
        } else {
          cart[cartProduct].quantity++;
          // console.log("old product updated");
        }
        updatedCart = cart;
      } else {
        updatedCart = [{ _id: new mongodb.ObjectID(productID), quantity: 1 }];
        // console.log("new cart added");
      }
      return getdb()
        .collection("users")
        .updateOne(
          { _id: new mongodb.ObjectID(userID) },
          { $set: { cart: updatedCart } }
        )
        .then(() => {
          console.log("Added/Updated to Cart");
        })
        .catch((err) => {
          console.log("Failed to add to cart!", err);
        });
    });
  }
  static deleteFromCart(userID, productID) {
    return getdb()
      .collection("users")
      .updateOne(
        {
          _id: new mongodb.ObjectID(userID),
        },
        { $pull: { cart: { _id: new mongodb.ObjectID(productID) } } }
      )
      .then(() => {
        console.log("Added/Updated to Cart");
      })
      .catch((err) => {
        console.log("Failed to add to cart!", err);
      });
  }
  static fetchUser(id) {
    return getdb()
      .collection("users")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log("Failed fetch", err);
      });
  }
  static fetchAll() {
    return getdb()
      .collection("users")
      .find()
      .toArray()
      .then((res) => {
        console.log("User Insertion Successful.");
      })
      .catch((err) => {
        console.log("User Insertion failed.", err);
      });
  }
  static findUser(username, pass, cb) {
    return getdb()
      .collection("users")
      .find({ username: username, password: pass })
      .next()
      .then((user) => {
        cb(user);
      });
  }
};
