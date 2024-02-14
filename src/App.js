import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import TodoApp from './components/TodoApp';
import React,{useEffect, useState} from 'react';
import Login from './components/Login';
var user_id= "";


function App() {
    
  const [isLogin, setIsLogin] = useState(false);

  const todoLogin = async (id,pw)=>{
    await axios.post('http://127.0.0.1:3000/users/login',{"email" : id , "password" : pw })
    .then( response =>{
        console.log("요청 성공")
        alert("로그인 성공~~")
        setIsLogin(true)
        user_id = response.data._id
        // console.log(user_id)
        localStorage.setItem("token",user_id)
    })
    .catch(err=>{
        console.log("요청 실패")
        alert("누구세요")
    })
  }
  function onLogout(){
    setIsLogin(false);
  }
  useEffect(()=>{
      console.log(localStorage.getItem("token"))
      return function () {
        console.log(1)
            if(localStorage.getItem("token")!==null){
                setIsLogin(true)
            }
        }
  })

  return (
    <div style={{alignContent:"center", flexDirection:"column",justifyContent : "center"}}>
        {isLogin === true ? <TodoApp user_id={user_id} onLogout={onLogout}></TodoApp>: <Login todoLogin={todoLogin}></Login>}
    </div>
  );
}

export default App;