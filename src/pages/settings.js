import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Sidenav from '../components/SideNav';
import { UpdatePassword } from '../components/UpdatePassword';
import sharedContext from '../context/SharedContext';
import { Login } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'

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


  return (
   <>
   {
      token?
  
      <div className="md:flex h-screen w-full">
      
      {/* Sidenav (desktop mode) */}
      <div
        className={`hidden md:block md:w-1/5 bg-[#FFFFFF]`}
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
        <div className="flex flex-col mt-24 p-5">
        <Header
          toggleSidenav={toggleSidenav}
          userRole={userRole}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
            <UpdatePassword/>
          </div>

      </div>

     

    </div>:<Login></Login>}
   </>
  )
}

export default settings