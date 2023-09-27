import React from 'react'
import "./waterx.css"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from 'react';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import CIcon from '@coreui/icons-react'
import {
  cilSearch,
} from '@coreui/icons'
import { CForm, CFormInput, CFormSelect } from '@coreui/react';

const WaterUserRole = () => {
    const data0=[
        {
            name:"นายทำดี สีสะอาด",
            email:"Tumdee@gmail.com",
            role:"Administrator",
            specify:"หัวหน้าฝ่าย xxxx",
            status:"active"
        },
        {
            name:"นางสมศรี มานะ",
            email:"somdee@gmail.com",
            role:"IT Administrator",
            specify:"เจ้าพนักงาน xxxx",
            status:"active"
        },
        {
            name:"นางวิภาวดี หทัยงาม",
            email:"vipavadee@gmail.com",
            role:"Administrator",
            specify:"เจ้าพนักงาน xxxx",
            status:"active"
        },
        {
            name:"นายมานะ ขยันดี",
            email:"maanaaKD@gmail.com",
            role:"Users",
            specify:"เจ้าพนักงาน xxxx",
            status:"active"
        },
        {
            name:"นางสาวแอนนา มณีงาม",
            email:"anna211@gmail.com",
            role:"Administrator",
            specify:"เจ้าพนักงาน xxxx",
            status:"active"
        },
        {
            name:"นายธามไท สีขาว",
            email:"Timethai@gmail.com",
            role:"IT Administrator",
            specify:"เจ้าพนักงาน xxxx",
            status:"suspend"
        }
    ]

    return (
   <>

        <h4 className="mx-5 mt-5">ผู้ใช้ทั้งหมดที่มีบทบาท</h4>
        <DataTable value={data0} 
          paginator
          rows={8}
          paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
          currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
        >
          <Column field="check" header="O"></Column>
          <Column field="name" header="ชื่อ นามสกุล"></Column>
          <Column field="email" header="EMAIL"></Column>
          <Column field="role" header="บทบาท"></Column>
          <Column field="specify" header="ตำแหน่ง"></Column>
          <Column field="status" header="สถานะ"></Column>
          <Column field="agent" header=""></Column>
        </DataTable>
   </>
  )
}

export default WaterUserRole