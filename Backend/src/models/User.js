import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["RESEARCHER", "EXPLORER"],
      default: "EXPLORER"
    },

    expertise: {
      type: [String],
      default: []
    },

    // ✅ NEW: avatar / logo per user
    avatar: {
      name: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export default mongoose.model("User", userSchema);
