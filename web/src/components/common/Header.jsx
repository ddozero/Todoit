import React from 'react';
import './Header.css';

function Header(){
    return(
        <header className="main-header">
           <div className="header-container">
                <h1 className="logo-title">TODOIT</h1>
                <p className="logo-subtitle">나도 취업 할 수 있다!</p>
           </div>
        </header>
    )
}

export default Header;