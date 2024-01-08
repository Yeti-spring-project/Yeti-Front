import { useState, useEffect } from "react";
import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";

// Material Kit 2 React routes
import routes from "routes";
import SignInPage from 'layouts/pages/authentication/sign-in';
import ContactUsPage from 'layouts/pages/landing-pages/contact-us';

export default function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // 로컬 스토리지에서 토큰을 가져와 로그인 여부를 확인
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
  }, [pathname]);
  
  const handleLogout = () => {
    // 로그아웃 처리 로직
    localStorage.removeItem('token');
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
        {isLoggedIn ? (
          <Route color="inherit" component={Link} to="/logout" onClick={handleLogout}>
            Logout
          </Route>
        ) : (
          <>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<ContactUsPage />} />
          </>
        )}
        {/* <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<ContactUsPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/presentation" />} /> */}
      </Routes>
    </ThemeProvider>
  );
}

