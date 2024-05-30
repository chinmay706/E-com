import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location =  "https://instagram.com/mr.nyol_007";
  };
  return (
    <div className="aboutSection absolute top-[3.6vmax]  ">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dhvvefbcj/image/upload/v1716798442/about/tknl1h4xjnbgbc8dp2pa.jpg "
              alt="Founder"
            />
            <Typography>suresh kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
            Hello there! I'm suresh kumar, and I've created this MERN stack website,  E-commerce. My goal is to enhance my skills by learning new technologies. Building this website has been a rewarding experience for me, and I hope it proves beneficial for all of you as well. Thank you!







            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            

            <a href="https://instagram.com/mr.nyol_007" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
