import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidenav from '../components/SideNav';
import Main from '../components/Main';
import Menu from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import SharedContext from '../context/SharedContext';
import { useContext } from "react";
import routes from '../data/routes'
import Login from "../components/Login";


import { useRouter } from "next/router";
import SideBar from "../components/SideBar";
export default function Users() {
 
  const {userRole,token,isSidenavOpen,setToken,setIsSidenavOpen}=useContext(SharedContext);
  const router=useRouter()
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

  // useEffect(()=>{
  //   if(isSidenavOpen){
  //     toggleSidenav()
  //   }
  // },[])

  return (    <>
    {
      token?
  
      <div className="md:flex h-screen w-full">
      
      {/* Sidenav (desktop mode) */}
      <div
        className={`hidden md:block md:w-1/6 bg-[#FFFFFF] `}
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

  
      <div className="md:w-full">
        {/* Header */}

        {/* Main Content */}
        <div className='flex flex-col'>
        <Header
          toggleSidenav={toggleSidenav}
          userRole={userRole}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />

        <Main/>
        </div>
        
      </div>

     

    </div>:<Login></Login>}

    </>
  );
}
