import React from 'react'
import QRCode from "react-qr-code";
 
function Attendance1() {
  return (
  <div className='background10' style={{width:"100vw" ,position:"relative",height:"100vh",display:"flex",alignItems:"center",justifyContent:"space-around"}}> {
    JSON.parse(localStorage.getItem("USER1"))?.email?.length>0 &&
  <QRCode
 
    style={{    margin:"auto" }}
   
    viewBox={`0 0 256 256`}
  
  
  value={JSON.parse(localStorage.getItem("USER1"))?.email?.split(" ")[0]} />
  }
 </div>  )
}

export default Attendance1