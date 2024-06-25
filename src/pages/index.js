


import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidenav from '../components/SideNav';
import { Box, Stack, Typography, Select, MenuItem, FormControl, InputLabel, Divider, Grid } from '@mui/material';
import SharedContext from '../context/SharedContext';
import { useContext } from "react";
import routes from '../data/routes'
import Login from "../components/Login";

import roles from '../data/roles'
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import SideBar from "../components/SideBar";
import BASEURL from "../data/baseurl";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import DoughnutChart from "../components/DoughnutChart";
import { current } from '@reduxjs/toolkit';
import { TotalCustomers } from '../components/TotalCustomers';
import { TasksProgress } from '../components/TaskProgress';
import { TotalProfit } from '../components/TotalProfit';
import TotalSales from '../components/TotalSales';
const integrations = [
  {
    id: 'dropbox',
    title: 'Dropbox',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logo-dropbox.png',
    installs: 594,
  //   updatedAt: dayjs().subtract(12, 'minute').toDate(),
  },
  {
    id: 'corporation',
    title: 'Medium Corporation',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logo-medium.png',
    installs: 625,
  //   updatedAt: dayjs().subtract(43, 'minute').subtract(1, 'hour').toDate(),
  },
 
] 
export default function Home() {
 
  // const userRole = 'superadmin'; // Set the user's role here
  const {userRole,token,isSidenavOpen,setToken,setIsSidenavOpen}=useContext(SharedContext);
  const router=useRouter()
  // const [userRole,setUserRole]=useState('superadmin');
  const [isDrawerOpen, setOpenDrawer] = useState(false);
  const [selectDropDown,setSelectDropDown] = useState('dropbox')
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

  const [DashboardData,setDashboard]=useState();
  const [DoughnutData,setDoughnutData]=useState({
    labels: ['Previous Year', 'Current Year', 'Profits'],
    datasets: [
      {
        // label:'Amount',
        data: [0, 0,  0],
        cutout: '50%'
      }


    ],

  })
const [barchatdata,setBarData]= useState(
  {labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets:[
     { 
      label:'previous',
      // data:[monthlyData?.jan,monthlyData?.feb,monthlyData?.mar,monthlyData?.apr ,monthlyData?.may,monthlyData?.jun,monthlyData?.jul,monthlyData?.aug],
      // cutout:'90%'
      backgroundColor:'#0BD19D',
      barThickness:12  ,
      borderRadius:12,
      borderSkipped:false
        }
      ,
      { 
        label:'current',
        // data:[monthlyData?.jan,monthlyData?.feb,monthlyData?.mar,monthlyData?.apr ,monthlyData?.may,monthlyData?.jun,monthlyData?.jul,monthlyData?.aug],
        // cutout:'90%'
        backgroundColor:'#9ca7ff',
        barThickness:12  ,
        // borderRadius:12,
        // borderSkipped:false
          }
        ,
    ],}


)
const getCompaniesData= () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`${BASEURL?.url}/api/transactions/company_summary?company=${selectDropDown}`, requestOptions)
    .then(response => response.json())
    .then(result => result.data)
    .then(result => {
      console.log(result)
      if(!result.is_error)
      setDashboard(result)
    })
    .catch(error => {
    });
}
const getVereChartData=()=>{
  // /api/transactions/sales_by_month?company=
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch(`${BASEURL?.url}/api/transactions/sales_by_month?company=${selectDropDown}`, requestOptions)
    .then(response => response.json())
    .then(result => result.data)
    .then(result => {
      console.log(result)
      setBarData(
        {
      labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets:[
       { 
        label:'previous Year',
        data:[
          Number(result.previous?.filter(each=>each.month==1)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==2)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==3)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==4)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==5)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==6)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==7)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==8)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==9)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==10)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==11)[0]?.total_sales || 0),
          Number(result.previous?.filter(each=>each.month==12)[0]?.total_sales || 0)
        ],cutout:'80%',
        // cutout:'90%'
        // barPercentage: 0.25,
        // categoryPercentage: 0.5,
        backgroundColor:'blue',
        // barThickness:window?.innerWidth>600?12:5,
    
        borderRadius:5,
        borderSkipped:false,
        
    }
        ,
        { 
          label:['Current Year'],
          data:[
            Number(result.current?.filter(each=>each.month==1)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==2)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==3)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==4)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==5)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==6)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==7)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==8)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==9)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==10)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==11)[0]?.total_sales || 0),
            Number(result.current?.filter(each=>each.month==12)[0]?.total_sales || 0)
          ],
          cutout:'80%',
          backgroundColor:'#9ca7ff',
          // barThickness:windo5?.innerWidth>600?12:5,
          borderRadius:5,
          // borderSkipped:false
      },
    
        
      ],
      
    
    
      
    }
      )
      setDoughnutData(
        {
          labels: ['Previous Year', 'Current Year',result?.difference? 'Profits':'Loss'],
          datasets: [
            {
              // label:'Amount',
              data: [result?.previousSum, result?.currentSum, result?.difference ],
              cutout: '50%'
            }
      
      
          ],
      
        }
      )
    
    })
    .catch(error => {
      console.log(error)
    });
}
useEffect(()=>{
  let token=sessionStorage.getItem('token');
  if(token){

    getCompaniesData()
   getVereChartData()
  }
},[selectDropDown])
const handleChangeSelect=(e)=>{
  console.log(e.target.value);
  setSelectDropDown(e.target.value)
}


  return (    <div className="h-screen">
    {
      token?
  
      <div className="md:flex w-full">
      
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
        <div className="flex flex-col justify-center mt-24">
        <Header
          toggleSidenav={toggleSidenav}
          userRole={userRole}
          toggleDrawer={toggleDrawer}
          isDrawerOpen={isDrawerOpen}
        />
        <div className="flex flex-col p-5 gap-10">
          <div className='md:flex gap-5 flex-wrap'>

        <Grid lg={3} sm={6} xs={12} className='mb-5'>
        <TotalCustomers diff={16} trend="down" sx={{ height: '100%' }} value={DashboardData?.user_count} />
      </Grid>
      <Grid lg={3} sm={6} xs={12} className='mb-5'>
        <TasksProgress sx={{ height: '100%' }} value={DashboardData?.total_budget} />
      </Grid>
      <Grid lg={3} sm={6} xs={12} className='mb-5'>
        <TotalSales sx={{ height: '100%' }} value={DashboardData?.total_sales} />
      </Grid>
      <Grid lg={3} sm={6} xs={12} className='mb-5'>
        <TotalProfit sx={{ height: '100%' }} value={DashboardData?.total_profit} />
      </Grid>
      </div>
          <Divider/>
   
         <div className="flex flex-col gap-10">
                    <div className='flex gap-5 flex-wrap'>
                        
                      <div className='md:w-[60%] border rounded-3xl p-5'>
        <BarChart  chartData={barchatdata} />
                      </div>
                      <div className='border rounded-3xl p-5'>
                      <DoughnutChart chartData={DoughnutData} 
      
      options={
        {
          backgroundColor: [
            '#629FF4',
            '#817AF3',
            '#DBA362CC'
          ],
          borderColor: 'transparent'
        }
      } />
                      </div>
       </div>
       <div className='border rounded-3xl p-5'>

        <LineChart className='row-span-1' chartData={barchatdata}/>
        </div>
         </div>

          </div>
      
      
          </div>

      </div>

     

    </div>:
        <Box
        sx={{
          display: { xs: 'flex', lg: 'grid' },
          flexDirection: 'column',
          gridTemplateColumns: '1fr 1fr',
          minHeight: '100%',
        }}
      >
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
          <Box sx={{ p: 3 }}>
            <Box  href='/' sx={{ display: 'inline-block', fontSize: 0 }}>
              {/* <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} /> */}
              LOGO
            </Box>
          </Box>
          <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
            <Box sx={{ maxWidth: '450px', width: '100%' }}>
              <Login/>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'var(--mui-palette-common-white)',
            display: { xs: 'none', lg: 'flex' },
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Stack spacing={3}>
            {/* <Stack spacing={1}>
              <Typography color="inherit" sx={{ fontSize: '24px', lineHeight: '32px', textAlign: 'center' }} variant="h1">
                Welcome to{' '}
                <Box component="span" sx={{ color: '#15b79e' }}>
                  Devias Kit
                </Box>
              </Typography>
              <Typography align="center" variant="subtitle1">
                A professional template that comes with ready-to-use MUI components.
              </Typography>
            </Stack> */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                component="img"
                alt="Widgets"
                src="/assets/auth-widgets.png"
                sx={{ height: 'auto', width: '100%', maxWidth: '600px' }}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
    
    }

    </div>
  );
}
