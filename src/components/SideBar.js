import React, { useContext, useEffect, useState } from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/icons-material/Menu";
import { Close, HomeOutlined, LogoutOutlined, ApprovalOutlined, ReceiptLongOutlined, AccountBalanceWalletOutlined, HomeMaxOutlined, HomeRounded, PieChart, VerifiedUser, AddAPhoto, PersonOffOutlined, PersonOutlined, UpdateSharp, SettingsOutlined, PieChartOutline, FeedbackOutlined, IntegrationInstructions, LinkOutlined, Person2Outlined, DashboardSharp, Person3Outlined, PersonSearchRounded } from "@mui/icons-material";

import Link from "next/link";
import { List } from "@mui/material";
import routes from "../data/routes";
import sharedContext from "../context/SharedContext";
import roles from "../data/roles";
import Image from "next/image";
import Home from '../utils/Home.svg'
import HomeAcv from '../utils/HomeAcv.svg'
import approval from '../utils/approval.svg'
import approvalAcv from '../utils/approvalAcv.svg'
import receipt from '../utils/receipt.svg'
import receiptAcv from '../utils/receiptAcv.svg'
import payroll from '../utils/payroll.svg'
import payrollAcv from '../utils/payrollAcv.svg'
import logout from '../utils/Logout.svg'
import onboard from '../utils/onboard.svg'
import onboardAcv from '../utils/onboardAcv.svg'
import Expenses from '../utils/expence.svg'
import expenceAcv from '../utils/activeexpence.svg'
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast'
import { ChartLineUp, ChartPieSlice, User, Users } from "@phosphor-icons/react";
import logo from '../../public/logo.svg'

const SideBar = () => {

  const router = useRouter();
  const { userRole, setUserRole, setToken } = useContext(sharedContext)


  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/')
    toast.success('logged out Successfully')
    setToken(null);
    setUserRole('USER')
  }
  const getIcon = (item, isActive) => {
    switch (item) {
      case 'Overview': return <DashboardSharp/>;
      case 'Users': return <PersonSearchRounded size={25}/>;
      case 'Profile': return <Person2Outlined/>;
      case 'Settings': return <SettingsOutlined/>;
      case 'Feedback': return <FeedbackOutlined/>;
      case 'Integrations': return <LinkOutlined/>
    }
  }
  return (
    <>
      <List className="flex flex-col justify-between bg-primary p-3" style={{
        height: '100vh', position:'fixed',
        width:'15%',zIndex: 20
      }}>
         <div className="">
         <Image src={logo}   alt="logo image" className="bg-black mb-10" />
          {roles[userRole]?.map((item, index) => (
            <div key={index} name={item} className={`p-4 m-2 rounded-lg flex  text-white items-center gap-4  ${router.pathname === routes[item] ? ' bg-secondary font-semibold' : ''}`}>
              {getIcon(item, router.pathname === routes[item])}
              <Link href={`${routes[item]}`}>{item}</Link></div>
          ))}
        </div>
        <div onClick={handleLogout} className="p-4 flex items-center gap-4 cursor-pointer">
          <Image

            alt="logout"
            src={logout}
            quality={100}
            width={23}
            height={23}

          /> <span style={{ color: '#667085' }}>Logout</span>
        </div>
      </List>
    </>
  );
};

export default SideBar;