const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

// database
const mongoConnect = require("./util/database").mongoConnect;

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

// login route
app.use("/", loginOut);
// admin route
app.use("/admin", adminRoutes);
// user route
app.use("/shop", shopRoutes);
// logout route
app.use("/logout", loginOut);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
