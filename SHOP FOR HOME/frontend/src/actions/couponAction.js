import axios from "axios";

import {
  COUPON_DETAILS_FAIL,
  COUPON_DETAILS_REQUEST,
  COUPON_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  ADMIN_COUPON_REQUEST,
  ADMIN_COUPON_FAIL,
  ADMIN_COUPON_SUCCESS,
  NEW_COUPON_REQUEST,
  NEW_COUPON_SUCCESS,
  NEW_COUPON_FAIL,
  DELETE_COUPON_REQUEST,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
} from "../constants/couponConstants";

//  Get all Coupons for Admin
export const getAdminCoupons = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_COUPON_REQUEST });
    const { data } = await axios.get("/api/v1/admin/coupons");

    dispatch({
      type: ADMIN_COUPON_SUCCESS,
      payload: data.coupons,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// create COUPON
export const createCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_COUPON_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/v1/admin/coupons`, couponData, config);
    dispatch({
      type: NEW_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete COUPON
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COUPON_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/coupons/${id}`);
    dispatch({
      type: DELETE_COUPON_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCouponDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COUPON_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/coupons/${id}`);
    dispatch({
      type: COUPON_DETAILS_SUCCESS,
      payload: data.coupon,
    });
  } catch (error) {
    dispatch({
      type: COUPON_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
