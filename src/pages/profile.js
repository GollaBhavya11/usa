import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Sidenav from '../components/SideNav';
import sharedContext from '../context/SharedContext';
import { Login } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { AccountInfo } from '../components/AccountInfo';
import { AccountDetailsForm } from '../components/AccountDetailsForm';
import BASEURL from '../data/baseurl';

function settings() {
    const {userRole,token,isSidenavOpen,setToken,setIsSidenavOpen}=useContext(sharedContext);
  const router=useRouter()
  // const [userRole,setUserRole]=useState('superadmin');
  const [isDrawerOpen, setOpenDrawer] = useState(false);

  const toggleDrawer = (anchor, open, event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };
  const toggleSidenav = () => {
    setIsSidenavOpen(!isSidenavOpen);
  };
  const [userDetails,setUserDetails]=useState();
  const getuserDetails=()=>{
    const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`${BASEURL.url}/api/user/details`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    setUserDetails(result.user)

  })
  .catch((error) => console.error(error));
  }

  useEffect(()=>{
    getuserDetails();
  },[])

  return (
   <>
   {
      token?
  
      <div className="md:flex h-screen w-full">
      
      {/* Sidenav (desktop mode) */}
      <div
        className={`hidden md:block md:w-1/5 bg-[#FFFFFF] `}
      >
        <Sidenav
          role={userRole}
          // navigation={roles[userRole]}
          isSidenavOpen={isSidenavOpen}
          toggleSidenav={toggleSidenav}        
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
          />
      <SideBar/>
      </div>

  
      <div className="md:w-4/5">
        {/* Header */}
       

        {/* Main Content */}
        <div className="flex flex-col mt-24">
        <Header
          toggleSidenav={toggleSidenav}
          userRole={userRole}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
        <Stack spacing={3}>
      <div>
        <Typography variant="h4">Account</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo userDetails={userDetails}/>
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm userDetails={userDetails} setUserDetails={setUserDetails}/>
        </Grid>
      </Grid>
    </Stack>
          </div>

      </div>

     

    </div>:<Login></Login>}
   </>
  )
}

export default settings