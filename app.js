/* eslint-disable prettier/prettier */
const express = require("express");
const morgan = require("morgan");
const ratelimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

////////////////////////////////////////////////////////////
///////////////////// 1)GLOBAL MIDDLEWARES ////////////////////

//// MIDDLEWARE in the middle of the request and response

// SET SECURITY HTTP HEADERS

app.use(helmet());

// DEVELOPMENT LOGGING

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// LIMIT REQUEST FROM THE SAME API

const limiter = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour! ",
});

app.use("/api", limiter);

// BODY PARSER READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: "10kb" }));

// DATA SANITIZATION AGAINST NO SQL QUERY INJECTION

app.use(mongoSanitize());

// DATA SANITIZATION AGAINST NO SQL XSS
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  }),
);

//SERVING STATIC FILES FROM A SERVER //////////////////
app.use(express.static(`${__dirname}/public`));

// TEST MIDDLEWARE
app.use((req, res, next) => {
  // console.log("HEADERS", req.headers);
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
