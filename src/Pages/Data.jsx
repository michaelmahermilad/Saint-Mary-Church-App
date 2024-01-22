import React, { useEffect, useState } from 'react'
import "./Data.css"
import "../App.css"
import { getDatabase, onValue, ref, set } from 'firebase/database'
import Links from './Links'
function Data() { 
   const displayName= "name"
const email =" email"
const [state,setState]=useState({GoogleName:"name" ,Gmail: "email"})
const [error,setError]=useState("")
const [disabled,setDisabled]=useState(false)
const [send,setSend]=useState("true")
const [data2,setData2]=useState({})
 useEffect(()=>{

  
    
  
  
    },[])




function writeSheet(state) {

  
    const db = getDatabase();
    set(ref(db, 'Elma7domen/' + state?.Gmail?.split("@")[0] +"/data/"), state);
  }
function handlechange(e){
  e.preventDefault();

setState({...state ,[e.target.name]: e.target.value})

  
}
function handleSubmit(e){
  e.preventDefault();
if(state.tel=="" || state.name==""  )

{
  
 setError("من فضلك قم بادحال البيانات الغير اختيارية")
return 
}

if(state?.Gmail )
{


  writeSheet(state)
  setDisabled(true)

}


}

  return (
    <div>
     <Links/> 
      <div class="container8">  




    <form id="contact" action=""  onSubmit={e=>handleSubmit(e)} >
      <h3 className="font77">البيانات </h3>
       
      <fieldset>
        <input  className="font77" name='Name'  onChange={e=>handlechange(e)} placeholder={` الاسم   ${(data2?.Name)?(data2?.Name):""}` } type="text" tabindex="1" required autofocus/>
      </fieldset>
      <fieldset>
        <input className="font77" name="address" onChange={e=>handlechange(e)} placeholder={ ` العنوان  ( اختياري )   ${(data2?.address)?(data2?.address):""}`} type="text" tabindex="2" />
      </fieldset>
      <fieldset>
        <input className="font77"  name="tel" onChange={e=>handlechange(e)}  placeholder={` التليفون   ${(data2?.tel)? (data2?.tel):""}`} type="number" tabindex="3" required/>
      </fieldset>
      <fieldset>
        <input className="font77"  name="birthdate"onChange={e=>handlechange(e)} placeholder={` تاريخ الميلاد   ( اختياري )    ${(data2?.birthdate)?data2?.birthdate:""}`} type="text" tabindex="4" />
      </fieldset>
      <fieldset>
       
      </fieldset>
      <fieldset>
        <button className="font77" name="submit"  disabled={disabled}  type="submit" id="contact-submit" style={{backgroundColor:disabled?"grey":undefined}} data-submit="...Sending">{disabled?"تم ارسال البيانات ":"ارسال او تعديل البيانات "}</button>
      </fieldset>
     </form>
  </div></div>
  )
}

export default Data