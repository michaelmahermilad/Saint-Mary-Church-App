import React, { useState } from 'react'
import { useEffect } from 'react';
import '../App.css';  
import { AnimatePresence, motion } from 'framer-motion';
import logo1 from "./logo1.png"
import logo from "./logo.PNG"
import Mama from "./Mama.png"

import Comments from './Comments';
import * as XLSX from "xlsx";
import Questions from './Questions';

import { database } from '../firebase';
import { ref, set } from 'firebase/database';
import { Link } from 'react-router-dom';
const SheetJSFT = [
  "xlsx",
  "csv",
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }

render() {

    return (
      <form  style={{marginTop:"2rem"}} >
        <div  >
          <label htmlFor="file" className='PropertyN '  style={{marginLeft:'1rem'  }} >رفع ملفات اكسل للكويزات : يرجي معاينة الكويز وعدم ادخاله اكثر من مرة </label>
          <input
          
            type="file"
            className="  PropertyN"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
function Services() {
  const [questions, setQuestions] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [link2, setLink2] = useState("");
  const [error, setError] = useState("");
  const [Links, setLinks] = useState([]);
  const [task, setTask] = useState(false);
  const [Year, SetYear] = useState("السنة الاولي");
  const [isVisible, setIsvisible] = useState(false);
  const [show, setShow] = useState(false);

  const writeUserData = async (title, link, link2, Year, Date) => {
    try {
      await set(ref(database, 'lectures/' + Date), {
        title,
        link,
        link2,
        Year,
        sort: Date
      });
      return true;
    } catch (err) {
      console.error("Error writing lecture data:", err);
      setError("حدث خطأ أثناء حفظ المحاضرة");
      return false;
    }
  };

  const writeSheet = async (Sheet, date, Year) => {
    try {
      await set(ref(database, 'sheets/' + date), {
        Sheet,
        sort: date,
        Year
      });
      return true;
    } catch (err) {
      console.error("Error writing sheet data:", err);
      setError("حدث خطأ أثناء حفظ الكويز");
      return false;
    }
  };

  const handleFile = async (file) => {
    if (!file) return;
    
    setQuestions(null);
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = async (e) => {
      try {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        let arr;
        let obj;
        let final = [];
        let Year = 0;

        data.forEach((el, i) => {
          if (i === 0) {
            arr = el.map(e => e.toString().trim().toLowerCase());
          }
        });

        data.forEach((element, i) => {
          Year = element[0];
          if (i !== 0) {
            element.forEach((element, i) => {
              let e = element.toString()?.toLowerCase()?.trim();
              obj = { ...obj, [arr[i]]: e };
            });
            final.push(obj);
          }
          element.forEach((element, i) => {
            obj = { ...obj, [arr[i]]: "" };
          });
        });

        const success = await writeSheet(final, new Date().toISOString().split(".")[0], Year);
        if (success) {
          setQuestions(final);
          setTask(true);
        }
      } catch (err) {
        console.error("Error processing file:", err);
        setError("حدث خطأ أثناء معالجة الملف");
      }
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  const fun3 = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError("لم يتم وضع عنوان للمحاضرة");
      return;
    }

    if (title.length < 4) {
      setError("العنوان قصير جدا");
      return;
    }

    if (link.trim() && !matchYoutubeUrl(link.trim()) && !getSoundCloudInfo(link.trim())) {
      setError("لم يتم ادخال رابط يوتيوب او ساوند كلاود بشكل صحيح");
      return;
    }

    if (!link.trim().startsWith("https") && link.trim()) {
      setError("الرابط ليس كاملا");
      return;
    }

    if (!link.trim() && !link2.trim()) {
      setError("لم يتم ادخال اي رابط");
      return;
    }

    if (link2.trim() && !link2.trim().includes("https://drive.google.com")) {
      setError("يرجي التأكد من ادخال رابط جوجل درايف بشكل صحيح");
      return;
    }

    const success = await writeUserData(
      title,
      link,
      link2,
      Year,
      new Date().toISOString().split(".")[0]
    );

    if (success) {
      setTitle("");
      setLink("");
      setLink2("");
      setError("");
    }
  };

  const make_cols = refstr => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };
  function exportFile() {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
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
  const img = new Image(); // Create new img element  
  img.src = Mama; // Set source path

  function fun() {
    
    const a = document.getElementById("mycanvas");


    a.width = window.innerWidth
    a.height = window.innerHeight

    const ctx = a.getContext("2d");

   
 


  }



  useEffect(() => {

    fun()
 





  }, [])
 

  return (<><>
    <div   className='Main' style={{ position:"relative", backgroundColor: "#f5f5f5",borderTop:"4px solid rgb(244 231 198)", width: "100vw",overflowX:"hidden"  }}>
      <Link  className='mylink7' to="/attendance">تسجيل الحضور</Link>
      <div style={{ zIndex: "10", position: "relative", height: "4rem", backgroundColor: "#f5f5f5", width: "100vw", margin: "auto", top: "0rem",   borderBottom: "1px solid #e3e2e7", marginLeft: "auto", }}>
      <h5 className='writingtop'>
            خدام اسرة البابا كيرلس عمود الدين لاعداد الخدام </h5>

        <AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: -40, y: 40 }}
            animate={{ opacity: 1, x: 60, y:40 }}
            transition={{ duration: 1.4 }}
          ><img src={logo} style={{ width: "19rem", borderRadius: "30px", boxShadow: ".7px .4px 20px 40px #f5f5f5", borderTopLeftRadius: "0", backgroundColor: "#f5f5f5" }} /></motion.div>

        </AnimatePresence>
      </div>
      <div style={{ position: "relative", height: "11rem",display:"flex",flexDirection:"row-reverse", alignItems:"center", backgroundColor: "white", width: "100vw", margin: "auto", top: "0rem", borderBottom: "1px solid #e3e2e7" }}>
       <img src={logo1} className='logoright'/>
       <h3 className='big'>(1 بط 1: 22) فَأَحِبُّوا بَعْضُكُمْ بَعْضًا مِنْ قَلْبٍ طَاهِرٍ بِشِدَّةٍ</h3>
      </div>
      <div className="main7" >
        <canvas id="mycanvas" className='banner' style={{ width: "100%", height: "100vh"}} />


        <div className="container " style={{marginBottom:"2rem"}}>
       
          <div className="social-buttons"  >
            <h4 className='PropertyN font77'  >
               يمكنك اضافة روابط محاضرات ساوند كلاود او يتيوب  </h4>

            <span onClick={(e) => setIsvisible(true)}   className="social-margin">
              <div className="social-icon youtube">
                <i className="fa fa-youtube" aria-hidden="true"></i>
              </div>
            </span>

            <span    className="social-margin">
              <div className="social-icon soundcloud">
                <i className="fa fa-soundcloud" aria-hidden="true"></i>
              </div>
            </span>
           
            <button onClick={(e) => setShow(!show)}   className="PropertyN social-margin">
              <h3  > </h3>
            </button>
          </div>
          {
            <>
              <div style={{marginBottom:"4rem"}}>
                <form action="form7">
                  <div className='divform'>
                    <label className='PropertyN font77'> عنوان الخدمة : </label> <input  value={title}className='input2' onChange={(e) => {
                      setTitle(e.target.value)
                    }} /></div>
                  <div className='divform'><label className='PropertyN'> الرابط (اختياري): </label> <input value={link} onChange={(e) => {
                    setLink(e.target.value)
                  }} className='input2 font77' /></div>
                   <div className='divform'><label className='PropertyN'>  رابط ملف Google Drive : </label> <input value={link2} onChange={(e) => {
                    setLink2(e.target.value)
                  }} className='input2 font77' /></div>
                
                   <select className='PropertyNw font77' onChange={(e) => {
                    SetYear(e.target.value)} } placeholder='يمكنك اضافة تعليق او اقتراح او تسجيل حضور ' value={Year}    style={{marginBottom:"1rem",outline:'none',border:"1px solid #e3e2e7"}}> <option>السنة الاولي</option> <option>السنة الثانية</option></select>

                  <button className="button1 font77" onClick={(e) => fun3(e)} >
                    اضافة
                  </button>
                 
                  <label  style={{color:"red"}}   className='PropertyN font77'>  {error} </label> 
                </form>

              </div>
 

            </>

          }
      
      <div> {task?<> {questions?.length>0 &&< Questions questions={questions} length={questions?.length}/> } </>: <DataInput handleFile={handleFile} />} 
       
          </div>
       
          <div >
     
          </div> 
              
        </div>
        <div className='CommentsSection'>

            <Comments/>
            <div> {/*<> <DataInput  handleFile={handleFile} />
           {questions?.length>0 &&< Questions questions={questions} length={questions?.length}/> }</>*/} 
          </div>
          </div>
 </div>  <div  className="containerdown"   >
           <iframe className="containerdowninside"   src="https://www.youtube.com/embed/2hYubSCv5Gs" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>       
             <iframe className="containerdowninside" src="https://www.youtube.com/embed/F2waMGnkAFo" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
             <iframe className="containerdowninside" src="https://www.youtube.com/embed/s0da9g43i2k" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
             <iframe className="containerdowninside"  src="https://www.youtube.com/embed/2Y2nj3tQMQg" title="YouTube video player"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
            <iframe className="containerdowninside"  src="https://www.youtube.com/embed/KvAn6tFgvM8" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
           <iframe className="containerdowninside" src="https://www.youtube.com/embed/jzXbmgrHwZM" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
        </div>
 
    </div>





  </>  </>
  )
}

export default Services