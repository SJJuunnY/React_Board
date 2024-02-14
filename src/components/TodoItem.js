import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TodoItem({todo, remove, update}) {
    const [mode, setMode] = useState('normal')
    
    const [inputText, setInputText] = useState('');
    useEffect(()=>{
        setInputText(todo.title)
    }, [todo])
    
    return (
    <li style={{backgroundColor: todo.color}}>
        <div>
            {mode==='update' ? 
                <input value={inputText} type="text" onChange={e=>{setInputText(e.target.value)}}/>:
             mode==='normal' ? 
            <Link to={"/contents/"+todo.id} ><div>제목 : {inputText}</div>
                <div>내용 : {todo.content}</div>-
            </Link>: null}
        </div>
        
        <div onClick={async (e)=>{
            // 삭제되는 코드
            remove()
            await axios.delete('http://127.0.0.1:3000/authboard/'+todo.id);
        }} style={{cursor: 'pointer',backgroundColor:"purple"}}>
            삭제
        </div>

        <div onClick={async (e)=>{
            if (mode ==='normal'){
                setMode('update');
            } else{ 
                await axios.put('http://127.0.0.1:3000/authboard/'+todo.id ,{ "title" : inputText});
                setMode('normal');
            }
        }}style={{backgroundColor : "gray"}}>
            수정
        </div>
    </li>
  )
}