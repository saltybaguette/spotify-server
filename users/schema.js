import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: String,
        email: String,
        lastName: String,
        dob: Date,
        role: {
            type: String,
            enum: ["ADMIN", "USER"],
            default: "USER" },
        liked_songs: [String],
        liked_albums: [String],
        followers: [String],
        following: [String],
    },
    { collection: "users" });
export default userSchema;