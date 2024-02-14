import React, { useCallback, useState, useEffect } from 'react';
// import './TodoApp.css';
import TodoList from './TodoList';
import axios from 'axios';
import Login from './Login';
import { Link } from 'react-router-dom';
const COLOR_MAP = [
    {color: 'red'}, 
    {color: 'blue'}, 
    {color: 'white'}, 
    {color: 'yellow'}
]

export default function TodoApp({user_id,onLogout}) {
 
  const [titleText, setTitleText] = useState(''); //입력할 inputText
  const [contentText, setContentText] = useState('')
  const [searchText, setSearchText] = useState('') //찾을 inputText

  const [activeColor, setActiveColor] = useState(COLOR_MAP[0].color);
  const [incrementCount, setIncrementCount] = useState(3);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const [todoList, setTodoList] = useState([]);
  const [searchTodoList, setSearchTodoList] = useState([])
  
  async function fetchTodo(){
    const resp = await axios.get('http://127.0.0.1:3000/authboard',{method : 'GET'})
    const data = resp.data
    var temp = [];
   
    data.map((elem,idx)=>{
        var temptodo = {
            id : elem._id,
            title : elem.title,
            content : elem.content,
            color : elem.color
        };
        temp.push(temptodo);
    })
    setTodoList(temp)
  }

  useEffect(()=>{
    fetchTodo();
  },[]) //todolist넣어주면 계속 돈디

  const deleteTodo = useCallback((todoId)=>{
    setTodoList(prev=>{
      return prev.filter((todo)=>{
        return todo.id !== todoId
      })
    })
    
  }, [setTodoList])
  
  return (
    <div className="todo-app" style={{ alignContent:"center", alignItems : "center",justifyContent:"center",display:"flex",flexDirection : "column"}}>
      <div style={{display:"flex"}}>
        <h1>Board</h1>
        {/* <button style={{height : "20px", margin : "auto" }} onClick={()=>{
            if(window.confirm("로그아웃?")){
                alert("로그아웃 성공~~")
                localStorage.removeItem("token")
            }
            else{
                alert("아님말고")
            }
            }}>로그아웃</button> */}
            <Link path={"/"}><button style={{height : "20px", margin : "auto" }} onClick={()=>{
                localStorage.removeItem("token")
                onLogout();
                }}>
                로그아웃</button></Link>
      </div>

      <div className='inputform' style={{ margin: "auto"}}>
        <div style={{margin: "auto",justifyContent:"center",display:"flex",flexDirection:"column"}}>

            <input type="text" value={titleText} placeholder="Title" style={{backgroundColor:activeColor}} onChange={e=>{
                    setTitleText(e.target.value);
                    }} />

            <input type="text" value={contentText} placeholder="Content" style={{backgroundColor:activeColor}} onChange={e=>{
                    setContentText(e.target.value);
                    }} />
            
            <button onClick={async()=>{
                // console.log(user_id)
                const item = {
                    id: incrementCount,
                    title: titleText,
                    color: activeColor
                };

                if(!titleText.trim()){
                    alert("입력 값 넣으세요~")
                }else{
                    try{ 
                        axios.post('http://127.0.0.1:3000/authboard',{"title" : titleText, "content":contentText, 
                                "color" : activeColor,"author":user_id});
                        setTitleText('')
                        setContentText('')
                        setTodoList(prev=>prev.concat(item))
                        setIncrementCount(prev=>(prev+1))
                    } catch(err){
                        console.log(err)
                    }
                }
            }}>제출</button>
        </div>
        
        <div style={{margin:"auto", justifyContent : "center"}}>
            <input value ={searchText} style={{alignItems : "center"}} onChange={(e)=>{
                setSearchText(e.target.value)
            }}/>
            <button onClick={ async (e)=>{
                if(!searchText.trim() && !isSearchMode){ //검색모드 아닐때 빈문자여야 알람
                    alert("찾기 값 넣으세요~")
                    return;
                }
                if(!isSearchMode){ //검색모드가 아닐떄=> 일반모드 이므로 검색하고싶을때 누름
                    const Post = await axios.get('http://127.0.0.1:3000/authboard/search',
                    { params : { title : searchText, content : "굿", color : activeColor}});
                    let searchResult = []
                    Post.data.map((elem,idx)=>{
                        searchResult.push({
                            title : elem.title,
                            content : elem.content,
                            color : elem.color
                        })
                    })
                    setSearchTodoList(searchResult);
                    console.log(searchTodoList)
                    setIsSearchMode(!isSearchMode);
                    setSearchText('')
                }
                else if(isSearchMode){ //검색모드가 아닐떄=> 일반모드 이므로 검색하고싶을때 누름

                    setIsSearchMode(!isSearchMode);
                    setSearchText('')
                }
                console.log("Is search mode? ",isSearchMode)
            }}>{isSearchMode === false ? "찾기" : "다시 목록 보기"}</button>
        </div>
    </div>

      <div style={{marginTop:'10px' ,display : 'flex',flexDirection:"row" ,justifyContent: 'center',}}>
        {COLOR_MAP.map(elem=>{
          return (
            <div onClick={()=>{
              setActiveColor(elem.color);
            }} key={elem.color} style={{width:20, height:20, 
                    backgroundColor: elem.color, border: '1px solid',
                    borderRadius: 5, borderColor: 'e9e9e9'
            }}>
              
            </div>
          )
        })}
      </div>
      
      <div>
        <TodoList todoList={isSearchMode === false ? todoList : searchTodoList} onDelete={deleteTodo} />
      </div>
    </div>
  )
}
// import React, { useCallback, useState, useEffect } from 'react';
// // import './TodoApp.css';
// import TodoList from './TodoList';
// import axios from 'axios';
// import Login from './Login';
// const COLOR_MAP = [
//     {color: 'red'}, 
//     {color: 'blue'}, 
//     {color: 'white'}, 
//     {color: 'yellow'}
// ]

