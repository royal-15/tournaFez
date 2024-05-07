import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  provider: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String },
  image: { type: String },
}, { timestamps: true });

let User;
try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

export default User