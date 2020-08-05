const ObjectID = require("mongoose").Types.ObjectId;

const User = require("../models/user");
const Admin = require("../models/admin");

exports.isLoggedIn = (userSess, identity, cb) => {
  if (!userSess) userSess = { _id: ObjectID() };
  const userID = userSess._id;

  if (ObjectID.isValid(userID)) {
    if (identity === "admin") {
      Admin.findById(userID).then((admin) => {
        cb(admin);
      });
    } else if (identity === "user") {
      User.findById(userID).then((user) => {
        cb(user);
      });
    }
  }
};
