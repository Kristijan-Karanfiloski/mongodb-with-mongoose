/* eslint-disable prettier/prettier */
const express = require("express");

const morgan = require("morgan");

const app = express();

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

////////////////////////////////////////////////////////////
///////////////////// 1) MIDDLEWARES ////////////////////

//// MIDDLEWARE in the middle of the request and response

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
//SERVING STATIC FILES FROM A SERVER //////////////////
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("HEADERS", req.headers);
  next();
});

//////////////// MOUNTING OUR ROUTES //////////////////

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
