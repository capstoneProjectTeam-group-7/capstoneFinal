const express = require("express");
const { newCoupon, getSingleCoupon, getAllCoupons, deleteCoupon } = require("../controllers/couponController");
const router = express.Router();

const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");

router.route("/coupons/:id").get(isAuthenticatedUser, getSingleCoupon);
router
  .route("/admin/coupons")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllCoupons)
  .post(isAuthenticatedUser, authorizedRoles("admin"), newCoupon);
router.route("/admin/coupons/:id").delete(isAuthenticatedUser, authorizedRoles("admin"), deleteCoupon);

module.exports = router;
