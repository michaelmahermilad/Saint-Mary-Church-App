import React, { useEffect, useState } from 'react'
 import "./Questions.css"
import Middle from './Middle'
function Questions({questions ,length,date}) {
  let [current,setCurrent]=useState(0)


   const [arr,setArr]=useState([])
   const [result,setResult]=useState(false)
   const [total,setTotal]=useState(-5)
 useEffect(()=>{
setTotal(-5)
 },[])
    const handleChange = (e) => {
      const { name, value } = e.target;
  const a=arr
 if (value==questions[name].rightans)
     a[name]=1
     else
     a[name]=0
     setArr(a)
  
    };
  return (
    
    <div>
        {(total==-5 && questions) ? questions.map((el,i)=>{
            if(el.type=="choose")
            {
                return (<div className='maindiv44' key={i}  hidden={current!==i}>
        <div className='que_text'>{questions.length}/{i+1}  {el.question}</div>
<div className="option_list"><div className='option'>

{el.ans1}
        <input
          
          value={el.ans1}
          name={i}
          type="radio"
          onChange={e=>handleChange(e)}
        />

</div>
<div className='option'>

   {el.ans2}
        <input
        
          value={el.ans2}
          name={i}
          type="radio"
          onChange={e=>handleChange(e)}
        />

</div>
    
        <div className='option'>

   {el.ans3}
        <input
          
          value={el.ans3}
          name={i}
          type="radio"
          onChange={e=>handleChange(e)}
        />
  
</div>
<div className='option'>
   {el.ans4}
        <input
        
          value={el.ans4}
          name={i}
          type="radio"
          onChange={e=>handleChange(e)}
        />

  
</div>
    

       
      </div>      <div className="lastfooter">
   {(i==length-1)?<></>:<><button  className='boxbutton 'onClick={()=>setCurrent(++current)} >التالي</button></>} 
   {total>-1?total: <button className='boxbutton quit' onClick={()=>setTotal(arr.reduce((accumulator, currentValue) => accumulator + currentValue,
  0))}>انهاء</button> } 
                {i==0?<></>:<><button className='boxbutton ' onClick={()=>setCurrent(--current)} >السابق</button></>}

</div>

              </div>)
            }
            else {
                return (<div key={i} className='maindiv44'  hidden={current!==i}>

<div className='que_text'>{questions.length}/{i+1}  {el.question}</div>
<div className="option_list">
<div className='option'>

{el.ans1}
        <input
          
          value={el.ans1}
          name={i}
          type="radio"
          onChange={e=>handleChange(e)}
        />
  
</div>
<div className='option'>

    {el.ans2}
        <input
        
          value={el.ans2}
          name={i}
          type="radio"
          onChange={e=>handleChange(e)}
        />
  
</div>
   <div className="lastfooter">
   {(i==length-1)?<></>:<><button  className='boxbutton 'onClick={()=>setCurrent(++current)} >التالي </button></>} 
   {total>-1?total: <button className='boxbutton quit' onClick={()=>
   
   
   setTotal(arr.reduce((accumulator, currentValue) => accumulator + currentValue,
  0))}>انهاء</button> } 
                {i==0?<></>:<><button className='boxbutton ' onClick={()=>setCurrent(--current)} >السابق</button></>}

</div>
      
       
      </div>



             
                </div>)
            }
        }):<> 
        
        
        <Middle date={date} value={`  عدد الاجابات الصحيحة  ${total } من  ${ questions.length} اسئلة ` }/></>}




    </div>
  )
}

export default Questions