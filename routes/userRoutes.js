const express = require("express");

const router = express.Router();
const {
  updateUser,
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
  updateMe,
  deleteMe,
} = require("../controllers/userController");
const {
  signup,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  protect,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);
router.delete("/deleteMe", protect, deleteMe);

router.patch("/updateMe", protect, updateMe);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
