import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "uppercase",
  fontSize: "20px",
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  fontWeight: "400",
  backgroundColor: "#d0d6f9",
  margin: "2%",
  width: "50%",
  color: "black",
  fontFamily: "'Barlow Condensed', sans-serif",
  "&:hover": {
    backgroundColor: "#d0d6f9",
    borderColor: "white",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "green",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const Home = () => {
  const [apodData, setApodData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=W4g5EuMBIJf8dgLhrrPWTJdJvD7M5ncih66CO25i"
    )
      .then((response) => response.json())
      .then((data) => setApodData(data))
      .catch((error) => console.error(error));
  }, []);

  if (!apodData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="homepage">
        <div className="home-text">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span id="heading">So, You want to travel to</span>
              <h1 className="homehead">Space</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <p>
                If you want to go to space, you might as well genuinely go to
                outer space and not hover kind of on the edge of it. Well sit
                back and relax because we'll give you a truly out of this world
                experience.
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "2%",
            width: "90%",
            display: "block",
            backgroundColor: "#d0d694",
            borderRadius: "10px",
            opacity: "1.7",
            borderRadius: "10px",
            boxShadow: "0 0px 15px #d0d6f9",
          }}
        ></div>
        <div className="apod">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                marginRight: "2%",
              }}
            >
              {showMore ? (
                <p>{apodData.explanation}</p>
              ) : (
                <p>{apodData.explanation.substring(0, 250)}</p>
              )}
              <BootstrapButton
                variant="outlined"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </BootstrapButton>
            </div>
            <div>
              <span id="headingapod">Solar Picture of the Day</span>
              <h2 className="apodhead">{apodData.title}</h2>
              <img
                style={{
                  borderRadius: "10px",
                  opacity: "1.7",
                  borderRadius: "10px",
                  boxShadow: "0 0px 15px #d0d6f9",
                }}
                src={apodData.url}
                alt={apodData.title}
                height={550}
                width={500}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "100px",
          }}
        >
          <div>
            <span id="twithead">CONNECT</span>
          </div>
          <div
            style={{
              marginTop: "80px",
              display: "flex",
              justifyContent: "center",
              margin: "5%",
            }}
          >
            <TwitterTimelineEmbed
              opacity="1.7"
              borderRadius="10px"
              boxShadow="0 0px 15px #d0d6f9"
              linkColor="#d0d6f9"
              sourceType="profile"
              screenName="spacex"
              options={{ height: 250, width: 1000 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
