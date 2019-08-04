/*
 * Requirements
 */
const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
/*
 *Express Setup
 */
const app = express();
const port = process.env.PORT || 5000;

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
 * use Routes and Middleware
 */

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("Hello World testdsf!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
