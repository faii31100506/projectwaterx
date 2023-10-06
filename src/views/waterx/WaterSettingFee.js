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
import { Steps } from 'primereact/steps';

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
import { getAllByDisplayValue } from '@testing-library/react';

const WaterSettingFee = () => {
  const [settingPage, setSettingPage] = useState("13");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const handleSelectPage = (a) => {
    setSettingPage(a);
  };
  const EditIcon = () => {
    return (
      <button className="buttonpic"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={()=>alert("go")} /></button>
    )
  }
  const RemoveIcon = () => {
    return (
      <button className='buttonpic'><img src={require("../../assets/images/remove.png")} width={30} height={30} onClick={()=>alert("go")} /></button>
    )
  }

  const data0 = [
    {
      a:"อัตราค่าน้ำประปา",
      b:"ต่อครั้ง",
      c:"5"
    },
    {
      a:"ค่าธรรมเนียมการขอใช้น้ำ",
      b:"ต่อครั้ง",
      c:"100"
    },
    {
      a:"ค่ามิเตอร์น้ำ",
      b:"ต่อครั้ง",
      c:"350 - 500"
    },
    {
      a:"ค่าบำรังรักษามิเตอร์",
      b:"ต่อครั้ง",
      c:"5"
    },
    {
      a:"ค่าใบอนุญาติจำหน่ายน้ำประปา",
      b:"ต่อครั้ง",
      c:"500"
    },
    {
      a:"การใช้น้ำทดลองดับเพลิง",
      b:"ต่อครั้ง",
      c:"100"
    },
  ];
  const data1 = [
    {
      a:"1-50",
      b:"5",
      c:"ข้าวโพด"
    },
    {
      a:"51-100",
      b:"6",
      c:"องุ่น"
    },
    {
      a:">101",
      b:"7",
      c:"แตงโม"
    }
  ];
  const data2 = [
    {
      a:"1/2",
      b:"100",
    },
    {
      a:"3/4",
      b:"200",
    },
    {
      a:"1",
      b:"500",
    }
  ];
  const data3 = [
    {
      a:"1/2",
      b:"350-500"
    },
    {
      a:"3/4",
      b:"1100-1200"
    },
    {
      a:"1",
      b:"1200-1800"
    }
  ];
  const data4 = [
    {
      a:"1/2",
      b:"5"
    },
    {
      a:"3/4",
      b:"20"
    },
    {
      a:"1",
      b:"35"
    }
  ];
  const data5 = [
    {
      a:"ค่าใบอนุญาติจำหน่ายน้ำประปา",
      b:"500"
    }
  ];
  const data6 = [
    {
      a:"ค่าการใช้น้ำทดลองดับเพลิง",
      b:"100"
    }
  ];
  const data7 = [
    {
      a:"ธรรมดา",
      b:"1/2",
      c:"xxx"
    },
    {
      a:"ธรรมดา",
      b:"3/4",
      c:"xxx"
    },
    {
      a:"ธรรมดา",
      b:"1",
      c:"xxx"
    }
  ];
  const data8 = [
    {
      a:"การโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ",
      b:"50",
    }
  ];
  const data9 = [
    {
      a:"ค่าปรับการสูบน้ำจากท่อประปา",
      b:"500"
    }
  ];
  const data10 = [
    {
      a:"ทั่วไป",
      b:"200"
    },
    {
      a:"บ่อเลี้ยงกุ้ง",
      b:"500"
    }
  ];
  const data11 = [
    {
      a:"ค่าปรับการทุจริต",
      b:"500"
    }
  ];
  const data12 = [
    {
      a:"1/2",
      b:"10"
    },
    {
      a:"3/4",
      b:"15"
    },
    {
      a:"1",
      b:"24"
    },
    {
      a:"1/2",
      b:"100"
    },
  ];
  const data13 = [
    {
      a:"ผู้สูงอายุ",
      b:"10 %"
    },
    {
      a:"ผู้พิการ",
      b:"15 %"
    },
    {
      a:"ผู้ด้วยโอกาส",
      b:"25 %"
    },
    {
      a:"ผู้ใช้น้ำไม่เกินอัตราที่กำหนด",
      b:"20 %"
    },
  ];

  let content;
  if (settingPage === "0") {
    content = (
      <>

        <div className="d-flex mt-5 ml-10">
          <div className="p-input-icon-left ms-2">
            <CIcon icon={cilSearch}></CIcon>
            <InputText className="input-search rounded-pill" placeholder='ค้นหา'
              onInput={(e) =>
                setFilters({
                  global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                })
              }
            />

          </div>
          <Dropdown
            placeholder="เงื่อนไขการค้นหา" className="ms-2 rounded-pill" />
        </div>
        <div className="ml-10 mr-10">
          <DataTable value={data0} header="รายการค่าธรรมเนียม" filters={filters}
          >
            <Column field="a" header="ชื่อรายการค่าธรรมเนียม"></Column>
            <Column field="b" header="ถวามถี่"></Column>
            <Column field="c" header="อัตราค่าธรรมเนียม (บาท)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>


      </>
    )
  }
  if (settingPage==="1"){
    content=(
      <>
          <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">การจัดการอัตราค่าน้ำประปา</h5>
      <div className="d-flex mx-5 mt-2">
      <div className="mt-1 me-3">ประเภทผู้ใช้น้ำ</div>  
      <CFormSelect className="w-15" size='sm'>
        <option>ผู้ใช้น้ำประปาชั่วคราว</option>
        <option>ผู้ใช้ำน้ำประปาถาวร</option>
      </CFormSelect>
      <div className="mt-1 me-3 mx-5">ประเภทการใช้น้ำ</div>
      <CFormSelect className="w-15" size='sm'>
        <option>การเกษตร</option>
        <option>อุปโภค บริโภค</option>
      </CFormSelect>
      </div>
      <div className="mr-10">
      <DataTable value={data1} header="รายการอัตราค่าน้ำประปา" filters={filters}
          >
            <Column field="a" header="อัตราการใช้น้ำ (ลูกบาศก์เมตร)"></Column>
            <Column field="b" header="หน่วยละ (บาท)"></Column>
            <Column field="c" header="ประเภทพืชที่เพาะปลูก"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
          </div>
          <h5 className="mx-5 mt-5">เพิ่มข้อมูลอัตราค่าน้ำประปา</h5>
          <div className="d-flex mx-5 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="อัตราการใช้น้ำ (ลูกบาศก์เมตร์)"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="หน่วยละ (บาท)"/>
          </CForm>
            </div>            
            <div className="me-5">
            <CForm>
            <CFormInput label="ประเภทพืชที่เพาะปลูก"/>
          </CForm>
            </div>
            <button className="wblue-button-unrounded w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>

    </div>
    </>
    )

  }
  if (settingPage==="2"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าธรรมเนียมการขอใช้น้ำ</h5>
      <div className="mr-10">
          <DataTable value={data2} header="รายการอัตราค่าธรรมเนียมการขอใช้น้ำ" filters={filters}
          >
            <Column field="a" header="ขนาด (นิ้ว)"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมการขอใช้น้ำ</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ขนาด (นิ้ว)"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="3"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่ามิเตอร์น้ำ</h5>
      <div className="mr-10">
          <DataTable value={data3} header="รายการอัตราค่ามิเตอร์น้ำ" filters={filters}
          >
            <Column field="a" header="ขนาด (นิ้ว)"></Column>
            <Column field="b" header="ราคาเครื่องละ (บาท)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมการขอใช้น้ำ</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ขนาด (นิ้ว)"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ราคาเครื่องละ (บาท)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="4"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าบำรุงรักษามิเตอร์</h5>
      <div className="mr-10">
          <DataTable value={data4} header="รายการอัตราค่าบำรุงรักษามิเตอร์" filters={filters}
          >
            <Column field="a" header="ขนาด (นิ้ว)"></Column>
            <Column field="b" header="ราคาเครื่องละ (บาท/เดือน)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมบำรุงรักษามิเตอร์</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ขนาด (นิ้ว)"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ราคาเครื่องละ (บาท/เดือน)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="5"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าใบอนุญาติจำหน่ายน้ำประปา</h5>
      <div className="mr-10">
          <DataTable value={data5} header="รายการอัตราค่าใบอนุญาติจำหน่ายน้ำประปา" filters={filters}
          >
            <Column field="a" header="ค่าใบอนุญาติจำหน่ายน้ำประปา"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท/ปี)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมใบอนุญาติจำหน่ายน้ำประปา</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ค่าใบอนุญาติจำหน่ายน้ำประปา"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท/ปี)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="6"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">การใช้น้ำทดลองดับเพลิง</h5>
      <div className="mr-10">
          <DataTable value={data6} header="รายการอัตราค่าใช้น้ำทดลองดับเพลิง" filters={filters}
          >
            <Column field="a" header="ค่าการใช้น้ำทดลองดับเพลิง"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท/ครั้ง)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมการใช้น้ำทดลองดับเพลิง</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ค่าการใช้น้ำทดลองดับเพลิง"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท/ครั้ง)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="7"){
    content=(
      <>
      <div className="d-flex flex-column mt-5 ml-10">
  <h5 className="mx-5">ค่าปรับตราผนึกแตกหรือขาด</h5>
  <div className="d-flex mx-5 mt-2">
  <div className="mt-1 me-3">ประเภทมิเตอร์</div>  
  <CFormSelect className="w-15" size='sm'>
    <option>ดิจิตอล</option>
    <option>ธรรมดา</option>
  </CFormSelect>
  </div>
  <div className="mr-10">
  <DataTable value={data7} header="รายการอัตราค่าปรับตราผนึกแตกหรือขาด" filters={filters}
      >
        <Column field="a" header="ประเภทมิเตอร์"></Column>
        <Column field="b" header="ขนาด(นิ้ว)"></Column>
        <Column field="c" header="ค่าธรรมเนียม(บาท/ครั้ง)"></Column>
        <Column body={EditIcon} header=""></Column>
        <Column body={RemoveIcon} header=""></Column>
      </DataTable>
      </div>
      <h5 className="mx-5 mt-5">เพิ่มข้อมูลอัตราค่าน้ำประปา</h5>
      <div className="d-flex mx-5 mt-2 pb-3">
        <div className="me-5">
      <CForm>
        <CFormInput label="ประเภทมิเตอร์"/>
      </CForm>
      </div>
        <div className="me-5">
        <CForm>
        <CFormInput label="ขนาด(นิ้ว)"/>
      </CForm>
        </div>            
        <div className="me-5">
        <CForm>
        <CFormInput label="ค่าธรรมเนียม(บาท/ครั้ง)"/>
      </CForm>
        </div>
        <button className="wblue-button-unrounded w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
      </div>

</div>
</>
    )
  }
  if (settingPage==="8"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าธรรมเนียมการโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ</h5>
      <div className="mr-10">
          <DataTable value={data8} header="รายการอัตราค่าธรรมเนียมการโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ" filters={filters}
          >
            <Column field="a" header="การโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท/ครั้ง)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมการโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="การโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท/ครั้ง)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="9"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าปรับการสูบน้ำจากท่อประปา</h5>
      <div className="mr-10">
          <DataTable value={data9} header="รายการอัตราค่าธรรมค่าปรับการสูบน้ำจากท่อประปา" filters={filters}
          >
            <Column field="a" header="ค่าปรับการสูบน้ำจากท่อประปา"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท/ครั้ง)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าปรับการสูบน้ำจากท่อประปา</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ค่าปรับการสูบน้ำจากท่อประปา"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท/ครั้ง)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="10"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าประกันการใช้น้ำ</h5>
      <div className="mr-10">
          <DataTable value={data10} header="รายการอัตราค่าประกันการใช้น้ำ" filters={filters}
          >
            <Column field="a" header="ประเภทการใช้"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท/ครั้ง)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าประกันการใช้น้ำ</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ประเภทการใช้"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท/ครั้ง)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="11"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าปรับการทุจริต</h5>
      <div className="mr-10">
          <DataTable value={data11} header="รายการอัตราค่าปรับการทุจริต" filters={filters}
          >
            <Column field="a" header="ค่าปรับการทุจริต"></Column>
            <Column field="b" header="ค่าธรรมเนียม (บาท/ปี)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าธรรมเนียมค่าปรับการทุจริต</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ค่าปรับการทุจริต"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าธรรมเนียม (บาท/ปี)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  if (settingPage==="12"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ค่าปรับจากการรั่วไหล</h5>
      <div className="mr-10">
          <DataTable value={data12} header="รายการอัตราค่าปรับจากการรั่วไหล" filters={filters}
          >
            <Column field="a" header="ขนาดท่อ (นิ้ว)"></Column>
            <Column field="b" header="ค่าปรับวันละ (บาท/ลูกบาศก์เมตร)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลค่าปรับจากการรั่วไหล</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ขนาดท่อ (นิ้ว)"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="ค่าปรับวันละ (บาท/ลูกบาศก์เมตร)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }
  
  if (settingPage==="13"){
    content=(
      <>
              <div>
              <div className="d-flex flex-column mt-5 ml-10">
      <h5 className="mx-5">ข้อมูลเพื่อส่งเสริมหรืออุดหนุน</h5>
      <div className="mr-10">
          <DataTable value={data13} header="รายการข้อมูลเพื่อส่งเสริมหรืออุดหนุน" filters={filters}
          >
            <Column field="a" header="ประเภทข้อมูลเพื่อส่งเสริมหรืออุดหนุน"></Column>
            <Column field="b" header="สิทธิ์ที่ได้รับ (ส่วนลด)"></Column>
            <Column body={EditIcon} header=""></Column>
            <Column body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
        </div>
        <div className="mx-5">
        <h5 className="ml-10 mt-5">เพิ่มข้อมูลเพื่อส่งเสริมหรืออุดหนุน</h5>
          <div className="d-flex ml-10 mt-2 pb-3">
            <div className="me-5">
          <CForm>
            <CFormInput label="ประเภทข้อมูลเพื่อส่งเสริมหรืออุดหนุน"/>
          </CForm>
          </div>
            <div className="me-5">
            <CForm>
            <CFormInput label="สิทธิ์ที่ได้รับ (ส่วนลด)"/>
          </CForm>
            </div>            
            <button className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center" onClick={() => alert("go")}>เพิ่มข้อมูล</button>
          </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <>
      <h4 className="mt-4 mx-4">การจัดการอัตราใบอนุญาตและค่าธรรมเนียมการใช้น้ำประปา</h4>
      <div className="customcontainer3 mt-5">
        <div className="d-flex flex-column">
          <div className="d-flex fee-topsection">
            <h5 className="me-5 mt-2">จัดการเรื่อง</h5>
            <div className="me-2">
              <CFormSelect className="mb-3" value={settingPage} onChange={(e) => handleSelectPage(e.target.value)}>
                {/* <option value="0">เลือกเรื่องที่ต้องการตั้งค่า</option>
                <option value="1">อัตราค่าน้ำประปา</option>
                <option value="2">ค่าธรรมเนียมการขอใช้น้ำ</option>
                <option value="3">ค่ามิเตอร์น้ำ</option>
                <option value="4">ค่าบำรุงรักษามิเตอร์</option>
                <option value="5">ค่าใบอนุญาติจำหน่ายน้ำประปา</option>
                <option value="6">การใช้น้ำทดลองดับเพลิง</option>
                <option value="7">ค่าปรับตราผนึกแตกหรือขาด</option>
                <option value="8">การโอน ย้ายที่อยู่ โอนหรือเปลี่ยนผู้ใช้น้ำ</option>
                <option value="9">ค่าปรับการสูบน้ำจากท่อประปา</option>
                <option value="10">ค่าประกันการใช้น้ำ</option>
                <option value="11">ค่าปรับการทุจริต</option>
                <option value="12">ค่าปรับจากการรั่วไหล</option> */}
                <option value="13">ข้อมูลเพื่อส่งเสริมหรืออุดหนุน</option>
              </CFormSelect>

            </div>
          </div>
          {content}
        </div>
      </div>
    </>
  )
}

export default WaterSettingFee