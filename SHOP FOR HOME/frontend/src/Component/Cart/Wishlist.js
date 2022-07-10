import React, { Fragment } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToWishlist, removeItemFromWishlist } from "../../actions/wishlistAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Wishlist = ({ history }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToWishlist(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;

    if (quantity < 2) {
      dispatch(removeItemFromWishlist(id));
      return;
    }
    dispatch(addItemsToWishlist(id, newQty));
  };

  const deleteWishlistItems = (id) => {
    dispatch(removeItemFromWishlist(id));
  };

  // const checkoutHandler = () => {
  //   history.push("/login?redirect=shipping");
  // };

  return (
    <Fragment>
      <MetaData title="Wishlist" />
      {wishlistItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Wishlist</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              {/* <p>Subtotal</p> */}
            </div>

            {wishlistItems &&
              wishlistItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteWishlistItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      -
                    </button>
                    <input type="number" value={item.quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  {/* <p className="cartSubtotal">
                    ₹{`${item.price * item.quantity}`}
                  </p> */}
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              {/* <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>
                  ₹
                  {`${wishlistItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}
                </p>
              </div>
              <div> </div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div> */}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Wishlist;