// export default function TodoApp() {
 
//   const [inputText, setInputText] = useState(''); //입력할 inputText
//   const [searchText, setSearchText] = useState('') //찾을 inputText

//   const [activeColor, setActiveColor] = useState(COLOR_MAP[0].color);
//   const [incrementCount, setIncrementCount] = useState(3);
//   const [isSearchMode, setIsSearchMode] = useState(false);

//   const [todoList, setTodoList] = useState([]);
//   const [searchTodoList, setSearchTodoList] = useState([])

//   async function fetchTodo(){
//     const resp = await axios.get('http://127.0.0.1:3000/todo',{method : 'GET'})
//     const data = resp.data
//     var temp = [];
   
//     data.map((elem,idx)=>{
//         var temptodo = {
//             id : elem._id,
//             title : elem.title,
//             color : elem.color
//         };
//         temp.push(temptodo);
//     })
//     setTodoList(temp)
//   }

//   useEffect(()=>{
//     fetchTodo();
//   },[]) //todolist넣어주면 계속 돈디

//   const deleteTodo = useCallback((todoId)=>{

//     setTodoList(prev=>{
//       return prev.filter((todo)=>{
//         return todo.id !== todoId
//       })
//     })
    
//   }, [setTodoList])

//   return (
//     <div className="todo-app" style={{ alignContent:"center", alignItems : "center",justifyContent:"center",display:"flex",flexDirection : "column"}}>
//       <div>
//         <h1>TodoApp</h1>
//       </div>

//       <div className='inputform' style={{ margin: "auto",flexDirection:"column"}}>
//         <div style={{margin: "auto",justifyContent:"center"}}>
//             <input type="text" value={inputText} style={{backgroundColor:activeColor}} onChange={e=>{
//             setInputText(e.target.value);
//             }} />
            
//             <button onClick={async()=>{
//             const item = {
//                 id: incrementCount,
//                 title: inputText,
//                 color: activeColor
//             };

//             if(!inputText.trim()){
//                 alert("입력 값 넣으세요~")
//             }else{
//                 try{ 
//                     axios.post('http://127.0.0.1:3000/todo',{"title" : inputText, "content": "굿", "color" : activeColor});
//                     setInputText('')
//                     setTodoList(prev=>prev.concat(item))
//                     setIncrementCount(prev=>(prev+1))
//                 } catch(err){
//                     console.log(err)
//                 }
//             }
//             }}>제출</button>
//         </div>
//         <div style={{margin:"auto", justifyContent : "center"}}>
//             <input value ={searchText} style={{alignItems : "center"}} onChange={(e)=>{
//                 setSearchText(e.target.value)
//             }}/>
//             <button onClick={ async (e)=>{
//                 if(!searchText.trim() && !isSearchMode){ //검색모드 아닐때 빈문자여야 알람
//                     alert("찾기 값 넣으세요~")
//                     return;
//                 }
//                 if(!isSearchMode){ //검색모드가 아닐떄=> 일반모드 이므로 검색하고싶을때 누름
//                     const Post = await axios.get('http://127.0.0.1:3000/todo/search',
//                     { params : { title : searchText, content : "굿", color : activeColor}});
//                     let searchResult = []
//                     Post.data.map((elem,idx)=>{
//                         searchResult.push({
//                             title : elem.title,
//                             content : elem.content,
//                             color : elem.color
//                         })
//                     })
//                     await setSearchTodoList(searchResult);
//                     await console.log(searchTodoList)
//                     await setIsSearchMode(!isSearchMode);
//                     await setSearchText('')
//                 }
//                 else if(isSearchMode){ //검색모드가 아닐떄=> 일반모드 이므로 검색하고싶을때 누름

//                     await setIsSearchMode(!isSearchMode);
//                     await setSearchText('')
//                 }
//                 console.log("Is search mode? ",isSearchMode)
//             }}>{isSearchMode === false ? "찾기" : "다시 목록 보기"}</button>
//         </div>
//     </div>

//       <div style={{marginTop:'10px' ,display : 'flex',flexDirection:"row" ,justifyContent: 'center',}}>
//         {COLOR_MAP.map(elem=>{
//           return (
//             <div onClick={()=>{
//               setActiveColor(elem.color);
//             }} key={elem.color} style={{width:20, height:20, 
//                     backgroundColor: elem.color, border: '1px solid',
//                     borderRadius: 5, borderColor: 'e9e9e9'
//             }}>
              
//             </div>
//           )
//         })}
//       </div>
      
//       <div>
//         <TodoList todoList={isSearchMode === false ? todoList : searchTodoList} onDelete={deleteTodo} />
//       </div>
//     </div>
//   )
// }