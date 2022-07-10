const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, required: true, default: "flat" },
  discount: { type: Number, required: true, min: 0 },
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
