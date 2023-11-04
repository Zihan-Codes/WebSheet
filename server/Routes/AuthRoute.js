const { Signup, Login, getAllUsers, deleteUsers } = require("../Controllers/AuthController");

const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/", userVerification);
router.post("/signup", Signup);
router.post("/login", Login);
router.get("/get-users", getAllUsers);
router.delete("/delete-user/:id", deleteUsers);

module.exports = router;