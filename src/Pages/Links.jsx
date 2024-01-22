import React from 'react'
import styled from 'styled-components'
import {FcShare, FcExpand} from 'react-icons/fc'
 
function Links() {
  return (
<Wrapper>
<div style={{height:"2rem"}}>
</div>
<Button>
الابحاث الخاصة بي
<TomatoButton1 size={".9rem"} className='icon7'/>
</Button>
<Button>
اضافة بحث
<TomatoButton size={"1rem"} className='icon7'/>
</Button>
 
</Wrapper>
  )
}
const Wrapper=styled.div`
 

`
const Button=styled.button`
color: #b6a075;
  display: inline-flex;
 align-items: center;
  padding: 0.25em 1em;
  border: 1px solid #c6beab;
  border-radius: 3px;
  font-family: 'Harmattan', sans-serif;
 
font-weight: 900;
font-size: .97rem;
margin-left:1rem;
background-color: transparent;
&:hover{
  background-color: #fffdfa;
  cursor: pointer;
}

@media screen  and (max-width:700px ){
 
    font-size: 14px;
  
    
 
}
  
`
const TomatoButton = styled(FcShare)`
margin-right: 1rem;
height: 100%;
`;
const TomatoButton1 = styled(FcExpand)`
margin-right: 1rem;
height: 100%;
`;
 
export default Links