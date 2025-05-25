import React, { useEffect, useState } from 'react'
import img1 from '../assets/i5.jpg';
import img2 from '../assets/i8.jpg';
import img3 from '../assets/h.jpg';

const Background = ({count,setCount}) => {
      

      useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prev)=>prev===2?0:prev+1);
        },3000)

        return()=>clearInterval(interval);
      },[]) 
    
      
 if(count===0)
{
    return <img src={img1}></img>
}
else if(count===1)
{
    return <img src={img3}></img>
}
else if(count===2)
{
    return <img src={img2}></img>
}
}

export default Background