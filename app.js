const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const loginOut = require("./routes/loginout");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// main express ap
const app = express();

// setting up view engine and path
app.set("view engine", "ejs");
app.set("views", "views");

// parsing req bodies and setting default static path
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/", loginOut);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/logout", loginOut);

// error route
app.use(errorController.get404);

// db connection ur, parameters
const uri =
  "mongodb+srv://username:password@clustername.g43sz.mongodb.net/dbname?retryWrites=true&w=majority";
const params = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// connect to db
mongoose
  .connect(uri, params)
  .then((response) => {
    if (response) console.log("connected to database....");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
