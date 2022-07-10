import React, { Fragment, useEffect } from "react";
import "./CouponList.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAdminCoupons, deleteCoupon } from "../../../actions/couponAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../Layout/MetaData";
import Sidebar from "../SideBar/Sidebar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DELETE_COUPON_RESET } from "../../../constants/couponConstants";

const CouponList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { coupons, error } = useSelector((state) => state.coupons);
  const { error: deleteError, isDeleted } = useSelector((state) => state.coupon);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Coupon Delete Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: DELETE_COUPON_RESET });
    }

    dispatch(getAdminCoupons());
  }, [dispatch, alert, error, history, deleteError, isDeleted]);

  const deleteCouponHandler = (id) => {
    dispatch(deleteCoupon(id));
  };

  const columns = [
    { field: "id", headerName: "Coupon ID", minWidth: 200, flex: 0.5 },
    { field: "code", headerName: "Code", minWidth: 350, flex: 1 },
    {
      field: "type",
      headerName: "Type",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <DeleteIcon onClick={() => deleteCouponHandler(params.getValue(params.id, "id"))} />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  coupons &&
    coupons.forEach((item) => {
      rows.push({
        id: item._id,
        type: item.type,
        discount: `₹${item.discount}`,
        code: item.code,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL COUPONS - Admin`} />
      <div className="dashboard">
        <Sidebar />
        <div className="couponListContainer">
          <h1 id="couponListHeading">All Coupons</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="couponListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CouponList;
