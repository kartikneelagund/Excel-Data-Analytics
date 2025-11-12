import "./Setting.css";
import { iconsImgs } from "../utils/images";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import Profile from "./Profile"
import PersonalDetails from "./PersonalDetails"
import MyAccount from "./MyAccount";
import ChangePassword from "./ChangePassword";




function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Setting = () => {
   const [value, setValue] = useState(0);
 
   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
 
  return (
    <div className="grid-two-item grid-common grid-c4">
      <div className="grid-c-top text-silver-v1">
        <h2 className="lg-value">Settings</h2>
      </div>

      <div className="grid-c4-content bg-jet">
        <Box  sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs className="tabs" value={value} onChange={handleChange} >
                  <Tab label="Profile" {...a11yProps(0)} />
                  <Tab label="Personal Details" {...a11yProps(1)} />
                  <Tab label="My Acount" {...a11yProps(2)} />
                   <Tab label="Change Password" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
               <Profile/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <PersonalDetails/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <MyAccount/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <ChangePassword/>
              </CustomTabPanel>
              
            </Box>
      </div>
    </div>
  );
};

// Helper to render content for each tab
function TabPanel({ children, value, index }) {
  return value === index ? <Box p={3}>{children}</Box> : null;
}

export default Setting;
