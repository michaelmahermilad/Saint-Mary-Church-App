import React from 'react'
import "./StudiesRows.css"
import "../App.css"
import { Link } from 'react-router-dom'
import Youtubeimg from "./Youtubeimg.png"
import Soundcloudimg from "./Soundcloudimg.png"
import PDFimg from  "./PDFimg.png"
function Row({Title,Youtube,Soundcloud,PDF}) {
  return (
    <div className='row123'>
        <div className="title1234 font77">
        {Title}
        </div>
        <div className="icons">
{
    Youtube!==null?<Link target='_blank'  className="iconlink" to={Youtube}>
    <img src={Youtubeimg} alt="" className='Youtubeimg'  />
    
    </Link>:<></>
}
{
    Soundcloud!==null?<Link  target='_blank'  className="iconlink" to={Soundcloud}>
    <img src={Soundcloudimg} alt="" className='Soundcloudimg'/>
    
    </Link>:<></>
}
{
    PDF!==null?<Link  target='_blank'  className="iconlink"  to={PDF}>
    <img src={PDFimg} alt=""  className='PDFimg'/>
    
    </Link>:<></>
}
        </div>

    </div>
  )
}

export default Row