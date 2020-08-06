const bcrypt = require("bcryptjs");
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
  console.log(req.body);
  if (req.body.admin) {
    Admin.findOne({ username: req.body.username }).then((admin) => {
      if (admin) {
        const matched = bcrypt.compareSync(req.body.pass, admin.password);
        if (matched) {
          req.session.userSess = admin._id;
          res.redirect("/admin/dashboard");
        } else res.redirect("/");
      } else {
        res.redirect("/");
      }
    });
  } else if (req.body.user) {
    User.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        // console.log("pass: ", user.password);
        const matched = bcrypt.compareSync(req.body.pass, user.password);
        if (matched) {
          req.session.userSess = user._id;
          // console.log("session created: ", req.session.userSess);
          res.redirect("/");
        } else res.redirect("/");
      } else {
        res.redirect("/");
      }
    });
  }
  // } else {
  //   res.redirect("/");
  // }
};

// logout user and clear session
exports.getLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
};

// signup
exports.getSignup = (req, res, err) => {
  res.render("signup", {
    pageTitle: "Signup Page",
  });
};
exports.postSignup = (req, res, err) => {
  User.findOne({
    $or: [
      {
        username: req.body.username,
      },
      {
        email: req.body.email,
      },
    ],
  })
    .then(async (user) => {
      if (user) {
        console.log("User/Email exists!");
      } else {
        const hashedPass = await bcrypt.hash(req.body.pass, 12);
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
          cart: { items: [] },
        });
        return user.save();
      }
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log("/");
    });
};
