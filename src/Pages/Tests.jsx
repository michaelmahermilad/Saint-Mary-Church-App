import React, { useEffect, useState } from 'react'
import Questions from './Questions'
import { getDatabase, ref, onValue,orderByChild, query,equalTo} from "firebase/database";
import Loading from './Loading';
 
function Tests() {

  const [questions,setQuestions]=useState([])
  const [Year,SetYear]=useState("0")
  const [date,setDate]=useState("")
  useEffect(()=>{

   
 
if(Year=="One"){
  setQuestions([])
  const db = getDatabase();
   let a =   query( ref(db, 'sheets/'),orderByChild("Year") ,equalTo(1))
   

    onValue(a, (snapshot) => {
      const data2 = snapshot.val();
  if (data2!==null){
    const arrayOfObjects = Object.values(data2);

 const SHEET=(arrayOfObjects[arrayOfObjects?.length-1])?.Sheet
 const date1=(arrayOfObjects[arrayOfObjects?.length-1])?.sort
 setDate(date1)

       setQuestions(SHEET)
    
    }else{
      setQuestions([])
    }
     
      });}
    else if (Year=="Two"){
      setQuestions([])

      const db = getDatabase();
      let b =   query( ref(db, 'sheets/'),orderByChild("Year") ,equalTo(2))
  
 
       onValue(b, (snapshot) => {
        const data2 = snapshot.val();
    if (data2!==null){
      const arrayOfObjects = Object.values(data2);

   const SHEET=(arrayOfObjects[arrayOfObjects?.length-1])?.Sheet
   const date1=(arrayOfObjects[arrayOfObjects?.length-1])?.sort
         setQuestions(SHEET)
         setDate(date1)
      
      }else{
        setQuestions([])
        
      }
       
        });}
 
    
   
  


  },[Year])
  return (
    <div>
   {Year=="0"? <select style={{marginTop:'2rem'}} className="Select777"  onChange={(e)=>SetYear(e.target.value)}>
   <option  value={"0"} selected> من فضللك قم باختيار السنة </option>
  <option value={"One"} > السنة الاولي</option>
  <option value={"Two"}> السنة التانية</option>
</select>:<></>  } 
      {questions?.length>0?
      
      
      
      
      date!==undefined && Year!=="0"&& < Questions  date={date} questions={questions} length={questions?.length}/>:Year!=="0"?<> <Loading/></>:<></> } </div>
  )
}

export default Tests