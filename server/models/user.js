import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  mobile: { type: String },
  email: { type: String },
  name: { type: String },
  auth: { type: Number },
  avatarUrl: { type: String },
  createdAt: Date,
  updatedAt: Date,
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
