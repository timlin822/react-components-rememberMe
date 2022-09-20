import {FaTimes} from 'react-icons/fa';

import './Message.css';

const Error=({error,setError})=>{
    const closeHandler=()=>{
        setError("");
	};

    return (
        <div className="message error">
            {error}
            <span className="close" onClick={closeHandler}><FaTimes /></span>
        </div>
    );
}

export default Error;