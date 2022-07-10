import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";


const About = () => {
  const visitSite = () => {
    window.location = "https://github.com/capstoneProjectTeam-group-7";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Group 7</Typography>
            <Button onClick={visitSite} color="primary">
              Portfolio wesbite
            </Button>
            <span>
              This is a MERN Stack Ecommerce wesbite made by Group7.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
