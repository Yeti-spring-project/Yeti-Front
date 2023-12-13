import SignUp from 'pages/LandingPages/SignUp';
import SignInPage from 'layouts/pages/authentication/sign-in';
import AboutUsPage from 'layouts/pages/landing-pages/about-us';


const routes = [
  {
    name: "home",
    route: "/",
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
