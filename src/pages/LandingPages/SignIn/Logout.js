import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
	const history = useNavigate();
	
	const handleLogout = () => {
		// 로그아웃 처리 로직
		localStorage.removeItem('Authorization');
		window.location.href("/");
	};

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Logout;
