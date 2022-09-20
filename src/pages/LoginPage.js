import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaUserAlt,FaLock,FaEye,FaEyeSlash} from 'react-icons/fa';

import Error from 'components/message/Error';
import Success from 'components/message/Success';

import './css/FormPage.css';

const LoginPage=()=>{
	const [error,setError]=useState("");
	const [success,setSuccess]=useState("");
	const [userData,setUserData]=useState({
		email: localStorage.getItem("email") || "",
		password: "",
		rememberMe: JSON.parse(localStorage.getItem("rememberMe")) || false
	});
	const {email,password,rememberMe}=userData;
	const [passwordIsShow,setPasswordIsShow]=useState(false);

	useEffect(()=>{
        setError("");
		setSuccess("");
	},[]);
	useEffect(()=>{
        if(rememberMe){
            localStorage.setItem("rememberMe",JSON.stringify(rememberMe));
            localStorage.setItem("email",email);
        }
        else{
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("email");
        }
    },[email,rememberMe]);

	const changeHandler=(e)=>{
		setError("");
		setSuccess("");

		const value=e.target.type==="checkbox"?e.target.checked:e.target.value;
		setUserData({
			...userData,
			[e.target.name]: value
		});
	};
	
	const passwordToggleHandler=()=>{
		setPasswordIsShow(!passwordIsShow);
	};

	const submitHandler=(e)=>{
		e.preventDefault();
		const emailPattern=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const passwordPattern=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        
		//檢查全部欄位是否填寫
        if(!email || !password){
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

		setSuccess("登入成功");
	};

    return (
		<section className="section-padding bg-height">
			<div className="container container-padding">
				<form className="form" onSubmit={submitHandler} noValidate>
					<h2 className="form-title">登入</h2>
					{error && <Error error={error} setError={setError} />}
					{success && <Success success={success} setSuccess={setSuccess} />}
					<div className="input-group">
						<label htmlFor="email" className="input-group-icon label-icon"><FaUserAlt className="label-icon-cursor" /></label>
						<input type="email" className="input" id="email" name="email" placeholder="請輸入Email" autoComplete="off" value={email} onChange={changeHandler} />
					</div>
					<div className="input-group">
						<label htmlFor="password" className="input-group-icon label-icon"><FaLock className="label-icon-cursor" /></label>
						<input type={passwordIsShow?"text":"password"} className="input" id="password" name="password" placeholder="請輸入密碼" value={password} onChange={changeHandler} />
						<div className="input-group-icon eye-icon">{passwordIsShow?<FaEye className="eye-icon-cursor" onClick={passwordToggleHandler} />:<FaEyeSlash className="eye-icon-cursor" onClick={passwordToggleHandler} />}</div>
					</div>
					<div className="input-group input-group-flex">
						<div>
							<input type="checkbox" className="input" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={changeHandler} /><label htmlFor="rememberMe" className="rememberMe">記住我</label>
						</div>
						<Link to="/forgetPassword" className="forget-password-link">忘記密碼</Link>
					</div>
					<button type="submit" className="btn">登入</button>
					<p className="text">不是會員? &nbsp;<Link to="/register" className="router-link">註冊</Link></p>
				</form>
			</div>
		</section>
    );
}

export default LoginPage;