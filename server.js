/*
 * Requirements
 */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
//include files
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");



/*
 *Express Setup
 */
const app = express();
const port = process.env.PORT || 5000;

/*
 * Body Parser
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
 * Mongo Db connection
 */

mongoose
  .connect("mongodb://localhost:27017/SocialMedia-Node", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDb connected"))
  .catch(() => console.log("error:".error));

/*
 * Passport Middleware and Config
 */
app.use(passport.initialize());
//passport in config
require("./config/password")(passport);

/*
 * use Routes
 */

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
