import React from 'react'
import QRCode from "react-qr-code";
 
function Attendance1() {
  return (
  <div className='background10' style={{width:"100vw" ,position:"relative",height:"100vh",display:"flex",alignItems:"center",justifyContent:"space-around"}}> {
    
  <QRCode
 
    style={{    margin:"auto" }}
   
    viewBox={`0 0 256 256`}
  
  
  value={"user"} />
  }
 </div>  )
}

export default Attendance1