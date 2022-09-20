import {useState,useEffect} from 'react';
import {FaUserAlt} from 'react-icons/fa';

import Error from '../components/message/Error';
import Success from '../components/message/Success';

import './css/FormPage.css';

const ForgetPasswordPage=()=>{
	const [error,setError]=useState("");
	const [success,setSuccess]=useState("");
	const [email,setEmail]=useState("");

	useEffect(()=>{
        setError("");
		setSuccess("");
	},[]);
    useEffect(()=>{
		if(success==="請前往Email信箱，進行密碼重設"){
			setEmail("");
		}
	},[success]);

	const changeHandler=(e)=>{
		setError("");
		setSuccess("");

        setEmail(e.target.value);
	};

	const submitHandler=(e)=>{
		e.preventDefault();
		const emailPattern=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
		//檢查全部欄位是否填寫
        if(!email){
			return setError("請填寫完整");
        }
        //檢查Email格式
        if(!email.match(emailPattern)){
			return setError("Email格式錯誤");
		}

		setSuccess("寄信成功");
	};

    return (
		<section className="section-padding bg-height">
			<div className="container container-padding">
				<form className="form" onSubmit={submitHandler} noValidate>
					<h2 className="form-title">忘記密碼</h2>
					{error && <Error error={error} setError={setError} />}
					{success && <Success success={success} setSuccess={setSuccess} />}
					<div className="input-group">
						<label htmlFor="email" className="input-group-icon label-icon"><FaUserAlt className="label-icon-cursor" /></label>
						<input type="email" className="input" id="email" name="email" placeholder="請輸入Email" autoComplete="off" value={email} onChange={changeHandler} />
					</div>
					<button type="submit" className="btn">送出</button>
				</form>
			</div>
		</section>
    );
}

export default ForgetPasswordPage;