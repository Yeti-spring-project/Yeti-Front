import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    username: '',
    phoneNumber: '',
    address: '',
  });
  const history = useNavigate();
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name, value ", name, value);
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit : ", formData);
    try {
      // Axios를 사용하여 백엔드 서버로 POST 요청 보내기
      const response = await axios.post('https://yetiyt.shop//api/user/signup', formData);

      // 성공적으로 응답 받으면 여기에서 처리
      console.log('서버 응답:', response.data);
      
      history('/signin');
    } catch (error) {
      // 오류 발생 시 여기에서 처리
      console.error('서버 요청 오류:', error);
    }
  };
  
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          // action={{
          //   type: "external",
          //   route: "https://www.creative-tim.com/product/material-kit-react",
          //   label: "Login",
          //   color: "info",
          // }}
        />
      </MKBox>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})` }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Signup
              </MKTypography>
            </MKBox>
            <MKBox p={3}>

              <MKBox width="100%" component="form" method="post" autoComplete="off" onSubmit={handleSubmit}>
                <Grid container spacing={6}>
                  <Grid item xs={12} md={12}>
                    <MKInput
                      name="email"
                      type="email"
                      variant="standard"
                      label="Email"
                      InputLabelProps={{ shrink: true }}
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKInput
                      name="password"
                      type="password"
                      variant="standard"
                      label="Password"
                      InputLabelProps={{ shrink: true }}
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKInput
                      name="password2"
                      type="password"
                      variant="standard"
                      label="Password2"
                      InputLabelProps={{ shrink: true }}
                      value={formData.password2}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKInput
                      name="username"
                      variant="standard"
                      label="Username"
                      InputLabelProps={{ shrink: true }}
                      value={formData.username}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKInput
                      name="phoneNumber"
                      variant="standard"
                      label="PhoneNumber"
                      InputLabelProps={{ shrink: true }}
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MKInput
                      name="address"
                      variant="standard"
                      label="Address"
                      InputLabelProps={{ shrink: true }}
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item justifyContent="center" xs={12} mt={5} mb={2}>
                  <MKButton type="submit" variant="gradient" color="info" >
                    Signup
                  </MKButton>
                </Grid>
              </MKBox>
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default SignUp;
