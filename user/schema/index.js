import { Schema, model } from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 10);
  next();
});

export default model('User', userSchema);
