import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Logout = () => {
	const history = useNavigate();
	
	useEffect(() => {
		const handleLogout = () => {
			// 로그아웃 처리 로직
			localStorage.removeItem('Authorization');
			window.location.href("/");
		};
		handleLogout();
	}, [])
	

	return (
		<div>
			<>로그아웃</>
		</div>
	);
};

export default Logout;
