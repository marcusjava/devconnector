const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;
// Connect to mongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("Mongo connected!!!");
  })
  .catch(error => console.log(error));

app.get("/", (req, res) => {
  console.log(req);
  res.send("Hello its work!!!");
});

// Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
