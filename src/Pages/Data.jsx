import React, { useEffect, useState } from 'react'
import "./Data.css"
import "../App.css"
import { database } from '../firebase'
import { ref, set, get } from 'firebase/database'
import Links from './Links'

function Data() { 
   const [state, setState] = useState({
     Name: "",
     address: "",
     tel: "",
     birthdate: "",
     GoogleName: "name",
     Gmail: "email"
   });
   const [error, setError] = useState("");
   const [disabled, setDisabled] = useState(false);
   const [data2, setData2] = useState({});

   const writeSheet = async (userData) => {
     try {
       const userId = userData?.Gmail?.split("@")[0];
       if (!userId) {
         throw new Error("Invalid email address");
       }
       
       await set(ref(database, `Elma7domen/${userId}/data/`), userData);
       return true;
     } catch (err) {
       console.error("Error saving user data:", err);
       setError("حدث خطأ أثناء حفظ البيانات");
       return false;
     }
   };

   const handleChange = (e) => {
     const { name, value } = e.target;
     setState(prev => ({
       ...prev,
       [name]: value
     }));
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");

     if (!state.tel || !state.Name) {
       setError("من فضلك قم بادخال البيانات الغير اختيارية");
       return;
     }

     if (!state.Gmail) {
       setError("يرجى تسجيل الدخول أولاً");
       return;
     }

     const success = await writeSheet(state);
     if (success) {
       setDisabled(true);
       setError("");
     }
   };

   return (
     <div>
      
       <div className="container8">  




     <form id="contact" onSubmit={handleSubmit} >
       <h3 className="font77">البيانات </h3>
        
       <fieldset>
         <input  className="font77" name='Name'  onChange={handleChange} placeholder={` الاسم   ${(data2?.Name)?(data2?.Name):""}` } type="text" tabindex="1" required autofocus/>
       </fieldset>
       <fieldset>
         <input className="font77" name="address" onChange={handleChange} placeholder={ ` العنوان  ( اختياري )   ${(data2?.address)?(data2?.address):""}`} type="text" tabindex="2" />
       </fieldset>
       <fieldset>
         <input className="font77"  name="tel" onChange={handleChange}  placeholder={` التليفون   ${(data2?.tel)? (data2?.tel):""}`} type="number" tabindex="3" required/>
       </fieldset>
       <fieldset>
         <input className="font77"  name="birthdate"onChange={handleChange} placeholder={` تاريخ الميلاد   ( اختياري )    ${(data2?.birthdate)?data2?.birthdate:""}`} type="text" tabindex="4" />
       </fieldset>
       <fieldset>
        
       </fieldset>
       <fieldset>
         <button className="font77" type="submit"  disabled={disabled}  id="contact-submit" style={{backgroundColor:disabled?"grey":undefined, cursor:disabled?"not-allowed":"pointer"}}>{disabled?"تم ارسال البيانات ":"ارسال او تعديل البيانات "}</button>
       </fieldset>

       {error && (
         <div style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
           {error}
         </div>
       )}
      </form>
    </div>
    
    
    
    </div>
    )
}

export default Data