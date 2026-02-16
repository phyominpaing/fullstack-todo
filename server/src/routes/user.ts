import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.ts";
import { protect } from "../middlewares/authMiddleware.ts";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
// router.put("/profile", updateUserProfile);
// router.get("/profile", getUserProfile);

router.route("/profile").put(updateUserProfile).get( protect , getUserProfile);

export default router;
