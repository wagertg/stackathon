import React, { useState } from "react";
import tech1 from "../Images/starbase.jpeg";
import tech2 from "../Images/falcon.jpeg";
import tech3 from "../Images/space-capsule-portrait.jpeg";
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
        <Box sx={{ p: 3 }}>
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

const Tech = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <h1 className="heading">TECHNOLOGY</h1>

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <StyledTabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
              centered
            >
              <StyledTab label="01 STARBASE" {...a11yProps(0)} />
              <StyledTab label="02 LAUNCH" {...a11yProps(1)} />
              <StyledTab label="03 SPACE CAPSULE" {...a11yProps(2)} />
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
                    <h2 className="apodhead">01 STARBASE</h2>
                  </div>
                  <p>
                    {" "}
                    A spaceport or cosmodrome is a site for launching (or
                    receiving) spacecraft, by analogy to the seaport for ships
                    or airport for aircraft. Based in the famous Cape Canaveral,
                    our spaceport is ideally situated to take advantage of the
                    Earth’s rotation for launch.
                  </p>
                </div>
                <div>
                  <img className="tech" src={tech1} height={450} width={450} />
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
                  <img className="tech" src={tech2} height={500} width={450} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: "3%",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <h2 className="apodhead">02 LAUNCH VEHICLE</h2>
                  </div>
                  <p style={{ display: "flex", textAlign: "end" }}>
                    {" "}
                    A launch vehicle or carrier rocket is a rocket-propelled
                    vehicle used to carry a payload from Earth's surface to
                    space, usually to Earth orbit or beyond. Our WEB-X carrier
                    rocket is the most powerful in operation. Standing 150
                    metres tall, it's quite an awe-inspiring sight on the launch
                    pad!
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
                    <h2 className="apodhead">03 SPACE CAPSULE</h2>
                  </div>
                  <p>
                    {" "}
                    A space capsule is an often-crewed spacecraft that uses a
                    blunt-body reentry capsule to reenter the Earth's atmosphere
                    without wings. Our capsule is where you'll spend your time
                    during the flight. It includes a space gym, cinema, and
                    plenty of other activities to keep you entertained.
                  </p>
                </div>
                <div>
                  <img className="tech" src={tech3} height={450} width={450} />
                </div>
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Tech;
