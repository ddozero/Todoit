
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Login from "./components/intro/Login.jsx";
import Signup from "./components/intro/Signup.jsx";
import Profile from "./components/mypage/Profile.jsx";
import './App.css';

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div id="root"> 
      {!isLoginPage && <Header />}
      
      {/* 로그인 페이지면 'login-main', 아니면 'common-main' 클래스 적용 */}
      <main className={isLoginPage ? "login-main" : "common-main"}>
        {children}
      </main>
      
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          {/*1.기본경로페이지 */}
          <Route path="/" element={<Login />} />

          {/*2.회원가입페이지*/}
          <Route path="/signup" element={<Signup />} />

          {/*3.프로필페이지*/}
          <Route path="/mypage" element={<Profile />} />
        </Routes>
      </Layout>
    </Router>
  )
}
export default App;