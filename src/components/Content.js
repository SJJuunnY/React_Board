import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import Comment from './Comment';

export default function Content() {
    const ID = useParams().contentID; //게시글 ID
    const [contentdata, setContentData] = useState([]);
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    // var data

    async function fetchTodo(){
        const resp = await axios.get('http://127.0.0.1:3000/authboard/'+ID,{method : 'GET'})
        const data = resp.data
        // console.log(data)
            setContentData(data)
      }
    async function fetchComment(){
        const resp = await axios.get("http://127.0.0.1:3000/authboard/"+ID+"/comment",{})
        const data= resp.data
        // console.log(data)
        if(comments != data)
            setComments(data);
    }

    // <example>
    // const deleteTodo = useCallback((todoId)=>{
    //     setTodoList(prev=>{
    //       return prev.filter((todo)=>{
    //         return todo.id !== todoId
    //       })
    //     })
        
    //   }, [setTodoList])


    const onDelete = (async (commentId)=>{
        console.log();
        await axios.delete('http://127.0.0.1:3000/authboard/'+commentId+"/comment");
            console.log(1);

        setComments(prev=>{
            return prev.filter((comments)=>{
                return comments._id !== commentId
            })
        })
    })

    // const onAddComment = (()=>{
    //     fetchComment();
    // })
    
    // useEffect(()=>{
    //     fetchComment()
    // },[comments])

    useEffect(()=>{
        fetchTodo()
        fetchComment()
    },[])
    console.log(comments)

  return (
    <>
        <div>ID : {ID}</div> {/*게시글 ID*/}
        {/* <div>Title : {title}</div>
        <div>Content : {content}</div> */}
        
        <div>Title : {contentdata.title}</div>
        <div style={{backgroundColor:"pink",border:"12",borderBlockColor : "black",height :"400px"}}>
            Content
            <div>{contentdata.content}</div>
        </div>
        <div class="comment">
            <input type="text" value={comment} onChange={(e)=>setComment(e.target.value)}></input>
            <button onClick={ async ()=>{
                await axios.post("http://127.0.0.1:3000/authboard/"+ID+"/comment",{
                    content : comment, author:ID, board : ID})
                setComment('');
                // onAddComment();
                fetchComment();
            }}>댓글달기</button>
        <ul>
            {comments.map((elem,idx)=>{
                // content, author, boardId
                console.log(elem);
                return(
                    
                <Comment elem={elem} onDelete={onDelete}></Comment>
                    // <div>{elem.content}</div>
                )
            })}
        </ul>
        </div>
    </>
  )
}
