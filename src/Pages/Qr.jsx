import { child, get, getDatabase, onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useParams } from "react-router-dom";
import yes from "./yes.webp";

function Qr() {
  const db = getDatabase();
  const a = useParams();
  const [date, setDate] = useState();
  const [duration, setDuration] = useState();
  const [name, setName] = useState();
  const [remain, setRemain] = useState("Calculating...");
  const [score, setScore] = useState();
  const [result, setResult] = useState("No result");
  useEffect(() => {
    if (new Date().toISOString().split(".")[0] > date) {

     window.location.href="/"

    }
    let time = date?.split("T")[1];
    console.log(time);
    setInterval(() => {
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
    }, 40000);
  }, [date]);
  useEffect(() => {
    console.log(a);
    setDate(a?.date);
    setName(a?.name);
    setDuration(a?.duration);
    setScore(a?.score);
  }, a);

  let handleScan = (data) => {
    if (data) {
      console.log(name);
      if (
        name !== undefined &&
        duration !== undefined &&
        date !== undefined &&
        score !== undefined
      ) {
        if (
          name !== null &&
          duration !== null &&
          date !== null &&
          score !== null
        ) {
          const db = getDatabase();
          let ID = date + "<>" + name + "<>" + data.split("@")[0];
          onValue(
            ref(db, "Elma7domen/" + data.split("@")[0] + "/attendance/" + ID),
            (snapshot) => {
              const values = snapshot.val();
              function writeUserData(date, name, duration, result, score) {
                const db = getDatabase();
                console.log(values);
                set(
                  ref(
                    db,
                    "Elma7domen/" + data.split("@")[0] + "/attendance/" + ID
                  ),
                  {
                    date,
                    name,
                    duration,
                    result,
                    score,
                    ID,
                  }
                );
              }

              if (values == null) {
                writeUserData(date, name, duration, data, score);

                const dbRef = ref(getDatabase());
                get(
                  child(
                    dbRef,
                    "Elma7domen/" + data.split("@")[0] + "/attendance/score"
                  )
                )
                  .then((snapshot) => {
                    if (snapshot.exists()) {
                      let newfinal =
                        Number(snapshot.val()?.final) + Number(score);
                      set(
                        ref(
                          db,
                          "Elma7domen/" +
                            data?.split("@")[0] +
                            "/attendance/score"
                        ),
                        {
                          final: newfinal,
                        }
                      );
                    } else {
                      console.log("No data available");
                      set(
                        ref(
                          db,
                          "Elma7domen/" +
                            data?.split("@")[0] +
                            "/attendance/score"
                        ),
                        {
                          final: score,
                        }
                      );
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                    setResult("من فضلك انتظر");
                  });
              } else {
                setTimeout(() => {
                  setResult("شكرا لك");
                }, 2000);
              }
            }
          );
          setResult(data);
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        }
      } else {
        setResult("من فضلك انتظر");
      }
    }
  };

  let handleError = (err) => {
    // alert(err);
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
      {(new Date().toISOString().split(".")[0] < date && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <h3 className="Select7 background10">{name} </h3>
            <h4 className="Select7 " style={{ marginTop: "2rem" }}>
              {remain}
            </h4>
            <h3 className="heading2444" style={{ marginTop: "3rem" }}>
              {result}{" "}
            </h3>
            <img style={{ marginTop: "3rem" }} src={yes} className="h07" />
          </div>
          {result == "No result" && (
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
      )) || <>lecture ended</>}
    </div>
  );
}

export default Qr;
