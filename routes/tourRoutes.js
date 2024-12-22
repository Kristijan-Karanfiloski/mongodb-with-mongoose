const express = require("express");

const router = express.Router();

const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protect } = require("../controllers/authController");

// router.param("id", checkID);

//CREATE CHECK BODY MIDDLEWARE
// CHECK IF THE BODY CONTAINS THE NAME AND PRICE PROPERTY
// IF not send back 400 (bad request)

router.route("/monthly-plan/:year").get(getMonthlyPlan);
router.route("/tour-stats").get(getTourStats);
router.route("/top-5-cheap").get(aliasTopTours, getAllTours);
router.route("/").get(protect, getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
