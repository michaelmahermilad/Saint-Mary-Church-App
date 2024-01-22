import React, { useEffect } from "react";
import classes from "./NavBar.css";
import { Link, NavLink, useParams } from "react-router-dom";
import logo1 from "./logo1.png";
 import Results from "./Results";
import Tests from "./Tests";
import Studies from "./Studies";
import Data from "./Data";
import newr from "./newr.png";
import apps from "./apps.svg";
 function NavBar() {
  let { Page } = useParams();

  return (
    <div style={{ position: "relative" }}>
      <div className="main123">
        <div className="left123">
          <img
             className="imgLeft"
          />
          <p className="NameLeft font77">
            Hi,{" "}
            {
            "Welcome"
               
            }
          </p>
        </div>
        <h4 className="ayat font77">
          وأما غايةُ الوصيةِ فهي المحبة من قلبٍ طاهرٍ، وضميرٍ صالحٍ، وإيمانٍ بلا
          رياءٍ" (1تى1: 5)
        </h4>
        <img src={logo1} className="img123" />
      </div>
      <div className="right123">
        <NavLink 
          to="/data"
          className={() => (Page == "data" ? "el123" : "el1234")}
        >
          البيانات
          <img src={apps} className="icon123" />
        </NavLink>
        <NavLink
          to="/results"
          className={(isActive) =>
            Page == "results" ? " el123 font77" : "el1234 font77"
          }
        >
          الدرجات
          <img src={apps} className="icon123" />
        </NavLink>
        <NavLink
          to="/tests"
          className={(isActive) =>
            Page == "tests" ? " el123 font77" : "el1234 font77"
          }
        >
          الامتحانات
          <img src={apps} className="icon123" />
        </NavLink>

        <NavLink
          to="/studies"
          className={(isActive) =>
            Page == "studies" ? "el123 font77" : "el1234 font77"
          }
        >
          الدراسات
          <img src={apps} className="icon123" />
        </NavLink>
      </div>
      <div className="container333">
        {Page == "results" ? (
          <Results />
        ) : Page == "tests" ? (
          <>
            {" "}
            <img
              style={{
                width: "90%",
                margin: "auto",
                marginTop: "2rem",
                display: "block",
                borderRadius: "20px",
                marginBottom: "2rem",
                boxShadow: ".3px 3px 10px grey",
              }}
              src={newr}
            />{" "}
            <Tests />{" "}
          </>
        ) : Page == "studies" ? (
          <Studies />
        ) : (
          <Data />
        )}
      </div>
    </div>
  );
}

export default NavBar;
