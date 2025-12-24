import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    domain: {
      type: String,
      required: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    abstract: {
      type: String,
      required: true,
    },

    links: {
      type: [String],
      default: [],
    },

    sourceCode: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.model("Research", researchSchema);
