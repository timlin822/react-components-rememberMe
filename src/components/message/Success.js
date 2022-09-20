import {FaTimes} from 'react-icons/fa';

import './Message.css';

const Success=({success,setSuccess})=>{
    const closeHandler=()=>{
		setSuccess("");
	};

    return (
        <div className="message success">
            {success}
            <span className="close" onClick={closeHandler}><FaTimes /></span>
        </div>
    );
}

export default Success;