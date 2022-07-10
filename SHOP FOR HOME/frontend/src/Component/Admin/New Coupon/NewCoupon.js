import React, { Fragment, useEffect, useState } from "react";
import "./NewCoupon.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createCoupon } from "../../../actions/couponAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../Layout/MetaData";
import Sidebar from "../SideBar/Sidebar";
import { NEW_COUPON_RESET } from "../../../constants/couponConstants";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const NewCoupon = ({ history }) => {
  const types = ["flat", "percent"];

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newCoupon);

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Coupon Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_COUPON_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const createCouponSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("code", code);
    myForm.set("discount", discount);
    myForm.set("type", type);

    dispatch(createCoupon(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Coupon" />
      <div className="dashboard">
        <Sidebar />

        <div className="newCouponContainer">
          <form className="createCouponForm" encType="multipart/form-data" onSubmit={createCouponSubmitHandler}>
            <h1>Create Coupon</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Coupon Code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setType(e.target.value)}>
                <option value="">Choose Type</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <AttachMoneyIcon />
              <input type="number" placeholder="Discount" required onChange={(e) => setDiscount(e.target.value)} />
            </div>

            <Button id="createCouponBtn" type="submit" disabled={loading ? true : false}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCoupon;
