const User = require("../models/user");
const Admin = require("../models/admin");

// serve login page
exports.getLogin = (req, res, next) => {
  res.render("login", {
    pageTitle: "Login Page",
    path: "/",
  });
};

// validate login
exports.postLogin = (req, res, next) => {
  if (req.body.admin) {
    Admin.find({ username: req.body.username, password: req.body.pass }).then(
      (admin) => {
        if (admin.length !== 0) {
          req.session.userSess = admin[0]._id;
          res.redirect("/admin/dashboard");
        } else res.redirect("/");
      }
    );
  } else if (req.body.user) {
    User.find({ username: req.body.username, password: req.body.pass }).then(
      (user) => {
        if (user.length !== 0) {
          req.session.userSess = user[0]._id;
          res.redirect("/shop");
        } else res.redirect("/");
      }
    );
  } else {
    res.redirect("/");
  }
};

// logout user and clear session
exports.getLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};
