import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLoginSuccess }) {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

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
                <h1 className="logo">TODOIT!</h1>
                <p className="subtitle">취업 할 수 있다! 취업 관리 부탁해!</p>

                <div className="input-form">
                    <div className="input-group">
                        <label>아이디</label>
                        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    </div>

                    <div className="input-group">
                        <label>비밀번호</label>
                        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
                    </div>
                </div>

                <button onClick={handleLogin} className='login-btn'>로그인</button>

                <div className="signup">
                    <span onClick={() => navigate('/signup')}>TODOIT 처음이신가요?</span>
                </div>

                <div className="login-footer">
                    <span className="footer-link" onClick={() => console.log('아이디 찾기')}>아이디 찾기</span>
                    <span className="divider">|</span>
                    <span className="footer-link" onClick={() => console.log('비밀번호 찾기')}>비밀번호 찾기</span>
                </div>
            </div>
        </div>
    )
}

export default Login;