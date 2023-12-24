import React, { useState, useEffect } from 'react';
import axios from 'axios';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React components
import BackgroundBlogCard from "examples/Cards/BlogCards/BackgroundBlogCard";

// Images
import post4 from "assets/images/examples/blog2.jpg";

function Places() {
  const [ticketInfoList, setTicketInfoList] = useState();
  
  useEffect(() => {
    const getTicketInfoList = async () => {
      try {
        const response = await axios.get("https://yetiyt.shop/api/tickets");
        console.log(response.data.data);
        
        setTicketInfoList(response.data.data);
      } catch(error) {
        console.log("error : ", error);
      }
    }
    getTicketInfoList()
  }, []);
  
  // 토큰을 로컬 스토리지에 저장하는 함수
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem('Authorization', token);
  };
  
   // 로컬 스토리지에서 토큰을 가져오는 함수
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('Authorization');
  };
  
  // 토큰
  const config = {
    headers: {
      Authorization: `${getTokenFromLocalStorage()}`,
    },
  };
  
  // 예매
  const handleReserveTicket = async (id) => {
    const ticketData = {
      "ticketInfoId": id,
      "posX": 0,
      "posY": 0,
    }
    
    try{
      const response = await axios.post("https://yetiyt.shop/api/mytickets/reserve", ticketData, config);
      console.log("예매 : ", response);
    } catch(error) {
      console.log("error : ", error);
    }
  }
  
  // 찜
  const handleBookmarkTicket = async (id) => {

    try{
      const response = await axios.post(`https://yetiyt.shop/api/sports/bookmarks?ticketinfoid=${id}`, "", config);
      console.log("찜 : ", response);
    } catch(error) {
      console.log("error : ", error);
    }
  }
  
  // 받아온 데이터를 사용하여 각각의 카드를 생성
  const renderTicketInfoCards = () => {
    return ticketInfoList.map((ticketInfo, index) => (
      <Grid key={index} item xs={12} sm={6} lg={3}>
        <BackgroundBlogCard
          image={post4} // 이미지 경로 또는 이미지 자체를 전달
          title={ticketInfo.sports.sportsName}
          description={
            <div>
              <h3>{ticketInfo.sports.stadiumName}&nbsp;&nbsp;
              {ticketInfo.sports.matchDate}</h3><br/>
              <p>오픈 {new Date(ticketInfo.openDate).toLocaleString()}</p>
              <p>마감 {new Date(ticketInfo.closeDate).toLocaleString()}</p>
              <p>가격 {ticketInfo.ticketPrice}</p>
              <br/>
            </div>
          }
          action={{
            type: "internal",
            onClickReserveTicket: () => handleReserveTicket(ticketInfo.id),
            label: "예매하기",
          }}
          secondAction={{
            type: "internal",
            onClickBookmarkTicket: () => handleBookmarkTicket(ticketInfo.id),
            label: "찜하기",
          }}
        />
      </Grid>
    ));
  };
  
  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Sports List
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          {ticketInfoList && renderTicketInfoCards()}          
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Places;
