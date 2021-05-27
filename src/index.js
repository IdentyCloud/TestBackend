require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// settings
const app = express();
const database = require("./config/database");

// middelwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routers API
app.use("/access/", require("./routers/authentication"));
app.use("/actor/", require("./routers/actor"));
app.use("/director/", require("./routers/director"));
app.use("/movie/", require("./routers/movie"));
app.use("/show/", require("./routers/show"));

// server run
app.set("port", process.env.PORT || 4000);
app.listen(app.get("port"), () => {
  console.log("Server on PORT", app.get("port"));
});
