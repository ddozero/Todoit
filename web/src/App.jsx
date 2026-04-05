import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/intro/Login.jsx";
import Signup from "./components/intro/Signup.jsx";
import Profile from "./components/mypage/Profile.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState('login');

    return (
      <Router>
        <Routes>
            {/*1.기본경로페이지 */}
            <Route path="/" element={<Login />}/>

            {/*2.회원가입페이지*/}
            <Route path="/signup" element={<Signup />}/>

            {/*3.프로필페이지*/}
            <Route path="/mypage" element={<Profile />}/>

        </Routes>
      </Router>
    )
}
export default App;