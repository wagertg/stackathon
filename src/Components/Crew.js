import React, { useState } from "react";
import crew1 from "../Images/anousheh-ansari.png";
import crew2 from "../Images/douglas-hurley.png";
import crew3 from "../Images/mark-shuttleworth.png";
import crew4 from "../Images/victor-glover.png";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#d0d6f9",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontFamily: "'Barlow Condensed Regular'",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(16),
    letterSpacing: "2.7",
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Crew = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div>
        <h1 className="heading">MEET YOUR CREW</h1>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
              centered
            >
              <StyledTab label="COMMANDER" {...a11yProps(0)} />
              <StyledTab label="FLIGHT ENGINEER" {...a11yProps(1)} />
              <StyledTab label="MISSION SPECIALIST" {...a11yProps(2)} />
              <StyledTab label="PILOT" {...a11yProps(3)} />
            </StyledTabs>
          </Box>
          <TabPanel value={value} index={0}>
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
                    margin: "3%",
                  }}
                >
                  <div>
                    <h2 className="apodhead">DOUGLAS HURLEY</h2>
                  </div>
                  <p>
                    {" "}
                    Douglas Gerald Hurley is an American engineer, former Marine
                    Corps pilot and former NASA astronaut. He launched into
                    space for the third time as commander of Crew Dragon Demo-2.
                    Anousheh Ansari is an Iranian American engineer and
                    co-founder of Prodea Systems.
                  </p>
                </div>
                <div>
                  <img src={crew2} height={500} width={450} />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="apod">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <img src={crew1} height={500} width={450} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    margin: "3%",
                  }}
                >
                  <div>
                    <h2 className="apodhead">ANOUSHEH ANSARI</h2>
                  </div>
                  <p>
                    {" "}
                    Anousheh Ansari is an Iranian American engineer and
                    co-founder of Prodea Systems. Ansari was the fourth
                    self-funded space tourist, the first self-funded woman to
                    fly to the ISS, and the first Iranian in space.
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
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
                    margin: "3%",
                  }}
                >
                  <div>
                    <h2 className="apodhead">MARK SHUTTLEWORTH</h2>
                  </div>
                  <p>
                    {" "}
                    Mark Richard Shuttleworth is the founder and CEO of
                    Canonical, the company behind the Linux-based Ubuntu
                    operating system. Shuttleworth became the first South
                    African to travel to space as a space tourist.
                  </p>
                </div>
                <div>
                  <img src={crew3} height={500} width={450} />
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className="apod">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <img src={crew4} height={500} width={450} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexDirection: "column",
                    margin: "3%",
                  }}
                >
                  <div>
                    <h2 className="apodhead">VICTOR GLOVER</h2>
                  </div>

                  <p>
                    {" "}
                    Pilot on the first operational flight of the SpaceX Crew
                    Dragon to the International Space Station. Glover is a
                    commander in the U.S. Navy where he pilots an F/A-18.He was
                    a crew member of Expedition 64, and served as a station
                    systems flight engineer.
                  </p>
                </div>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Crew;
