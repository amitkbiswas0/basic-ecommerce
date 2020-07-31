const fs = require("fs");
const path = require("path");
const root = require("../util/path");
const ObjectID = require("mongodb").ObjectID;

const User = require("../models/user");
const { callbackify } = require("util");
const { createBrotliCompress } = require("zlib");

const file = path.join(root, "data", "sessions.txt");

exports.isLoggedIn = (cb) => {
  fs.readFile(file, "utf-8", (err, userID) => {
    if (err) throw "read error!";
    if (ObjectID.isValid(userID)) {
      User.fetchUser(userID).then((user) => {
        cb(user);
      });
    } else {
      cb("");
    }
  });
};
