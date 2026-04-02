import { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    const handleLogin = () => {
        if (id.trim() === '' || pw.trim() === '') {
            alert('아이디와 비밀번호 모두 입력해주세요!');
            return;
        }
        onLoginSuccess();
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>TODOIT!</h1>
                <p>취업 관리 부탁해!</p>

                <div className="input-group">
                    <label>아이디</label>
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>

                <div className="input-group">
                    <label>비밀번호</label>
                    <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                </div>

                <button onClick={handleLogin} className='login-btn'>로그인</button>

                <div className="login-footer">
                    <span>아이디찾기 | 비밀번호찾기</span>
                </div>
            </div>
        </div>
    )
}

export default Login;