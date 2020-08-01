const fs = require("fs");
const path = require("path");

const root = require("../util/path");
const User = require("../models/user");

// serve login page
exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login Page",
    path: "/login",
  });
};

// validate login
exports.postLogin = (req, res, next) => {
  User.find({ username: req.body.username, password: req.body.pass }).then(
    (user) => {
      if (user.length !== 0) {
        // if validated store user to session
        const file = path.join(root, "data", "sessions.txt");
        fs.writeFile(file, user[0]._id.toString(), (err) => {
          if (!err) {
            if (req.body.admin) res.redirect("/admin/products");
            else res.redirect("/shop");
          } else console.log("session write error!");
        });
      } else res.redirect("/");
    }
  );
};

// logout user and clear session
exports.getLogOut = (req, res, next) => {
  const file = path.join(root, "data", "sessions.txt");
  fs.writeFile(file, "no user session", (err) => {
    if (!err) {
      console.log("Logged out!");
    } else {
      console.log("session write error!");
    }
    res.redirect("/");
  });
};
