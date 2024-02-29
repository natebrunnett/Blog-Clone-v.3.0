import React from 'react'; 
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

let MainListItems = ({user}) => {

  let navigate = useNavigate();

 return(
  <React.Fragment>
    <ListItemButton onClick={() => { if (user === null) {alert("Log on first")}
                  else{
                    navigate("/Profile")}
                }
              }>
      <ListItemIcon>
        <DashboardIcon/>
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton onClick={() => { if (user === null) {alert("Log on first")}
                  else{
                    navigate("/AccountSettings")}
                }
              }>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItemButton>
  </React.Fragment>

)
}

export default MainListItems