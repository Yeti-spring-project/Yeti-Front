import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const history = useNavigate();
  
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name, value ", name, value);
    setFormData({ ...formData, [name]: value });
  };
  
  // 토큰을 로컬 스토리지에 저장하는 함수
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('Authorization', token);
  };
  
  // 로컬 스토리지에서 토큰을 가져오는 함수
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('Authorization');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit : ", formData);
    try {
      // Axios를 사용하여 백엔드 서버로 POST 요청 보내기
      const response = await axios.post('https://yetiyt.shop//api/user/signin', formData);

      // 성공적으로 응답 받으면 여기에서 처리
      console.log('서버 응답:', response.data);
      
      // 토큰을 로컬 스토리지에 저장
      saveTokenToLocalStorage(response.data);
            
      // 알림 get(SSE 서버)
      // const config = {
      //   headers: {
      //     Authorization: `${getTokenFromLocalStorage()}`,
      //   },
      // };

      // // Axios를 사용하여 백엔드 서버로 GET 요청 보내기
      // axios.get('https://yetiyt.shop//api/sports/subscribe', config)
      //   .catch((error) => {
      //     // 오류 발생 시 여기에서 처리
      //     console.error('서버 요청 오류:', error);
      //   });
    } catch (error) {
      // 오류 발생 시 여기에서 처리
      console.error('서버 요청 오류:', error);
    }
    window.location.href = '/';
  };  

  return (
    <>
      <DefaultNavbar
        routes={routes}
        transparent
        light
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </MKTypography>
                
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput label="username" name="username" fullWidth value={formData.username} onChange={handleChange}/>
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput type="password" label="Password" name="password" fullWidth value={formData.password} onChange={handleChange}/>
                  </MKBox>
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} /> */}
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      {/* &nbsp;&nbsp;Remember me */}
                    </MKTypography>
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                      sign in
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
