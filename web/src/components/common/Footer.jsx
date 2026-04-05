import React from "react";
import { useNavigate } from "react-router-dom";
import './Footer.css';

function Footer() {

    const navigate = useNavigate();

    const handleLogoClick = () => {
        const isLogin = localStorage.getItem('isLogin') === true;

        if (isLogin) {
            navigate('/mypage');
        } else {
            navigate('/');
        }
    }
    return (
        <footer className="main-footer">
            <div className="footer-container">
                <h3 className="footer-logo" onClick={handleLogoClick}>TODOIT</h3>
                <p className="footer-subtitle">취업 관리 한번에 하려고 만든 프로젝트</p>

                <div className="footer-info">
                    <p>개발자 : ddozero@naver.com</p>
                    <p>Copyright 2026. ddozero all rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;