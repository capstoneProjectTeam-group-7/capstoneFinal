import React, { Fragment, useEffect, useState } from "react";
import "./BulkProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, bulkProduct } from "../../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../Layout/MetaData";
import Sidebar from "../SideBar/Sidebar";
import { BULK_PRODUCT_RESET } from "../../../constants/productConstants";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const BulkProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.bulkProduct);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      history.push("/admin/dashboard");
      dispatch({ type: BULK_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("csv", file);
    dispatch(bulkProduct(myForm));
  };

  const bulkProductFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFile(files[0]);
    setFileName(files[0].name);
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />

        <div className="bulkProductContainer">
          <form className="createProductForm" encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
            <h1>Bulk Product Create</h1>

            <h6>{fileName}</h6>
            <div id="createProductFormFile">
              <input type="file" name="avatar" multiple onChange={bulkProductFileChange} />
            </div>

            <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default BulkProduct;
