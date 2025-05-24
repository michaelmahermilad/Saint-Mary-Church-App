import React, { useEffect, useState } from 'react'
import '../App.css';
import { database } from '../firebase';
import { ref, set } from 'firebase/database';

function Comments() {
  const [Comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [Year, setYear] = useState("السنة الاولي اعداد خدام");

  const WriteComm = async (Year, Comment, Date) => {
    try {
      await set(ref(database, 'Comms/' + Date), {
        Year,
        Comment,
        sort: Date
      });
      return true;
    } catch (err) {
      console.error("Error writing comment:", err);
      setError("حدث خطأ أثناء حفظ التعليق");
      return false;
    }
  };

  const funComment = async (e) => {
    e.preventDefault();
    setError("");

    if (!Comment.trim()) {
      setError("لم يتم اضافة تعليق");
      return;
    }

    if (Comment.length < 8) {
      setError("التعليق قصير جدا");
      return;
    }

    const success = await WriteComm(Year, Comment, new Date().toISOString().split(".")[0]);
    
    if (success) {
      setComment("");
      setError("");
    }
  };

  return (
    <div style={{width:'100%'}}>
      <form onSubmit={funComment}>
        <h4 className='PropertyN' style={{marginBottom:"1rem"}}>
          ملاحظات الخدام للمخدومين:
        </h4>
        <div className='divformadjust'>
          <select
            value={Year}
            onChange={(e) => setYear(e.target.value)}
            className='PropertyNw'
            style={{marginBottom:"1rem",outline:'none',border:"1px solid #e3e2e7"}}
          >
            <option>السنة الاولي اعداد خدام</option>
            <option>السنة الثانية اعداد خدام</option>
          </select>
        </div>
        <div className='divformadjust'>
          <textarea
            placeholder='يمكنك اضافة تعليق او ملاحظة او تنبيه'
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            className='input2adjust'
          />
        </div>
        <button
          type="submit"
          className="button1adjust HOVER"
          style={{display:"inline"}}
        >
          ارسال
        </button>
        {error && (
          <div
            className='PropertyNadjust'
            style={{
              display:"inline",
              direction: "rtl",
              marginRight: "1rem",
              fontSize: "15px",
              color: "#ff3a00",
              fontWeight: "400"
            }}
          >
            {error}
          </div>
        )}
      </form>

      {/*Comments.map((i, k) => {
                    return (
                      <>

 


<div>
                          <h3 className='PropertyNadjust2'>
                            <img src={photo} style={{height:"3rem",marginBottom:"-.7rem",marginRight:"-.6rem",marginLeft:"1rem"}} />
                            
                            
                            {i.Comment} </h3></div>
                      </>
                    )
                  })*/}

    </div>
  );
}

export default Comments;