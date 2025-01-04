import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema({
  githubID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  md: { type: String }, // Markdown content for user settings or profile
  hackathons: [
    {
      hackathonId: { type: String, required: true },
      role: {
        type: String,
        enum: ["host", "judge", "participant"],
        required: true,
      },
    },
  ],
  githubUrl: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

export default User;
