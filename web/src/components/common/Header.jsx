import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header(){
    const navigate = useNavigate();
    
    const handleLogoClick = () => {
        const isLogin = localStorage.getItem('isLogin') === 'true';

        if(isLogin){
            navigate('/mypage');
        }else{
            navigate('/');
        }
    }

    return(
        <header className="main-header">
           <div className="header-container">
                <h1 className="logo-title" onClick={handleLogoClick}>TODOIT</h1>
                <p className="logo-subtitle">나도 취업 할 수 있다!!</p>
           </div>
        </header>
    )
}

export default Header;