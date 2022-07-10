import {
    ADD_TO_WISHLIST,
    REMOVE_WISHLIST_ITEM,
  } from "../constants/wishlistConstants";
  import axios from "axios";
  
  // Add to cart
  export const addItemsToWishlist = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
  
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
  };
  
  // Remove from cart
  
  export const removeItemFromWishlist = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_WISHLIST_ITEM,
      payload: id,
    });
  
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
  };