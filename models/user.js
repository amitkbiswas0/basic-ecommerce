const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (productID) {
  const productIndex = this.cart.items.findIndex(
    (product) => product._id.toString() === productID
  );
  if (productIndex === -1) {
    this.cart.items.push({
      _id: productID,
      quantity: 1,
    });
    console.log("new product added!");
  } else {
    this.cart.items[productIndex].quantity++;
    console.log("old product updated!");
  }
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
