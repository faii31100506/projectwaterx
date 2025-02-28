import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilDrop,
  cilBarChart,
  cilDescription,
  cilSettings,
  cilSpeedometer,
  cilPeople,
  cilMap,
  cilAccountLogout,
  cilFolder,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import '../src/views/waterx/waterx.css';
import Swal from 'sweetalert2';
import { handleBreakpoints } from '@mui/system';
// import { useUser } from './views/pages/login/UserContext';
import axios from 'axios';
// import { useState, useEffect } from 'react';

const handlelogout = () => {
  alert('อกก');
};
const user2 = JSON.parse(localStorage.getItem('myObject111'));

// const { userId } = useUser();

const _nav = [
  // {
  //   component: CNavItem,
  //   name: 'Dashboard',
  //   to: '/dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'ข้อมูลแผนที่',
  //   to: '/water-map',
  //   icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'ข้อมูลผู้ใช้น้ำ',
    to: '/water-register',
    icon: <CIcon icon={cilPeople} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'ข้อมูลมิเตอร์',
    to: '/water-meter',
    icon: <CIcon icon={cilDrop} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'จดค่าน้ำ',
    to: '/water-meter-ft',
    icon: <CIcon icon={cilDrop} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'ข้อมูลพนักงาน',
    to: '/water-user-role',
    icon: <CIcon icon={cilPeople} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'ข้อมูลส่งเสริม',
    to: '/water-setting-fee',
    icon: <CIcon icon={cilFolder} customClassName='nav-icon' />,
  },

  {
    component: CNavItem,
    name: 'ข้อมูลสถิติการใช้น้ำ',
    to: '/water-dashboard',
    icon: <CIcon icon={cilBarChart} customClassName='nav-icon' />,
  },

  // {
  //   component: CNavItem,
  //   name: "ข้อมูลท่อน้ำ",
  //   to: "/water-pipe",
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'ข้อมูลแหล่งกักเก็บน้ำ',
  //   to: '/water-stored',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'ข้อมูลเครื่องปั้มน้ำ',
  //   to: '/water-pump',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'ข้อมูลทะเบียน',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'ป.17',
  //       to: '/water-reg-data-17',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'ป.31',
  //       to: '/water-reg-data-31',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'ป.32',
  //       to: '/water-reg-data-32',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'คุมใบเสร็จรับเงิน',
  //       to: '/water-reg-data-receipt',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: "รายงาน",
  //   icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "รายงานการใช้น้ำ",
  //       to: "/water-report-usage",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "ภาษีมูลค่าเพิ่ม",
  //       to: "/water-report-taxes",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "ผู้จดมาตรน้ำ",
  //       to: "/water-report-agent",
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: "ตั้งค่า",
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "เอกสาร",
  //       to: "/water-setting-docs",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "ค่าธรรมเนียม",
  //       to: "/water-setting-fee",
  //     },
  //   ],
  // },

  {
    component: CNavItem,
    name: 'ออกระบบ',
    to: '/login',
    // to: (onclick = { handlelogout }),
    icon: <CIcon icon={cilAccountLogout} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: user2,
    to: '/water-register',
    // to: (onclick = { handlelogout }),
    // icon: <CIcon icon={cilAccountLogout} customClassName='nav-icon' />,
  },
];

export default _nav;
