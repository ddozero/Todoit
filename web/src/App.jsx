import { useState } from "react";
import Login from "./components/intro/Login.jsx";
import MyPage from "./components/mypage/MyPage.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    return (
        <div>
            {currentPage === 'login' ? (
                <Login onLoginSuccess={() => setCurrentPage('mypage')} />
            ) : (
                <MyPage />
            )}
        </div>
    )
}
export default App;