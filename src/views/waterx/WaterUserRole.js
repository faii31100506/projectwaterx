import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from 'react';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./waterx.css"
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import { InputSwitch } from 'primereact/inputswitch';
import { Steps } from 'primereact/steps';
import { CFormSwitch } from '@coreui/react'
import {
    CAvatar,
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CImage,
    CProgress,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormCheck,
    CFormInput,
    CForm,
    CFormSelect,
    CFormTextarea,
  } from '@coreui/react'
  import { CChartLine } from '@coreui/react-chartjs'
  import { getStyle, hexToRgba } from '@coreui/utils'
  import CIcon from '@coreui/icons-react'
  import {
    cilSearch,
    cilChevronLeft,
  } from '@coreui/icons'
  import { Row } from 'primereact/row';
  

const WaterUserRole = () => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      })
    const [addrolevisible, setAddrolevisible] = useState(false)
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [checked6, setChecked6] = useState(false);
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
    let dialogcontent1;
    dialogcontent1=(
        <>
        <h5 className="mx-4">เพิ่มบทบาท</h5>
        <div className="mx-4 mt-3">
        <CFormInput placeholder="พิมพ์ชื่อบทบาทภาษาอังกฤษ"/>
        </div>
        <div className="mx-4 mt-3">
        <CFormInput placeholder="พิมพ์ชื่อบทบาทภาษาไทย"/>
        </div>
        <div className="mx-4 mt-3">
        <CFormSelect>
            <option>Prara - Adminstrator</option>
        </CFormSelect>

        </div>
        <div className="role-modal-container mt-4 pt-1 d-flex flex-column">
        
        <div className="d-flex justify-content-center mt-3 mbg-white">
            <div className="w-60 text-start">User Management</div>
        <InputSwitch checked={checked1} onChange={(e) => setChecked1(e.value)} />
        </div>
        <div className="d-flex justify-content-center mt-3 mbg-white">
        <div className="w-60 text-start">Rule Base Management</div>
        <InputSwitch checked={checked2} onChange={(e) => setChecked2(e.value)} />
        </div>
        <div className="d-flex justify-content-center mt-3 mbg-white">
        <div className="w-60 text-start">Configuration</div>
        <InputSwitch checked={checked3} onChange={(e) => setChecked3(e.value)} />
        </div>
        <div className="d-flex justify-content-center mt-3 mbg-white">
        <div className="w-60 text-start">Investigator Module</div>
        <InputSwitch checked={checked4} onChange={(e) => setChecked4(e.value)} />
        </div>
        <div className="d-flex justify-content-center mt-3 mbg-white">
        <div className="w-60 text-start">อนุมัติขอข้อมูลภายนอก</div>
        <InputSwitch checked={checked5} onChange={(e) => setChecked5(e.value)} />
        </div>
        <div className="d-flex justify-content-center mt-3 mb-5 mbg-white">
        <div className="w-60 text-start">จ่ายงาน</div>
        <InputSwitch checked={checked6} onChange={(e) => setChecked6(e.value)} />
        </div>
        </div>
        <button className="wblue-button-unrounded w-50 mt-4 text-center" onClick={()=> alert("go")}>เพิ่มบทบาท</button>
        </>
    )
    return (
   <>
        <div className="d-flex flex-column mb-5">
        <div className="d-flex mt-4">
            <h4 className="mx-5">รายการบทบาท</h4>

          </div>
          <div className="d-flex mt-3">
            <div className="user-role-card w-33">
            <div className="mt-4 mx-4 mb-4">จำนวนทั้งหมด 6 คน</div>
            <h5 className="mx-4">Administrator</h5>
            <button className="mx-4 buttonpicblue w-10 mb-2" onClick={()=>alert("go")}>แก้ไข</button>
            </div>
            <div className="user-role-card w-33">
            <div className="mt-4 mx-4 mb-4">จำนวนทั้งหมด 8 คน</div>
            <h5 className="mx-4">IT Administrator</h5>
            <button className="mx-4 buttonpicblue w-10 mb-2" onClick={()=>alert("go")}>แก้ไข</button>
            </div>
            <div className="user-role-card w-33">
            <div className="mt-4 mx-4 mb-4">จำนวนทั้งหมด 12 คน</div>
            <h5 className="mx-4">Users</h5>
            <button className="mx-4 buttonpicblue w-10 mb-2" onClick={()=>alert("go")}>แก้ไข</button>
            </div>
            </div>
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 mx-5 text-center" onClick={() => setAddrolevisible(true)}>เพิ่มบทบาท</button>
        <div className="d-flex mt-5 justify-content-between">
        <h4 className="mx-5">ผู้ใช้ทั้งหมดที่มีบทบาท</h4>
        <div className="p-input-icon-left mx-5">
              <CIcon icon={cilSearch}></CIcon>
              <InputText className="p-inputtext-sm rounded-pill" placeholder='ค้นหา'
                onInput={(e) =>
                  setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                  })
                }
              />
            </div>
            </div>
        <DataTable value={data0} header="ผู้ใช้ทั้งหมดที่มีบทบาท"
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
        </div>
    
      <Dialog visible={addrolevisible}
        onHide={() => setAddrolevisible(false)}
        draggable={false}
        dismissableMask
        position="right"
        style={{ width: "28rem", height: "100rem" }}

      >
        {dialogcontent1}
      </Dialog>
   </>
  )
}

export default WaterUserRole