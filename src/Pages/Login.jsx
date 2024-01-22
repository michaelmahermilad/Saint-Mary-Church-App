import React from "react";
import MAIN from "../MAIN.jpg";
import MED from "../MED.jpeg";
import logo1 from "./logo1.png";
import beach1 from "./beach1.jpg";
import jpg1 from "./jpg1.jpg"
import "../App.css";

import { useEffect } from "react";
import { auth, provider } from "../firebase";
import Myload from "./Myload";
function Login() {
  useEffect(()=>{
    setTimeout(() => {localStorage.setItem("USER1", "user");

        if (localStorage.getItem("USER1")) {
          document.location.href = `/user/user}`;
        }
      
    }, 2000);
      },[])
  function Loginwithgoogle(e) {
    e.preventDefault();
 
    auth
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;

       
      })
      .catch((error) => {
        // ...
      });
  }

  function fun() {
    if(window.innerWidth>800){
        const img = new Image();
    img.src = MAIN;
    const img2 = new Image();
    img2.src = MED; 
   
 

    const a = document.getElementById("mycanvas");
    a.width = window.innerWidth;
    a.height = window.innerHeight;

    const ctx = a.getContext("2d");

    img.onload = function () {
      if (window.innerWidth > 1100) ctx.drawImage(img, 0, 0, a.width, a.height);
    };
    img2.onload = function () {
      if (window.innerWidth < 1100 && window.innerWidth > 800)
        ctx.drawImage(img2, 0, 0, a.width, a.height);
    };

    window.onresize = () => {
      a.width = window.innerWidth;
      if (window.innerHeight > a.height) a.height = window.innerHeight;
      if (window.innerWidth > 1100) ctx.drawImage(img, 0, 0, a.width, a.height);
      else if (window.innerWidth > 800)
        ctx.drawImage(img2, 0, 0, a.width, a.height);
    };

    setInterval(() => {
      if (window.innerWidth > 1100) ctx.drawImage(img, 0, 0, a.width, a.height);
      if (window.innerWidth < 1100 && window.innerWidth > 800)
        ctx.drawImage(img2, 0, 0, a.width, a.height);
    }, 2500); }
  }

  useEffect(() => {
    fun();
    window.onresize=()=>{
      fun();
    }
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        position: "relative",
        backgroundImage: "linear-gradient(180deg, #fefee 0%, #00a3e4 74%)",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
    
      {
        <>
          <canvas id="mycanvas" className="banner" style={{ zIndex: "0" }} />
          <img
            className="hidden"
            src={logo1}
            style={{
              width: "60vw",
              margin: "auto",
              display: "block",
              maxHeight: "37vh",
              marginTop: "1rem",
            }}
          />
          <img
            className="hidden"
            src={beach1}
            style={{
              position: "absolute",
              width: "100%",
              minHeight: "100vh",
              top: "0",
              right: "0",
              zIndex: "-1",
            }}
          /> 
       
             
           
             <Myload        />
             
              
                    
        </>
      }
       
    </div>
  );
}

export default Login;
