import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todoList, onDelete}) {
  return (
    <div style={{width : "400px"}}>
        <h3>게시글</h3>
        <ul>
            {todoList.map((todo, idx)=>{ //todo가 요소 하나씩
                // console.log(todo.id)
                return (
                    <TodoItem key={todo.id}  todo={todo} remove={()=>{
                        onDelete(todo.id) 
                    }} />
                )
            })}
        </ul>

    </div>
  )
}
// update={()=>{onUpdate(todo.id)}}