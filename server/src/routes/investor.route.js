import express from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import Startup from "../models/startup.model.js";
import User from "../models/user.model.js";

const router = express.Router();

// ✅ Fetch all startup pitches
router.get("/pitches", authenticateJWT, async (req, res) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      startups,
    });
  } catch (error) {
    console.error("Error fetching startups:", error);
    res.status(500).json({ success: false, message: "Server error fetching startups" });
  }
});

// 🧩 Investor marks interest in a startup
router.post("/interest/:startupId", authenticateJWT, async (req, res) => {
  console.log("➡️  Received request to mark interest");

  try {
    const { startupId } = req.params;
    console.log("📦 Startup ID:", startupId);
    console.log("👤 Authenticated user:", req.user?.email);

    const investor = await User.findById(req.user.id);

    if (!investor) {
      console.log("❌ Investor not found");
      return res.status(404).json({ success: false, message: "Investor not found" });
    }

    if (investor.role !== "investor") {
      console.log("🚫 Access denied: not an investor");
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    if (!investor.interestedPitches) investor.interestedPitches = [];
    if (!investor.interestedPitches.includes(startupId)) {
      investor.interestedPitches.push(startupId);
      await investor.save();
      console.log("✅ Interest saved successfully");
    } else {
      console.log("ℹ️  Already marked interest in this pitch");
    }

    res.status(200).json({
      success: true,
      message: "Interest recorded successfully",
    });
  } catch (error) {
    console.error("❌ Error marking interest:", error);
    res.status(500).json({
      success: false,
      message: "Server error marking interest",
    });
  }
});


export default router;
