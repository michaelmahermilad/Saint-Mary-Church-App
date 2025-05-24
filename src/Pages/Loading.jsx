import React from 'react'
import loading from "./loading.gif"

function Loading() {
  return (
    <div 
      role="status" 
      aria-label="جاري التحميل"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        width: "100%"
      }}
    >
      <img 
        src={loading} 
        alt="جاري التحميل"
        style={{
          width: "5rem",
          height: "auto",
          margin: "7rem auto"
        }}
      />
    </div>
  )
}

export default Loading