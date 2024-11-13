import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  whatsappGroupLink: {
    type: String,
    required: false, // Optional, will be generated if necessary
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
});

export default mongoose.model("Event", eventSchema);
