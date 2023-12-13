
// @mui material components
import Icon from "@mui/material/Icon";

import SignUp from 'pages/LandingPages/SignUp';
import SignInPage from 'layouts/pages/authentication/sign-in';
import Contact from 'pages/LandingPages/Author/sections/Contact';
import AboutUsPage from 'layouts/pages/landing-pages/about-us';
import AuthorPage from 'layouts/pages/landing-pages/author';


const routes = [
  {
    name: "test",
    route: "/",
    component: <AuthorPage />
  },
  {
    name: "home",
    route: "/home",
    component: <AboutUsPage />
  },
  {
    name: "signup",
    route: "/signup",
    component: <SignUp />
  },
  {
    name: "signin",
    route: "/signin",
    component: <SignInPage />
  },
  
  // {
  //   name: "github",
  //   icon: <GitHubIcon />,
  //   href: "https://www.github.com/creativetimofficial/material-kit-react",
  // },
  
  
];

export default routes;
