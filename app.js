/* eslint-disable prettier/prettier */
const express = require("express");

const morgan = require("morgan");

const app = express();

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

////////////////////////////////////////////////////////////
///////////////////// 1) MIDDLEWARES ////////////////////

//// MIDDLEWARE in the middle of the request and response
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

//SERVING STATIC FILES FROM A SERVER //////////////////
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware ");
  next();
});

//////////////// MOUNTING OUR ROUTES //////////////////

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
