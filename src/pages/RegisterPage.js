import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaUserAlt,FaLock,FaEye,FaEyeSlash} from 'react-icons/fa';

import Error from 'components/message/Error';
import Success from 'components/message/Success';

import './css/FormPage.css';

const RegisterPage=()=>{
	const [error,setError]=useState("");
	const [success,setSuccess]=useState("");
	const [userData,setUserData]=useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const {username,email,password,confirmPassword}=userData;
	const [passwordIsShow,setPasswordIsShow]=useState(false);
	const [confirmPasswordIsShow,setConfirmPasswordIsShow]=useState(false);

	useEffect(()=>{
        setError("");
		setSuccess("");
	},[]);

	const changeHandler=(e)=>{
		setError("");
		setSuccess("");

		setUserData({
			...userData,
			[e.target.name]: e.target.value
		});
	};
	
	const passwordToggleHandler=()=>{
		setPasswordIsShow(!passwordIsShow);
	};
	const confirmPasswordToggleHandler=()=>{
		setConfirmPasswordIsShow(!confirmPasswordIsShow);
	};

	const submitHandler=(e)=>{
		e.preventDefault();
		const emailPattern=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const passwordPattern=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        
        //檢查全部欄位是否填寫
        if(!username || !email || !password || !confirmPassword){
			return setError("請填寫完整");
        }
        //檢查Email格式
        if(!email.match(emailPattern)){
			return setError("Email格式錯誤");
        }
        //檢查密碼長度
        if(password.length<8){
			return setError("請填寫至少8個字元");
        }
		//檢查密碼格式
		if(!password.match(passwordPattern)){
			return setError("請填寫至少包括1個大寫字元、1個小寫字元、1個數字、1個特殊字元");
		}
        //檢查密碼與確認密碼是否一致
        if(password !== confirmPassword){
			return setError("密碼不一致");
		}

		setSuccess("註冊成功");
	};

    return (
		<section className="section-padding bg-height">
			<div className="container container-padding">
				<form className="form" onSubmit={submitHandler} noValidate>
					<h2 className="form-title">註冊</h2>
					{error && <Error error={error} setError={setError} />}
					{success && <Success success={success} setSuccess={setSuccess}  />}
					<div className="input-group">
						<label htmlFor="username" className="input-group-icon label-icon"><FaUserAlt className="label-icon-cursor" /></label>
						<input type="text" className="input" id="username" name="username" placeholder="請輸入姓名" autoComplete="off" value={username} onChange={changeHandler} />
					</div>
					<div className="input-group">
						<label htmlFor="email" className="input-group-icon label-icon"><FaUserAlt className="label-icon-cursor" /></label>
						<input type="email" className="input" id="email" name="email" placeholder="請輸入Email" autoComplete="off" value={email} onChange={changeHandler} />
					</div>
					<div className="input-group">
						<label htmlFor="password" className="input-group-icon label-icon"><FaLock className="label-icon-cursor" /></label>
						<input type={passwordIsShow?"text":"password"} className="input" id="password" name="password" placeholder="請輸入密碼" value={password} onChange={changeHandler} />
						<div className="input-group-icon eye-icon">{passwordIsShow?<FaEye className="eye-icon-cursor" onClick={passwordToggleHandler} />:<FaEyeSlash className="eye-icon-cursor" onClick={passwordToggleHandler} />}</div>
					</div>
					<div className="input-group">
						<label htmlFor="confirmPassword" className="input-group-icon label-icon"><FaLock className="label-icon-cursor" /></label>
						<input type={confirmPasswordIsShow?"text":"password"} className="input" id="confirmPassword" name="confirmPassword" placeholder="請再次輸入密碼" value={confirmPassword} onChange={changeHandler} />
						<div className="input-group-icon eye-icon">{confirmPasswordIsShow?<FaEye className="eye-icon-cursor" onClick={confirmPasswordToggleHandler} />:<FaEyeSlash className="eye-icon-cursor" onClick={confirmPasswordToggleHandler} />}</div>
					</div>
					<button type="submit" className="btn">註冊</button>
					<p className="text">已是會員? &nbsp;<Link to="/" className="router-link">登入</Link></p>
				</form>
			</div>
		</section>
    );
}

export default RegisterPage;