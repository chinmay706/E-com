import React from "react";
import image from "../../../images/me.jpg"

import { Button, Avatar } from "@material-ui/core";
 
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/mr.nyol_007";
  };
  return (
    <div className="h-[100vh] md:h-[0vmax] w-[100vw]   top-[10vmax] left-0 z-0">
      <div className="flex w-[100vw]    md:items-center   justify-evenly md:flex-row flex-col ">
        <div className="flex   m-3" >
          <Avatar
            className="z-0"
            style={{ width: "20vmax", height: "20vmax", margin: "2vmax 0",zIndex:"0" }}
            src={image}
            alt="Founder"
          />
        </div>
        <div className=" ml-5   w-[40vmax] md:text-[1.3vmax]  font-Roboto">
          <h1 className="md:text-[2vmax] text-[3vmax] font-normal ">suresh kumar</h1>
          <Button onClick={visitInstagram} color="primary">
            Visit Instagram
          </Button>
          <span>
            Hello there! I'm suresh kumar, and I've created this MERN stack
            website, E-commerce. My goal is to enhance my skills by learning new
            technologies. Building this website has been a rewarding experience
            for me, and I hope it proves beneficial for all of you as well.
            Thank you!
          </span>
          <div className="aboutSectionContainer2 flex  m-[1vmax] ml-0 text-center items-center ">
        

       <div className="flex flex-col items-start">
         
       <a className="md:text-[1vmax]  my-2   text-[tomato] text-center " href="https://instagram.com/mr.nyol_007" target="blank">instagram/@mr.nyol_007</a>
        <a className="md:text-[1vmax]    text-[#4769ff] text-center " href="https://www.linkedin.com/in/suresh-kumar-337372270/" target="blank">linkedin/suresh-kumar</a>
       </div>
      </div>
        </div>
      </div>
    
    </div>
  );
};

export default About;
