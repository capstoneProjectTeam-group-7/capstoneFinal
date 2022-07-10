import React from "react";
import playStore from "../../../Images/playstore.png";
import appStore from "../../../Images/Appstore.png";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <h4>Download Our APP</h4>
        <p>Download App from for Android and IOS Mobile</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>SHOP FROM HOME</h1>
        <p>High Quality is our first Priority</p>
        <p>Copyrights 2022 &copy; GROUP 7</p>
      </div>

      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.linkedin.com/in/ujjawal-rawat-3ba77b1a9/">
          Linkedln
        </a>
        <a href="https://github.com/capstoneProjectTeam-group-7/ShopForHome">Github</a>
        <a href="https://github.com/capstoneProjectTeam-group-7/ShopForHome">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
