import Feedback from '../components/Feedback';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Sidenav from '../components/SideNav';
import { UpdatePassword } from '../components/UpdatePassword';
import sharedContext from '../context/SharedContext';
import { Login } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import BASEURL from '../data/baseurl';

function feedback() {
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
  const [feedbackList,setFeedbackList]=useState([])
  const getListOfFeedback=()=>{
    fetch(`${BASEURL.url}/api/feedback/list`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res=>res.json())
   .then(data=>{
    console.log(data);
    if(!data.is_error){
      setFeedbackList(data.user)
    }

   })
   .catch(err=>console.log(err))
  }
  useEffect(()=>{
    getListOfFeedback()
  },[])


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
           {userRole!='Admin' ? <Feedback/>:
           <FeedbackList feedbackList={feedbackList}/>
           }
          </div>

      </div>

     

    </div>:<Login></Login>}
   </>
  )
}

export default feedback