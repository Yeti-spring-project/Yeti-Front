import { useState, useEffect } from "react";
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
// import Routes from "routes";
import SignUp from 'pages/LandingPages/SignUp';
import SignInPage from 'layouts/pages/authentication/sign-in';
import AboutUsPage from 'layouts/pages/landing-pages/about-us';
import ContactUsPage from 'layouts/pages/landing-pages/contact-us';

export default function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // 로컬 스토리지에서 토큰을 가져와 로그인 여부를 확인
    const token = localStorage.getItem('Authorization');
    setLoggedIn(!!token);
  }, [pathname]);
  
  const routes = [
    {
      name: "home",
      route: "/",
      component: <AboutUsPage />,
      key: "home",
    },
    ...(isLoggedIn
      ? [
          {
            name: "logout",
            route: "/logout",
            component: null, // 로그아웃 페이지 컴포넌트는 null 또는 특정 컴포넌트로 설정
            key: "logout"
          }
        ]
      : [
          {
            name: "signup",
            route: "/signup",
            component: <SignUp />,
            key: "signup"
          }
        ]
    ),
    {
      name: "signin",
      route: "/signin",
      component: <SignInPage />,
      key: "signin"
    },
  ];
  
  const handleLogout = () => {
    // 로그아웃 처리 로직
    localStorage.removeItem('Authorization');
    setLoggedIn(false);
  };

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/presentation" element={<Presentation />} />
      </Routes>
    </ThemeProvider>
  );
}

