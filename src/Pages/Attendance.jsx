import React, { useEffect, useState } from "react";

import QrReader from "react-qr-reader";
import { NavLink } from "react-router-dom";
import { database } from "../firebase";
import yes from "./yes.webp";
import { ref, onValue, remove, set } from "firebase/database";
import { addHours, addMinutes } from "date-fns";

function Attendance() {
  const [arr, setArr] = useState([]);
  
  useEffect(() => {
    const attendanceRef = ref(database, "livelecs/");
    onValue(attendanceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrayOfObjects = Object.values(data);
        setArr(arrayOfObjects.reverse());
      } else {
        setArr([]);
      }
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      arr.forEach(item => {
        if (new Date().toISOString().split(".")[0] > item?.sort) {
          remove(ref(database, "livelecs/" + item?.sort));
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [arr]);

  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState(1);
  const [score, setScore] = useState(1);
  const [error, setError] = useState("");

  function writelecData(name, year, duration, score, Date) {
    set(ref(database, "livelecs/" + Date), {
      name,
      year,
      duration,
      score,
      sort: Date,
    });
  }

  function fun3(e) { 
     e.preventDefault();
    if(arr.length > 6){
      setError("لا يمكن اضافة محاضرة اخري في الوقت الحالي");
      return;
    }
  
    if (name.length == 0) {
      setError("لم يتم وضع عنوان للمحاضرة");
      return;
    }
    if (name.length < 4 && name.length > 0) {
      setError("العنوان قصير جدا");
      return;
    }
    if (name.length > 200) {
      setError("العنوان طويل");
      return;
    }

    if (year.trim() == 0) {
      setError("يرجي اختيار السنة");
      return;
    }

    const a = duration;
    let result = addHours(new Date(), duration);

    console.log(result?.toISOString().split(".")[0]);
    console.log(new Date()?.toISOString().split(".")[0]);
    writelecData(
      name,
      year,
      duration,
      score,
      result?.toISOString().split(".")[0]
    );
    setName("");
    setError("");
  }

  return (
    <div
      className="background10"
      style={{
        width: "100vw",
        overflow: "hidden",
        overflowY: "scroll",
        height: "100vh",
        position:"relative",
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"space-around",

      }}
    >
   <div>
      {/*<div className="myqr" style={{boxShadow:"2px 6px 60px grey"}}>
          <QrReader  
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        facingMode="environment"
  /> 
      </div>*/}
      <h3
        style={{ width: "fit-content", margin: "auto", marginTop: "2rem" }}
        className="Select7 background10"
      >
        تسجيل الدخول لمحاضرات قائمة حاليا{" "}
      </h3>   
      <div
      className="left727"
        style={{
           
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "auto",
          marginTop: "2rem",
        }}
      >
        {arr !==null &&
          arr?.length > 0 && 
          arr?.map((i, k) => {
            return (
              <>
                {new Date().toISOString().split(".")[0] < i?.sort  ? (
                  <>
                    <NavLink
                      className="Select77"
                      to={`/${i?.sort}` +`/${i?.name}`  + `/${i?.duration}`+`/${i?.score}`}
                    >
                      {i?.name}{" "}
                      <div className="outerinner">
                        {" "}
                        <div className="outer">
                          <div className="inner"></div>
                        </div>
                      </div>{" "}
                    </NavLink>
                  </>
                ) : (
                  <></>
                )}
              </>
            );
          })}
      </div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
       <h3 className="heading2" style={{color:"red" ,marginBottom:"1rem"}}>{error}</h3> 
        
        <input
          type="text"
          className="Select777"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ textAlign: "right", marginBottom: "15px" }}
          placeholder=" عنوان المحاضرة     "
        />

        <select
          className="Select777"
          defaultValue={0}
          onChange={(e) => setYear(e.target.value)}
          style={{ textAlign: "right", marginBottom: "15px" }}
        >
          <option value={0} selected disabled>
            قم بتحديد السنة
          </option>
          <option value={1}>السنة الاولي</option>
          <option value={2}>السنة التانية</option>
        </select>
        <select
          className="Select777"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ textAlign: "right", marginBottom: "15px" }}
        >
          <option value={1} selected>
            المدة:ساعة واحدة
          </option>
          <option value={2}>المدة:ساعتين</option>
          <option value={3}>المدة:ثلاث ساعات</option>
        </select>
        <select
          className="Select777"
          defaultValue={1}
          onChange={(e) => setScore(e.target.value)}
          style={{ textAlign: "right", marginBottom: "15px" }}
        >
          <option value={1} selected>
            عدد الدرجات :واحد
          </option>
          <option value={2}>عدد الدرجات :درجتين</option>
          <option value={5}>عدد الدرجات: خمس درجات</option>
          <option value={10}>عدد الدرجات :عشر درجات</option>
        </select>
        <button
          className="Select8"
          onClick={(e) => fun3(e)}
          style={{
            backgroundColor: "rgb(161 141 35 / 54%)",
            cursor: "pointer",
            boxShadow: "1px 2px 20px grey",
          }}
        >
          اضافة محاضرة
        </button>
      </form></div>
      <img
          src={yes}
          className="h07"
           
        />
    </div>
  );
}

export default Attendance;
