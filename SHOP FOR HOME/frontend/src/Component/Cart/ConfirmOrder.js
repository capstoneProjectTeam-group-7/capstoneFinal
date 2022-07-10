import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal - discount + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country} `;

  const proccedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/process/payment");
  };

  const applyCoupon = async () => {
    try {
      const { data } = await axios.get(`/api/v1/coupons/${code}`);
      if (data.coupon.type === "flat") {
        const dis = subtotal - data.coupon.discount > 0 ? data.coupon.discount : subtotal;
        setDiscount(dis);
      } else if (data.coupon.type === "percent") {
        const dis = (subtotal * data.coupon.discount) / 100;
        setDiscount(dis.toPrecision(2));
      }
    } catch (error) {
      setCode("");
      window.alert(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>

          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X {item.price} =<b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>₹{subtotal}</span>
              </div>

              <div>
                <p>Discount:</p>
                <span>- ₹{discount}</span>
              </div>

              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>

              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="coupon">
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
              <button onClick={applyCoupon}>Apply</button>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total: </b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proccedToPayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
