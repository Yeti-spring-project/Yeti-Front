import React from 'react';

const Logout = () => {
	const handleLogout = () => {
		// 로그아웃 처리 로직
		localStorage.removeItem('Authorization');
		// 이후 필요한 로그아웃 동작을 수행할 수 있습니다.
	};

	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Logout;
