const express = require("express");

const router = express.Router();
const {
  updateUser,
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
} = require("../controllers/userController");
const { signup, login } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
