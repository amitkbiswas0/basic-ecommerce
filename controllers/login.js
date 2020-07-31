const fs = require("fs");
const path = require("path");
const root = require("../util/path");
const Users = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login Page",
    path: "/login",
  });
};

exports.postLogin = (req, res, next) => {
  Users.findUser(req.body.username, req.body.pass, (user) => {
    const file = path.join(root, "data", "sessions.txt");
    if (user) {
      fs.writeFile(file, user._id.toString(), (err) => {
        if (!err) {
          if (req.body.admin) res.redirect("/admin/products");
          else res.redirect("/shop");
        } else console.log("session write error!");
      });
    } else res.redirect("/");
  });
};

exports.getLogOut = (req, res, next) => {
  const file = path.join(root, "data", "sessions.txt");
  fs.writeFile(file, "no user", (err) => {
    if (!err) {
      console.log("Logged out!");
    } else {
      console.log("session write error!");
    }
    res.redirect("/");
  });
};
