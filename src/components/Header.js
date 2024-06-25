// /* eslint-disable @next/next/no-img-element */

// import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import logo from '../../public/assets/logo--dark.svg';
import Image from 'next/image';


import React, { useEffect, useRef, useState } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Stack,
  CssBaseline,
  useScrollTrigger,
  Avatar,
  TextField,
  Button,
  Popover,
  Box,
  Typography,
  Divider,
  MenuList,
  MenuItem,
  ListItemIcon
} from "@mui/material"; import { Logout, Menu, NotificationAdd, NotificationImportant, PersonOffOutlined, PersonOutlineRounded, Settings, VerifiedUser } from '@mui/icons-material';
import { useContext } from "react";
import PropTypes from "prop-types";
import sharedContext from '../context/SharedContext';
import BASEURL from "../data/baseurl";
import { User } from "@phosphor-icons/react";
import Link from "next/link";
function ElevationScroll(props) {




  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Header = ({ toggleSidenav, props, toggleDrawer, isDrawerOpen }) => {
  // const [token, setToken]=useState();
  // const [userData, setUserData]=useState();
  const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen } = useContext(sharedContext);
  const anchorEl =useRef();
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const onClose=()=>{
    setOpen(false)
  }
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

  const router = useRouter();
  const handleSignOut=()=>{
    router.push('/')
    sessionStorage.clear("token")
    sessionStorage.clear("userId")
    sessionStorage.clear("parentId")
  }


  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }} className="header-stack z-10 ">
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <Toolbar style={{ padding: '10px', backgroundColor: 'white', width: '100%',borderBottom:'solid 1px gray' }}>
            {/* 
        <SignInDrawer
          anchor="right"
          toggleDrawer={toggleDrawer}
          isOpen={isDrawerOpen}

        /> */}

            {/* Search Field */}
            {/* <TextField variant='outlined' placeholder="Search" className='ml-auto' /> */}

            {/* Username and Avatar */}
            {/* <Image src={logo}   alt="logo image" className="bg-black" /> */}
{/* <span className="font-bold text-3xl text-primary">LOGO</span> */}
            <div className="hidden md:flex items-center ml-auto">
              {token ?
          
                <div className="flex items-center gap-3 ">
                  <span className='bg-primary text-white py-2 px-4  rounded-full font-bold text-xl cursor-pointer' onClick={handleOpen} ref={anchorEl}>{userDetails?.firstName.substring(0,1).toUpperCase()}</span>
                  <Popover
      anchorEl={anchorEl.current}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{userDetails?.firstName}</Typography>
        <Typography color="text.secondary" variant="body2">
          {userDetails?.email}
        </Typography>
      </Box>
      <Divider />
      {/* {userRole!='Admin'&& */}
        <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <Link href={'/settings'} onClick={onClose} className="flex items-center p-2 gap-3">
          
            <Settings/>
        
         <span>
          
          Settings
          </span> 
        </Link>
        <Link href={'/profile'} onClick={onClose}  className="flex items-center p-2 gap-3">
          <PersonOutlineRounded/>
          <span>Profile</span>
        </Link>
        <MenuItem onClick={handleSignOut}>
           <Logout/>
        <span>Sign out
          </span>  
        </MenuItem>
      </MenuList>
      {/* } */}
    </Popover>
                </div>
                // </div>
                : <Button className="hidden md:inline" variant="outlined" onClick={(event) => router.push('/')}>Login</Button>
              }
            </div>

            <div className="md:hidden flex justify-between w-full gap-3 items-center">
            
              <Image src={logo}   alt="logo image" className=" " />
        
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleSidenav}
                sx={{
                  textAlign: "right",
                }}

              >
                <Menu fontSize="large" />
              </IconButton>
            </div>

          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Stack>
  );
};

export default Header;
