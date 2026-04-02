import { useState } from "react";
import Login from "./components/intro/Login.jsx";
import Profile from "./components/mypage/Profile.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    return (
        <div>
            {currentPage === 'login' ? (
                <Login onLoginSuccess={() => setCurrentPage('mypage')} />
            ) : (
                <Profile />
            )}
        </div>
    )
}
export default App;