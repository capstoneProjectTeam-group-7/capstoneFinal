const Coupon = require("../models/couponModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new coupon - Admin
const newCoupon = catchAsyncErrors(async (req, res, next) => {
  const { code, type, discount } = req.body;

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    type,
    discount,
  });

  res.status(201).json({
    success: true,
    coupon,
  });
});

const mongoose = require("mongoose");
// GET single Coupon by id or code
const getSingleCoupon = catchAsyncErrors(async (req, res, next) => {
  const isId = mongoose.isValidObjectId(req.params.id);
  const query = isId ? { _id: req.params.id } : { code: req.params.id.toUpperCase() };
  const coupon = await Coupon.findOne(query);

  if (!coupon) {
    return next(new ErrorHandler("Coupon id or code is invalid.", 404));
  }

  res.status(200).json({
    success: true,
    coupon,
  });
});

// get all Coupons -- Admin
const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await Coupon.find();
  res.status(200).json({
    success: true,
    coupons,
  });
});

// Delete Coupon -- Admin
const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await Coupon.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Coupon not found with this Id", 404));
  }

  await coupon.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  newCoupon,
  getSingleCoupon,
  getAllCoupons,
  deleteCoupon,
};
