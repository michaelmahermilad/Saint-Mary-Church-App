import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useParams, useNavigate } from "react-router-dom";
import { database } from "../firebase";
import { ref, onValue, set, get, child } from "firebase/database";
import yes from "./yes.webp";

function Qr() {
  const { date, name, duration, score } = useParams();
  const navigate = useNavigate();
  const [remain, setRemain] = useState("Calculating...");
  const [result, setResult] = useState("No result");
  const [error, setError] = useState("");

  useEffect(() => {
    if (new Date().toISOString().split(".")[0] > date) {
      navigate("/");
      return;
    }

    const calculateRemainingTime = () => {
      try {
        let time = date?.split("T")[1];
        let hours = time?.split(":")[0];
        let minutes = time?.split(":")[1];
        let timenowinminutes = Number(hours) * 60 + Number(minutes);
        let datenow = new Date().toISOString();
        let timenow = datenow?.split("T")[1];
        let hoursnow = timenow?.split(":")[0];
        let miuutesnow = timenow?.split(":")[1];
        let nowinmiuntes = Number(hoursnow) * 60 + Number(miuutesnow);
        let miutesremaining = Number(timenowinminutes) - Number(nowinmiuntes);
        let hoursremaining = 0;
        let valueofhours = parseInt(miutesremaining / 60);
        
        if (valueofhours >= 1) {
          miutesremaining = miutesremaining - valueofhours * 60;
          hoursremaining = valueofhours;
        }
        
        setRemain(`${hoursremaining} H:${miutesremaining} M Left`);
      } catch (err) {
        console.error("Error calculating time:", err);
        setRemain("Time calculation error");
      }
    };

    calculateRemainingTime();
    const interval = setInterval(calculateRemainingTime, 40000);

    return () => clearInterval(interval);
  }, [date, navigate]);

  const handleScan = async (data) => {
    if (!data) return;

    try {
      if (!name || !duration || !date || !score) {
        setError("Missing required parameters");
        return;
      }

      const userId = data.split("@")[0];
      const ID = `${date}<>${name}<>${userId}`;
      const attendanceRef = ref(database, `Elma7domen/${userId}/attendance/${ID}`);
      
      const snapshot = await get(attendanceRef);
      
      if (!snapshot.exists()) {
        await set(attendanceRef, {
          date,
          name,
          duration,
          result: data,
          score,
          ID,
        });

        const scoreRef = ref(database, `Elma7domen/${userId}/attendance/score`);
        const scoreSnapshot = await get(scoreRef);
        
        if (scoreSnapshot.exists()) {
          const newfinal = Number(scoreSnapshot.val()?.final || 0) + Number(score);
          await set(scoreRef, { final: newfinal });
        } else {
          await set(scoreRef, { final: score });
        }
        
        setResult("تم تسجيل الحضور بنجاح");
      } else {
        setResult("تم تسجيل الحضور مسبقاً");
      }
    } catch (err) {
      console.error("Error handling scan:", err);
      setError("حدث خطأ أثناء تسجيل الحضور");
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner error:", err);
    setError("خطأ في الماسح الضوئي");
  };

  return (
    <div
      className="background10"
      style={{
        width: "100vw",
        overflow: "hidden",
        overflowY: "scroll",
        height: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {new Date().toISOString().split(".")[0] < date ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <h3 className="Select7 background10">{name}</h3>
            <h4 className="Select7" style={{ marginTop: "2rem" }}>
              {remain}
            </h4>
            <h3 className="heading2444" style={{ marginTop: "3rem" }}>
              {error || result}
            </h3>
            <img style={{ marginTop: "3rem" }} src={yes} className="h07" alt="Success" />
          </div>
          {result === "No result" && (
            <div>
              <div
                style={{
                  boxShadow: ".2px 3px 10px 2px grey",
                  borderRadius: "17px",
                  overflow: "hidden",
                }}
              >
                <QrReader
                  className="h07"
                  delay={2000}
                  onError={handleError}
                  onScan={handleScan}
                  facingMode="environment"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div>انتهت المحاضرة</div>
      )}
    </div>
  );
}

export default Qr;
