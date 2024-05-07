import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  oid: { type: String, required: true },
  done: { type: Boolean, default: false },
});

let Payment;

try {
  Payment = mongoose.model('Payment');
} catch (e) {
  Payment = mongoose.model('Payment', PaymentSchema);
}

export default Payment