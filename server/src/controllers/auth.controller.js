import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";
import { validateSignupData, validateLoginData } from "../utils/validation.js";
import passport from "../config/passport.js";

// =============================
// Email/Password Signup
// =============================
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    const validation = validateSignupData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || "founder",
    });
    await user.save();

    // ✅ Fix: pass full user (not user.toJWT()) into generateToken
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "Account created successfully! You are now logged in.",
      token,
      user: user.toJWT(),
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// =============================
// Email/Password Login
// =============================
export const login = async (req, res, next) => {
  const validation = validateLoginData(req.body);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.errors,
    });
  }

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Login authentication error:", err);
      return res.status(500).json({
        success: false,
        message: "Authentication error",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || "Invalid email or password",
      });
    }

    // ✅ Fix: pass full user (not user.toJWT()) into generateToken
    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: user.toJWT(),
    });
  })(req, res, next);
};

// =============================
// Get Current User (Protected Route)
// =============================
export const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.toJWT(),
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get user information",
    });
  }
};

// =============================
// Google OAuth Callback
// =============================
export const googleCallback = async (req, res) => {
  try {
    const token = generateToken(req.user);
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/auth/callback?token=${token}`);
  } catch (error) {
    console.error("Google callback error:", error);
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendURL}/auth/error`);
  }
};

// =============================
// Logout
// =============================
export const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logout successful. Please remove the token from client-side storage.",
  });
};

// =============================
// Update User Profile
// =============================
export const updateProfile = async (req, res) => {
  try {
    const { name, role } = req.body;
    const userId = req.user._id;

    const updateData = {};
    if (name) updateData.name = name;
    if (role && ["founder", "investor", "community"].includes(role)) {
      updateData.role = role;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: user.toJWT(),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
