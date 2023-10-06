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
import axios from 'axios';
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

const WaterPipeData = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [pipepage, setPipepage] = useState('0')
  const [visible, setVisible] = useState(false)
  const alertBro = () => {
    alert("ทดสอบ")
  }

  const EditIcon = () => {
    return (
      <button className="buttonpic"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={() => setPipepage('2')} /></button>
    )

  }
  const RemoveIcon = () => {
    return (
      <button className='buttonpic'><img src={require("../../assets/images/remove.png")} width={30} height={30} onClick={alertBro} /></button>
    )

  }
  const data = [
    {
      pipeid: 'xxxxx',
      pipesize: '1 นิ้ว',
      pipemat: 'เหล็กอาบสังกะสี',
      pipetype: 'ท่อเมน',
      pipelen: '20',
      pipestatus: 'ปกติ',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '2 นิ้ว',
      pipemat: 'PVC',
      pipetype: 'ท่อย่อย',
      pipelen: '4',
      pipestatus: 'ชำรุด',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '2 นิ้ว',
      pipemat: 'ไซเลอร์',
      pipetype: 'ท่อย่อย',
      pipelen: '2.5',
      pipestatus: 'ปกติ',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '1 นิ้ว',
      pipemat: 'PPR',
      pipetype: 'ท่อย่อย',
      pipelen: '5',
      pipestatus: 'ปกติ',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '1 นิ้ว',
      pipemat: 'PE',
      pipetype: 'ท่อเมน',
      pipelen: '18',
      pipestatus: 'ปกติ',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '2 นิ้ว',
      pipemat: 'PVC',
      pipetype: 'ท่อย่อย',
      pipelen: '5',
      pipestatus: 'ชำรุด',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '2 นิ้ว',
      pipemat: 'PVC',
      pipetype: 'ท่อย่อย',
      pipelen: '5',
      pipestatus: 'ชำรุด',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '2 นิ้ว',
      pipemat: 'PVC',
      pipetype: 'ท่อย่อย',
      pipelen: '5',
      pipestatus: 'ชำรุด',

    },
    {
      pipeid: 'xxxxx',
      pipesize: '2 นิ้ว',
      pipemat: 'PVC',
      pipetype: 'ท่อย่อย',
      pipelen: '5',
      pipestatus: 'ชำรุด',

    }
  ]

  let content;
  if (pipepage === '0') {
    content = (
      <>
        <h2 className="mt-4 ms-4">ข้อมูลท่อน้ำ</h2>
        <div className="d-flex justify-content-between mt-4 ms-4">

          <div className="p-input-icon-left">
            <CIcon icon={cilSearch}></CIcon>
            <InputText className="custom-input-search" placeholder='ค้นหา'
              onInput={(e) =>
                setFilters({
                  global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                })
              }
            />

          </div>
          <button className="wblue-button me-5" onClick={() => setPipepage('1')}>+ เพิ่มข้อมูลท่อน้ำ</button>
        </div>
        <DataTable value={data} header="รายการท่อน้ำ" filters={filters}
          paginator
          rows={8}
          paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
          currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
        >
          <Column field="pipeid" header="รหัสท่อ"></Column>
          <Column field="pipesize" header="ขนาดท่อ"></Column>
          <Column field="pipemat" header="ชนิดท่อ"></Column>
          <Column field="pipetype" header="ประเภทท่อ"></Column>
          <Column field="pipelen" header="ความยาวท่อ(เมตร)"></Column>
          <Column field="pipestatus" header="สถานะ"></Column>
          <Column body={EditIcon} header=""></Column>
          <Column body={RemoveIcon} header=""></Column>
        </DataTable>


      </>
    )
  }

  if (pipepage === '1') {
    content = (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex mt-4">
            <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setPipepage('0')} />
            <h2 className="ms-2">เพิ่มข้อมูลท่อน้ำ</h2>
          </div>


          <div className="customcontainer2 d-flex flex-column">
            <div className="d-flex">
              <h5 className="w-20">ข้อมูลท่อน้ำ</h5>
              <div className="d-flex w-25">
                <CForm>
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ขนาดท่อ (นิ้ว)"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>
              <div className="d-flex w-25">
                <CForm>
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ชนิดท่อน้ำ"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>
              <div className="d-flex w-25">
                <CForm>
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ประเภทท่อน้ำ"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>


            </div>
            <div className="d-flex mb-5">
              <div className="w-20"></div>


            </div>
            <button className="wblue-button-unrounded mt-auto mb-5 w-15 text-center" onClick={alertBro}>บันทึกข้อมูล</button>

          </div>
        </div>
      </>
    )
  }
  if (pipepage === '2') {
    content = (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex mt-4">
            <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setPipepage('0')} />
            <h2 className="ms-2">แก้ไขข้อมูลท่อน้ำ</h2>
          </div>


          <div className="customcontainer2 d-flex flex-column">
            <div className="d-flex">
              <h5 className="w-20">ข้อมูลท่อน้ำ</h5>
              <div className="d-flex w-25">
                <CForm>
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ขนาดท่อ (นิ้ว)"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>
              <div className="d-flex w-25">
                <CForm>
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ชนิดท่อน้ำ"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>
              <div className="d-flex w-25">
                <CForm>
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ประเภทท่อน้ำ"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>

            </div>

            <div className="d-flex mb-5">
              <div className="d-flex w-20"></div>
              <div className="d-flex w-25">
                <CForm className="w-50">
                  <CFormInput className="mb-2 w-full"
                    type=""
                    id=""
                    label="ความยาวท่อ (เมตร)"
                    placeholder=""
                    aria-describedby="exampleFormControlInputHelpInline"
                  />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className='w-50'>
                  <CFormSelect className="w-full mb-2" label="สถานะท่อน้ำ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>


            </div>
            <button className="wblue-button-unrounded mt-auto mb-5 w-15 text-center" onClick={alertBro}>บันทึกข้อมูล</button>

          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {content}

    </>
  )
}

export default WaterPipeData