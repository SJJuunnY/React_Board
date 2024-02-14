import React from 'react'
import axios from 'axios';
export default function comment({elem,onDelete}) {
    console.log(elem._id)
  return (
    <div style={{display:"flex"}}>
        <div>
            <div>{elem.content}</div>
            <div>{elem.author}</div>
        </div>
        <button onClick={(e)=>{
            onDelete(elem._id);
        }}>x</button>
    </div>
  )
}
