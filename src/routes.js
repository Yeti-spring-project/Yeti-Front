import { useState, useEffect } from 'react';

import SignUp from 'pages/LandingPages/SignUp';
import SignInPage from 'layouts/pages/authentication/sign-in';
import AboutUsPage from 'layouts/pages/landing-pages/about-us';
import SearchPostsPage from 'layouts/pages/landing-pages/about-us/search';
import Logout from 'pages/LandingPages/SignIn/Logout';

const RouteList = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 페이지 로딩 시 로컬 스토리지에서 토큰을 확인하여 로그인 상태를 업데이트
    const token = localStorage.getItem('Authorization');
    setLoggedIn(!!token);
  }, []);

  const getRoutes = (isLoggedIn) => {
    const commonRoutes = [
      {
        name: "",
        route: "/search",
        component: <SearchPostsPage />,
        key: "search",
      },
      {
        name: "home",
        route: "/",
        component: <AboutUsPage />,
        key: "home",
      },
      //   {
      //   name: "github",
      //   icon: <GitHubIcon />,
      //   href: "https://www.github.com/creativetimofficial/material-kit-react",
      // },
      ...(isLoggedIn
        ? [
            {
              name: "logout",
              route: "/logout",
              component: <Logout />, 
              key: "logout"
            }
          ]
        : [
            {
              name: "signup",
              route: "/signup",
              component: <SignUp />,
              key: "signup"
            },
            {
              name: "signin",
              route: "/signin",
              component: <SignInPage />,
              key: "signin"
            },
          ]
      ),
      
    ];
    return commonRoutes;
  };
  const routeList = getRoutes(isLoggedIn);
  
  return routeList;
}

export default RouteList;
