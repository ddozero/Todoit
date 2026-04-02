import { useState } from "react";
import Login from "./Login";
import MyPage from "./MyPage";

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