import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (id.trim() === '' || pw.trim() === '') {
            alert('아이디와 비밀번호 모두 입력해주세요!');
            return;
        }

        try{
            const respose = await fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId:id,
                    password:pw,
                }),
            });
            const result = await respose.json();

            if(!respose.ok){
                alert(result.message || '로그인에 실패했습니다.');
                return;
            }

            const token = result?.data?.token;

            if(!token){
                alert('토큰이 없습니다. 로그인 응답을 확인해주세요.');
                return;
            }
            localStorage.setItem('token', token);
            localStorage.setItem('userId',result.data.userId);
            localStorage.setItem('name',result.data.name);

            alert('로그인 성공!');
            //onLoginSuccess();
            
        } catch(error){
            console.error('로그인 오류:', error);
            alert('서버와 통신 중 오류가 발생했습니다.')
        }
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