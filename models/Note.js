import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Note must have a title"],
      unique: [true, "Note title must be unique"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Note must have a description"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Note || mongoose.model("Note", noteSchema);
