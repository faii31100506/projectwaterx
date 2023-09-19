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

import {
  CFormCheck,
  CFormInput,
  CForm,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'






const WaterMeterData = () => {
  const [filters,setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
    
  const [meterpage,setMeterpage] = useState('0')
  
  const alertBro = () => {
    alert("ทดสอบ")
  }
  
  const EditIcon = () => {
    return(
      <button className="buttonpic"><img src={require("../../assets/images/edit.png")} width={30} height={30}  onClick={alertBro}/></button>
    )
  
  }
  const RemoveIcon = () => {
    return(
      <button className='buttonpic'><img src={require("../../assets/images/remove.png")} width={30} height={30}  onClick={alertBro}/></button>
    )
  
  }

  const data = [
    {
      agent:"นายทำดี สีสะอาด",
      agentid:"0-112734-56",
      guage:"56/1 หมู่ 3 ต.จรเข้เผือก",
      typeusage:"อุปโภค บริโภค",
      wstatus:"ปกติ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ดิจิตอล",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นางศรีนวล มานะ",
      agentid:"0-112734-56",
      guage:"32 หมู่ ต.จรเข้เผือก",
      typeusage:"อุปโภค บริโภค",
      wstatus:"ระงับใช้น้ำชั่วคราว",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ดิจิตอล",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นายมีสุข ขยันดี",
      agentid:"0-112734-56",
      guage:"56/2 หมู่ 4 ต.จรเข้เผือก",
      typeusage:"การเกษตร",
      wstatus:"ปกติ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ธรรมดา",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นางสาวฤทัย ใจดี",
      agentid:"0-112734-56",
      guage:"11/1 หมู่ 4 ต.จรเข้เผือก",
      typeusage:"ประปาชั่วคราว",
      wstatus:"ปกติ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ดิจิตอล",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นายสะอาด บุญงาม",
      agentid:"0-112734-56",
      guage:"39/2 หมู่ 4 ต.จรเข้เผือก",
      typeusage:"อุปโภค บริโภค",
      wstatus:"ปกติ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ธรรมดา",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นายสะอาด บุญงาม",
      agentid:"0-112734-56",
      guage:"88 หมู่ 4 ต.จรเข้เผือก",
      typeusage:"อุปโภค บริโภค",
      wstatus:"ค้างชำระ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ดิจิตอล",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นายสะอาด บุญงาม",
      agentid:"0-112734-56",
      guage:"88 หมู่ 4 ต.จรเข้เผือก",
      typeusage:"อุปโภค บริโภค",
      wstatus:"ปกติ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ธรรมดา",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
    {
      agent:"นายสะอาด บุญงาม",
      agentid:"0-112734-56",
      guage:"88 หมู่ 4 ต.จรเข้เผือก",
      typeusage:"การเกษตร",
      wstatus:"ปกติ",
      localelink:"2",
      editstat:"2",
      rem:"2",
      pepega:"2",
      metertype:"ธรรมดา",
      metersize:"1 นิ้ว",
      metermat:"ทองเหลือง",
    },
  ];


  let content;
  if (meterpage === '0'){
    content = (
      <>

      <h2 className="mt-4 ms-4">ข้อมูลมิเตอร์</h2>
      <div className="d-flex justify-content-between mt-4 ms-4">
      
      <div className="p-input-icon-left">
    <CIcon icon={cilSearch}></CIcon>
    <InputText  className="custom-input-search" placeholder='ค้นหา'
        onInput={(e) =>
          setFilters({
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
          })
        }
        />

</div>
      <button className="wblue-button me-5" onClick={() =>setMeterpage('1')}>+ เพิ่มข้อมูลมิเตอร์</button>
    </div>
    <div className="d-flex justify-content-left mt-2 ms-4">
    <button className="wblue-button" >รายการมิเตอร์ทั้งหมด</button>
    <button className="wblue-button" >รายการมิเตอร์ที่ถูกใช้แล้ว</button>
    <button className="wblue-button" >รายการมิเตอร์ที่ยังไม่ถูกใช้</button>
    </div>

        <DataTable value={data} header="รายชื่อ" filters={filters} 
        paginator
        rows={8}
        paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
        currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
        >

          <Column field="agentid" header="เลขที่ประจำมาตรวัดน้ำ"></Column>
          <Column field="metertype" header="ประเภทมิเตอร์"></Column>
          <Column field="metersize" header="ขนาดมิเตอร์"></Column>
          <Column field="metermat" header="วัสดุมิเตอร์"></Column>
          <Column field="agent" header="เจ้าของมาตรวัดน้ำ"></Column>
          <Column field="rem" body={EditIcon} header=""></Column>
          <Column field="localelink" body={RemoveIcon} header=""></Column>
        </DataTable>
 
      </>
    );
  }
  if (meterpage === '1')
  {
    content = (
      <>


      <div className="d-flex flex-column">
      <div className="d-flex mt-4">
      <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() =>setMeterpage('0')}/>
        <h2 className="ms-2">เพิ่มข้อมูลมิเตอร์</h2>
      </div>


      <div className="customcontainer2 d-flex flex-column">
      <div className="d-flex">
      <h5 className="w-20">ข้อมูลมาตรวัดน้ำ</h5>
      <div className="d-flex w-25">
      <CForm>
        <CFormInput className="mb-2 w-full"
    type=""
    id=""
    label="เลขที่ประจำมาตรวัดน้ำ"
    placeholder=""
    aria-describedby="exampleFormControlInputHelpInline"
  />
      </CForm>
      </div>
      <div className="d-flex w-25">
      <CForm className="w-75">
      <CFormSelect className="mt-2 mb-2" label="ประเภทมาตรวัดน้ำ">
  <option></option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3" disabled>Three</option>
      </CFormSelect>
      </CForm>
      </div>
      <div className="d-flex w-25">
      <CForm className="w-75">

      <CFormSelect className="mt-2 mb-2" label="ขนาดมาตรวัดน้ำ">
  <option></option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3" disabled>Three</option>
      </CFormSelect>
      </CForm>
      </div>
      



</div>
<div className="d-flex mb-5">
  <div className="w-20"></div>
<CForm className="w-15">

      <CFormSelect className="mt-2 mb-2" label="วัสดุมาตรวัดน้ำ">
  <option></option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3" disabled>Three</option>
      </CFormSelect>
      </CForm>
</div>
      <button className="wblue-button-unrounded mt-auto mb-5 w-15 text-center" onClick={alertBro}>บันทึกข้อมูล</button>
    
      </div>
      </div>

      </>
    );
  }

  
    return (
<>
{content}

</>
  )
}

export default WaterMeterData
