import express from 'express';
import { loginUser, logoutUser, registerUser, refreshAccessToken,changeCurrentPassword,getCurrentUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/register").post(
    registerUser
    );
// login route
router.route("/login").post(loginUser);

// secure this route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
