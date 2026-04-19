import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VALIDATION_ERRORS, PLACEHOLDERS } from "../../constants/messages";
import './Signup.css';

function Signup() {

	const [errorMessage, setErrorMessage] = useState('');
	const [idCheckMessage, setIdCheckMessage] = useState('');
	const [isIdAvailable, setIsIdAvailable] = useState(null);

	const [formData, setFormData] = useState({ //객체로 관리
		userId: '',
		password: '',
		name: '',
		phone: '',
		email: '',
		authNum: '',
		agreed: false
	});
	//실시간 유효성 검사
	const [fieldErrors, setFieldErrors] = useState({
		userId: '',
		password: '',
		email: ''
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setErrorMessage('');

		//아이디 중복체크 - 초기화
		if (name === "userId") {
			setIdCheckMessage('');
			setIsIdAvailable(null);
		}

		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		});
		
		//실시간 유효성 검사
		if (name === "userId") {
			setFieldErrors((prev) => ({
				...prev,
				userId: getUserIdError(value)
			}));
		}

		if (name === "password") {
			setFieldErrors((prev) => ({
				...prev,
				password: getPasswordError(value)
			}));
		}

		if (name === "email") {
			setFieldErrors((prev) => ({
				...prev,
				email: getEmailError(value)
			}));
		}
	}

	const navigate = useNavigate();

	//아이디 중복확인 메소드
	const handleCheckId = async () => {
		if (!formData.userId) {
			setIdCheckMessage("아이디를 입력해주세요.");
			setIsIdAvailable(false);
			return;
		}

		if (!validateUserId(formData.userId)) {
			setIdCheckMessage("아이디는 영문/숫자 조합 4~12자로 입력해주세요.");
			setIsIdAvailable(false);
			return;
		}

		try {
			const response = await fetch("http://localhost:8081/api/auth/checkId", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ userId: formData.userId })
			});

			const result = await response.json();

			setIdCheckMessage(result.message);

			if (result.message.includes("사용 가능")) {
				setIsIdAvailable(true);
			} else {
				setIsIdAvailable(false);
			}

		} catch (error) {
			console.error("아이디 중복확인 오류", error);
			setIdCheckMessage("서버와 통신 중 오류가 발생했습니다.");
			setIsIdAvailable(false);
		}
	};


	//회원가입 처리 메소드 
	const handleSignup = async () => {
		const validationMessage = validateSignupForm(formData, isIdAvailable);

		if (validationMessage) {
			setErrorMessage(validationMessage);
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

	//유효성검사
	const validateSignupForm = (formData, isIdAvailable) => {
		if (!formData.userId || !formData.password || !formData.name || !formData.email || !formData.phone) {
			return "모든 항목을 입력해주세요.";
		}

		if (!validateUserId(formData.userId)) {
			return "아이디는 영문/숫자 조합 4~12자로 입력해주세요.";
		}

		if (!validatePassword(formData.password)) {
			return "비밀번호는 영문과 숫자를 포함한 8자 이상이어야 합니다.";
		}

		if (!validateEmail(formData.email)) {
			return "올바른 이메일 형식을 입력해주세요.";
		}

		if (!formData.agreed) {
			return "개인정보 이용 및 수집에 동의해주세요.";
		}

		if (isIdAvailable === null) {
			return "아이디 중복 확인을 해주세요.";
		}

		if (isIdAvailable === false) {
			return "이미 존재하는 아이디입니다.";
		}

		return "";
	};

	const validateUserId = (userId) => {
		return /^[a-zA-Z0-9]{4,12}$/.test(userId);
	};

	const validatePassword = (password) => {
		return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
	};

	const validateEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	//실시간 유효성 검사 
	const getUserIdError = (userId) => {
		if (!userId) return '';
		if (!validateUserId(userId)) {
			return "아이디는 영문/숫자 조합 4~12자로 입력해주세요.";
		}
		return '';
	};

	const getPasswordError = (password) => {
		if (!password) return '';
		if (!validatePassword(password)) {
			return "비밀번호는 영문과 숫자를 포함한 8자 이상이어야 합니다.";
		}
		return '';
	};

	const getEmailError = (email) => {
		if (!email) return '';
		if (!validateEmail(email)) {
			return "올바른 이메일 형식을 입력해주세요.";
		}
		return '';
	};


	return (
		<div className="signup-container">
			<div className="signup-box">
				<h3 className="form-title">회원가입</h3>

				<div className="input-field">
					<label>아이디</label>
					<div className="id-check-row">
						<input name="userId"
							placeholder={PLACEHOLDERS.USER_ID}
							value={formData.userId}
							onChange={handleChange}
						/>
						<button type="button" onClick={handleCheckId}> 중복확인 </button>
					</div>
					{fieldErrors.userId && (<p className="field-error-text">{fieldErrors.userId}</p>)}

					{idCheckMessage && (
						<p className={`id-check-msg ${isIdAvailable ? "success" : "fail"}`}>
							{idCheckMessage}
						</p>
					)}
				</div>

				<div className="input-field">
					<label>비밀번호</label>
					<input type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					{fieldErrors.password && (
						<p className="field-error-text">{fieldErrors.password}</p>
					)}
				</div>

				<div className="input-field">
					<label>이름</label>
					<input type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<div className="input-field">
					<label>이메일</label>
					<input type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="todoit@todoit.com"
					/>
					{fieldErrors.email && (
						<p className="field-error-text">{fieldErrors.email}</p>
					)}
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