import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // Common fields for all users
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password required only if not Google OAuth user
      },
    },
    googleId: {
      type: String,
      sparse: true, // Allows multiple null values but unique non-null values
    },

    // Role management
    role: {
      type: String,
      enum: ["founder", "investor", "community"],
      default: "founder",
    },

    // Profile / common fields
    avatar: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },

    // 🧩 Investor-specific fields
    investmentPreferences: {
      industries: [
        {
          type: String,
        },
      ],
      stages: [
        {
          type: String,
          enum: [
            "Pre-Seed",
            "Seed",
            "Series A",
            "Series B",
            "Series C",
            "Growth",
            "IPO",
          ],
        },
      ],
      minInvestment: {
        type: Number,
        default: 0,
      },
      maxInvestment: {
        type: Number,
      },
    },

    // 🧠 Save pitches that an investor has shown interest in
    interestedPitches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pitch",
      },
    ],

    // System / verification flags
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//
// 🔐 Password Hashing Middleware
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

//
// 🧮 Compare Passwords
//
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

//
// 🪪 Generate JWT Payload
//
userSchema.methods.toJWT = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
    isVerified: this.isVerified,
  };
};

//
// ✅ Export Model
//
const User = mongoose.model("User", userSchema);
export default User;
