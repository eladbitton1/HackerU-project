const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const debug = require("debug")("bizcard:app");
const cors = require("cors");
const helmet = require("helmet");
const logger = require("./config/winston");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");

const apiRouter = require("./routes/api");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: logger.stream.write }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter, apiRouter);
app.use("/api/*", limiter, (req, res) => {
  throw new Error("error thrown navigate to");
});
app.use((err, req, res, next) => {
  global.logger.error({
    method: req.method,
    error: err.message,
    url: req.originalUrl,
  });
  next(err);
});

/* React */
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
