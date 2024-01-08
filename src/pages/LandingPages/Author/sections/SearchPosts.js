import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

function SearchPosts() {
  const [searchResult, setSearchResult] = useState();
  const location = useLocation();
  const searchResults = location.state?.searchResults;
  
  useEffect(() => {
    if (searchResults) {
      setSearchResult(searchResults);
    }
    console.log("searchResults : ", searchResults);
  }, [searchResults]);
  
        
  // 받아온 데이터를 사용하여 각각의 카드를 생성
  const renderTicketInfoCards = () => {
    return searchResults.map((sports, index) => (
      <Grid key={index} item xs={12} sm={6} lg={3}>
        <BackgroundBlogCard
          image={post4} // 이미지 경로 또는 이미지 자체를 전달
          title={sports.sportsName}
          description={
            <div>
              <h3>{sports.stadiumName}&nbsp;&nbsp;
              {sports.matchDate}</h3><br/>
              
              <br/>
            </div>
          }
        />
      </Grid>
    ));
  };
  
  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container item xs={12} lg={6}>
          <MKTypography variant="h3" mb={6}>
            Search Sports List
          </MKTypography>
        </Grid>
        <Grid container spacing={3}>
          {searchResult && renderTicketInfoCards()}          
        </Grid>
      </Container>
    </MKBox>
  );
}

export default SearchPosts;
