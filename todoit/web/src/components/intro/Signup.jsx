import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VALIDATION_ERRORS, PLACEHOLDERS } from "../../constants/messages";
import './Signup.css';

function Signup() {

	const [errorMessage, setErrorMessage] = useState('');

	const [formData, setFormData] = useState({ //객체로 관리
		userId: '',
		password: '',
		name: '',
		phone: '',
		email: '',
		authNum: '',
		agreed: false
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setErrorMessage('');
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
	}
	
	const navigate = useNavigate();

	const handleSignup = async () => {
		if (!formData.agreed) {
			setErrorMessage(VALIDATION_ERRORS.AGREEMENT_REQUIRED);
			return;
		}
		const requestData = {
			userId: formData.userId,
			password: formData.password,
			name: formData.name,
			email: formData.email,
			phone: formData.phone
		};

		try {
			const response = await fetch("http://localhost:8081/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(requestData)
			});
			const result = await response.json();

			if (response.ok) {
				alert("회원가입에 성공하였습니다.");
				navigate("/");
			} else {
				setErrorMessage(result.message || "회원가입 실패");
			}

		} catch (error) {
			console.error("회원가입 오류", error);
			setErrorMessage("서버와 통신 중 오류가 발생했습니다.")
		}
	};

	return (
		<div className="signup-container">
			<div className="signup-box">
				<h3 className="form-title">회원가입</h3>

				<div className="input-field">
					<label>아이디</label>
					<input name="userId"
						placeholder={PLACEHOLDERS.USER_ID}
						value={formData.userId}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<label>비밀번호</label>
					<input type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<label>이름</label>
					<input type="text"
						name="name"
						value={formData.userName}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<label>이메일</label>
					<input type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<label>전화번호</label>
					<input type="text"
						name="phone"
						value={formData.phone}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<input name="authNum"
						placeholder={PLACEHOLDERS.AUTH_CODE}
						value={formData.authNum}
						onChange={handleChange}
					/>
				</div>

				<div className="checkbox-field">
					<input type="checkbox"
						name="agreed"
						checked={formData.agreed}
						onChange={handleChange}
					/>
					<span>개인정보 이용 및 수집에 동의합니다.</span>
				</div>

				{errorMessage && <p className="error-text">{errorMessage}</p>}
				<button className="submit-btn" onClick={handleSignup}>회원가입</button>
			</div>
		</div>
	)
}

export default Signup;