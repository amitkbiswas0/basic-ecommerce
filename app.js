require("dotenv").config();
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error");
const loginOut = require("./routes/loginout");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db connection ur, parameters
const DB_PARAMS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// main express ap
const app = express();

// session store
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "sessions",
});

// setting up view engine and path
app.set("view engine", "ejs");
app.set("views", "views");

// parsing req bodies, setting default static path and sessions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret msg",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// routes
app.use("/", loginOut);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/logout", loginOut);

// error route
app.use(errorController.get404);

// connect to db
mongoose
  .connect(`${process.env.DB_URI}?retryWrites=true&w=majority`, DB_PARAMS)
  .then((response) => {
    if (response) console.log("Connected to Database!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
