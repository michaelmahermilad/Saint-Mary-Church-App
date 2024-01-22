import React, { useEffect } from 'react'
import './Middle.css'
import { getDatabase, ref,set } from 'firebase/database';
 import Results from './Results';
function Middle({value,date}) {
  const email =JSON.parse(localStorage.getItem("USER1"))?.email

  function writeSheet(email,value,date) {
     const db = getDatabase();
    set(ref(db, `sheets/${date}/`+ 'Results/' + email.split("@")[0] ), {
   value
    });
  }
useEffect(()=>{
  const email =JSON.parse(localStorage.getItem("USER1"))?.email
if (date)
writeSheet(email,value,date)
},[value,date])
  return (
    <div className='Middle'> <p className='value'>{value}</p> 
    <p className='value'>
      ___________________________
    </p> 

    </div>
  )
}

export default Middle