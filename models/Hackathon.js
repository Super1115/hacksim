import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  host: { type: String, required: true },
  startTime: { type: Number, required: true }, // Unix timestamp for start time
  endTime: { type: Number, required: true }, // Unix timestamp for end time
  website: { type: String }, // Optional website link
  contact: { type: String, required: true }, // Default to host's email
  md: { type: String }, // Markdown description for the hackathon
  participants: [
    {
      githubID: { type: String, required: true },
      name: { type: String, required: true },
      team: { type: String },
      role: {
        type: String,
        enum: ["host", "judge", "participant"],
        required: true,
      },
    },
  ],
});

const Hackathon = mongoose.model("Hackathon", HackathonSchema);

export default Hackathon;