import React, { useEffect } from "react";
import "../App.css";
import NavBar from "./NavBar";
import beach from "./beach.jpg";
import { Link } from "react-router-dom";

function User() {
  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <div
        style={{ position: "absolute", width: "100vw", overflowX: "hidden" }}
      >     
       <Link className='mylink7' to={`/user/user/QR`}>
       تسجيل الحضور</Link>
        <div
          className="hei"
          style={{
            position: "relative",
            width: "100VW",
            clipPath: "ellipse(86% 60% at 48% 10%)",
            width: "100vw",
            overflowX: "hidden",
          }}
        >

          <img className="background" src={beach} />
        </div>
      </div>
      <NavBar />
      <div className="containerdown">
        <iframe
          className="containerdowninside"
          src="https://www.youtube.com/embed/2hYubSCv5Gs"
          title="YouTube video player"
         
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         
        ></iframe>
        <iframe
          className="containerdowninside"
          src="https://www.youtube.com/embed/F2waMGnkAFo"
          title="YouTube video player"
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
        ></iframe>
        <iframe
          className="containerdowninside"
          src="https://www.youtube.com/embed/s0da9g43i2k"
          title="YouTube video player"
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
     
        ></iframe>
        <iframe
          className="containerdowninside"
          src="https://www.youtube.com/embed/2Y2nj3tQMQg"
          title="YouTube video player"
          
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          
        ></iframe>
        <iframe
          className="containerdowninside"
          src="https://www.youtube.com/embed/KvAn6tFgvM8"
          title="YouTube video player"
         
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
        ></iframe>
        <iframe
          className="containerdowninside"
          src="https://www.youtube.com/embed/jzXbmgrHwZM"
         
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
         
        ></iframe>
      </div>
    </div>
  );
}

export default User;
