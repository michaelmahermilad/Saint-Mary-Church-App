import React, { useEffect, useState } from "react";
import "./StudiesRows.css";
import Row from "./Row";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  query,
   limitToLast,
} from "firebase/database";
import Comment from "./Comment";
 import Middle from "./Middle";
import Loading from "./Loading";

function Studies() {
  let [Year, SetYear] = useState("One");
  let [loop, setLoop] = useState([]);
  let [Comments, setComments] = useState([]);
  function getSoundCloudInfo(url) {
    var regexp = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/;
    return url.match(regexp) && url.match(regexp)[2];
  }
  function matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)[1];
    }
    return false;
  }

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = query(
      ref(db, "lectures/"),
      orderByChild("sort"),
      limitToLast(15)
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== undefined) {
        const arrayOfObjects = Object.values(data);

        setLoop(arrayOfObjects.reverse());
      }
    });

    const a = query(ref(db, "Comms/"), orderByChild("sort"), limitToLast(15));
    onValue(a, (snapshot) => {
      const data2 = snapshot.val();
      if (data2 !== undefined) {
        const arrayOfObjects = Object.values(data2);
        const r = arrayOfObjects.reverse();
        setComments(r);
      }
    });
  }, [Year]);
  return (
    <div className="MAINCONTENT">
      <div style={{ minWidth: "17rem" }}>
        {loop?.length > 0 ? (
          <>
            <select
              className="Select777"
              onChange={(e) => SetYear(e.target.value)}
            >
              <option value={"One"} selected>
                {" "}
                السنة الاولي
              </option>
              <option value={"Two"}> السنة التانية</option>
            </select>

            {Year &&
              loop?.map((i ,K) => {
                if (
                  i?.Year == "السنة الثانية" &&
                  Year == "Two" &&
                  i.title !== "" &&
                  (i?.link !== "" || i?.link2 !== "")
                ) {
                  return ( 
                    <Row    key={K}
                      Title={i?.title}
                      Youtube={
                        i?.link && matchYoutubeUrl(i?.link) ? i?.link : null
                      }
                      Soundcloud={getSoundCloudInfo(i?.link) ? i?.link : null}
                      PDF={i?.link2 == "" ? null : i.link2}
                    />
                  );
                } else if (
                  i?.Year == "السنة الاولي" &&
                  Year == "One" &&
                  i.title !== "" &&
                  (i?.link !== "" || i?.link2 !== "")
                ) {
                  return (
                    <Row  key={K}
                      Title={i?.title}
                      Youtube={
                        i?.link && matchYoutubeUrl(i?.link) ? i?.link : null
                      }
                      Soundcloud={getSoundCloudInfo(i?.link) ? i?.link : null}
                      PDF={i?.link2 == "" ? null : i?.link2}
                    />
                  );
                } else {
                  return <></>;
                }
              })}
          </>
        ) : (
          <>
            {" "}
            <Loading  />
          </>
        )}
      </div>
      <div style={{ paddingTop: "2rem" ,minWidth:"40%"}}>


      <iframe
            style={{ minHeight:"20rem",width:"100%",borderRadius:"10px" ,margin:"auto" ,maxHeight:"40vh",backgroundColor:"rgba(244, 243, 240, 0.867)"}}
              src="https://www.youtube.com/embed/s0da9g43i2k"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>

        {/*Comments?.length > 0 ? (
          Comments?.map((i) => {
            if (i?.Year == "السنة الاولي اعداد خدام" && Year == "One") {
              return (
                <>
                  <Comment Comment={i?.Comment} />
                </>
              );
            } else if (i?.Year == "السنة الثانية اعداد خدام" && Year == "Two") {
              return (
                <>
                  <Comment Comment={i?.Comment} />
                </>
              );
            } else {
            }
          })
        ) : (
          <>
             <Loading />
          </>
        )*/}
      </div>
    </div>
  );
}

export default Studies;
