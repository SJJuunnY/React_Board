import React,{Component, useState} from 'react';

export default function Login({todoLogin}) {
    // function login{
        // action={login}
    // }
    const [idValue, setIdValue] = useState('');
    const [pwValue, setPwValue] = useState('');

    const handleInputChange = (event) => {
        setIdValue(event.target.value);
    };
    
    const onsubmit = (event) => {
        // setIdValue('')
        // setPwValue('')
        todoLogin(idValue, pwValue)

        event.preventDefault();
    }
    
  return (    
        <body>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="login.css"/>
            <div id="container">
                <form  style={{border : '2px solid black', padding : '10px', margin : '20px'}}>
                    <div id="login-box">
                            <div class="login-form">
                                <label for="id">이메일</label><br/>
                                <input type="text" name="id" placeholder="아이디를 입력하세요" class="form-control" id="id" value={idValue} onChange={(e)=>{setIdValue(e.target.value)}}/>
                            </div>
                            
                            <div class="login-form">
                                <label for="pw">비밀번호</label><br/>
                                <input type="password" name="pw" placeholder="비밀번호를 입력하세요" class="form-control" id="pw" value={pwValue} onChange={(e)=>{setPwValue(e.target.value)}}/>
                            </div>

                            <div id="btn-login" style={{marginTop : '10px'}}>
                                <button type="submit" class="btn btn-success" onClick={onsubmit}>로그인</button>
                            </div>
                    </div>
                </form>
            </div>

        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    </body>
  )
}