import express from "express";
import passport from "../config/passport.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import {
  signup,
  login,
  getMe,
  googleCallback,
  logout,
  updateProfile,
} from "../controllers/auth.controller.js";
import User from "../models/user.model.js";

const router = express.Router({ mergeParams: true });

/* -------------------------------------------------------------------------- */
/*                         📦 EMAIL / PASSWORD ROUTES                         */
/* -------------------------------------------------------------------------- */

// Default signup (founder/community)
router.post("/signup", signup);

// Dedicated investor signup
router.post("/signup/investor", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if investor already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Create new investor
    const investor = new User({
      name,
      email,
      password,
      role: "investor",
    });

    await investor.save();

    res.status(201).json({
      success: true,
      message: "Investor account created successfully.",
    });
  } catch (err) {
    console.error("Investor signup failed:", err);
    res.status(500).json({
      success: false,
      message: "Server error during investor signup.",
    });
  }
});

// Login route (shared by all roles)
router.post("/login", login);

/* -------------------------------------------------------------------------- */
/*                              🌐 GOOGLE OAUTH                               */
/* -------------------------------------------------------------------------- */

if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_ID !== "your_google_client_id_here"
) {
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
    })
  );

  router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/auth/error",
      session: false,
    }),
    googleCallback
  );
} else {
  router.get("/google", (req, res) =>
    res.status(503).json({
      success: false,
      message: "Google OAuth is not configured on this server",
    })
  );

  router.get("/google/callback", (req, res) =>
    res.status(503).json({
      success: false,
      message: "Google OAuth is not configured on this server",
    })
  );
}

/* -------------------------------------------------------------------------- */
/*                          🔐 JWT-PROTECTED ROUTES                           */
/* -------------------------------------------------------------------------- */

router.get("/me", authenticateJWT, getMe);
router.put("/profile", authenticateJWT, updateProfile);
router.post("/logout", logout);

/* -------------------------------------------------------------------------- */
/*                              ⚠️ ERROR HANDLER                              */
/* -------------------------------------------------------------------------- */

router.get("/error", (req, res) => {
  res.status(400).json({
    success: false,
    message: "Authentication failed. Please try again.",
  });
});

export default router;
