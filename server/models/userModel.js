import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    identity: { type: String, required: true},
    password: { type: String, required: true },
    resetOtp: { type: String, default: '' },
    resetOtpExpiryAt: { type: Number, default: 0 }

}, { minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel

