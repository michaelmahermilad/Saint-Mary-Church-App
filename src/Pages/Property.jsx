import React from 'react'
import '../App.css';

function Property(props) {
  return (
    <div className='Property'>
        <h4 className='PropertyN'>{props.Name}</h4>
        
        <h5 className='PropertyV'>{props.Value}</h5>
        
    </div>
  )
}

export default Property