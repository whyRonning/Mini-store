const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
app.use(express.json({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use("/api", require("./Routes/main"));
if (process.env.Node_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "front", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front", "build", "index.html"));
  });
}
const Port = config.get("port") || 3000;
async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(Port, () => console.log(Port));
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}
start();
