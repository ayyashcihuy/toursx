const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const router = require("./routes");
const app = express();
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;
app.use(express.json());

app.use(morgan("dev"));

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
