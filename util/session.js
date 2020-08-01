const fs = require("fs");
const path = require("path");
const root = require("../util/path");
const ObjectID = require("mongoose").Types.ObjectId;

const User = require("../models/user");

exports.isLoggedIn = (cb) => {
  const file = path.join(root, "data", "sessions.txt");
  fs.readFile(file, "utf-8", (err, userID) => {
    if (err) console.log("read error!");

    if (ObjectID.isValid(userID) && String(new ObjectID(userID)) === userID) {
      User.findById(userID).then((user) => {
        cb(user);
      });
    } else {
      cb("");
    }
  });
};
