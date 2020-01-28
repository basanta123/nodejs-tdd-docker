const express = require("express");
const mongoose = require("mongoose");
const createError = require("http-errors");
var cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false
  })
  .then(() =>
    console.log(`Connected to MongoDB at mongodb://localhost/tddDB...`)
  )
  .catch(err => {
    console.log("Failed to connect to MongoDB...", err);
    process.exit();
  });

const usersRouter = require("./routes/user.route");

app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
