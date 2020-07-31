const getdb = require("../util/database").getdb;
const mongodb = require("mongodb");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    return getdb()
      .collection("products")
      .insertOne(this)
      .then((res) => {
        console.log("Insertion Successful.");
      })
      .catch((err) => {
        console.log("Insertion failed.", err);
      });
  }
  update(id) {
    return getdb()
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this })
      .then(() => {
        console.log("Update One Successful.");
      })
      .catch((err) => {
        console.log("Update One failed.", err);
      });
  }
  static delete(id) {
    return getdb()
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectID(id) })
      .then(() => {
        console.log("Delete One Successful.");
      })
      .catch((err) => {
        console.log("Delete One failed.", err);
      });
  }
  static fetchAll() {
    // finds all products, returns curser/handle
    return getdb()
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log("Find All Successful.");
        // console.log(res);
        return products;
      })
      .catch((err) => {
        console.log("Find All failed.", err);
      });
  }
  static findByID(id) {
    // finds a product that matches filter passed to
    // find. returns cursor so next() is used to navigate
    return getdb()
      .collection("products")
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((product) => {
        console.log("Find One Successful.");
        // console.log(res);
        return product;
      })
      .catch((err) => {
        console.log("Find One failed.", err);
      });
  }
}

module.exports = Product;
