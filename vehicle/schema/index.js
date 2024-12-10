import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  carModel: { type: String, required: true },
  price: { type: Number, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  numberOfCopies: { type: Number, required: true, min: 1, max: 10 },
  imageUrls: { type: [String], required: true },
});

export default model('Vehicle', vehicleSchema);
