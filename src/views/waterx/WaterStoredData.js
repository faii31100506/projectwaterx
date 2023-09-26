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


const WaterStoreData = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [storepage, setStorepage] = useState('0')
  const data = [
    {
      storetype: "แท็งค์น้ำ",
      storedid: "0-112734-56",
      storedname: "xxxxxxx xxxxxxxxx",
      status: "ปกติ",
      guage: "56/1 หมู่ 3 ต.จะเข้เผือก",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
    {
      storetype: "แหล่งน้ำในป่า",
      storedid: "0-112734-56",
      storedname: "xxxxxxx xxxxxxxxx",
      status: "ปกติ",
      guage: "56/1 หมู่ 3 ต.จะเข้เผือก",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
    {
      storetype: "แหล่งกักเก็บน้ำผิวดิน",
      storedid: "0-112734-56",
      storedname: "xxxxxxx xxxxxxxxx",
      status: "ปกติ",
      guage: "56/1 หมู่ 3 ต.จะเข้เผือก",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
    {
      storetype: "แท็งค์น้ำ",
      storedid: "0-112734-56",
      storedname: "xxxxxxx xxxxxxxxx",
      guage: "56/1 หมู่ 3 ต.จะเข้เผือก",
      status: "ปกติ",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
  ]
  const alertBro = () => {
    alert("ทดสอบ")
  }
  const EditIcon = () => {
    return (
      <button className="buttonpic"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={() => setStorepage('2')} /></button>
    )

  }
  const RemoveIcon = () => {
    return (
      <button className='buttonpic'><img src={require("../../assets/images/remove.png")} width={30} height={30} onClick={alertBro} /></button>
    )

  }
  let content;
  if (storepage === '0') {
    content =
      (
        <>
          <div className="d-flex justify-content-between mt-3 ms-4">
            <div className="d-flex justify-content-left mt-2 ms-4">
              <button className="wblue-button" >แท็งค์น้ำ</button>
              <button className="wblue-button" >แหล่งน้ำในป่า</button>
              <button className="wblue-button" >แหล่งกักเก็บน้ำผิวดิน</button>
            </div>
            <button className="wblue-button me-5" onClick={() => setStorepage('1')}>เพิ่มแหล่งกักเก็บน้ำ</button>
          </div>

          <DataTable value={data} header="ข้อมูลแหล่งกักเก็บน้ำ"
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column field="O" body="O"></Column>
            <Column field="storetype" header="ประเภทแหล่งเก็บน้ำ"></Column>
            <Column field="storedname" header="ชื่อแหล่งกักเก็บน้ำ"></Column>
            <Column field="storedid" header="รหัสแหล่งกักเก็บน้ำ"></Column>
            <Column field="guage" header="ที่ติดตั้งมาตร"></Column>
            <Column field="status" header="สถานะ"></Column>
            <Column field="agent" body={EditIcon} header=""></Column>
            <Column field="agent" body={RemoveIcon} header=""></Column>
          </DataTable>
        </>



      )
  }
  if (storepage === '1') {
    content =
      (
        <>
          <div className="d-flex">
            <div className="d-flex flex-column w-25 mt-4 px-3">
              <div className="d-flex justify-content-center">
                <img className="mt-1 me-auto" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setStorepage('0')} />
                <h3 className="ms-auto me-auto w-75">เพิ่มแหล่งกักเก็บน้ำ</h3>
              </div>

              <div className="d-flex mt-3">
                <CForm className="w-60">
                  <CFormSelect className="cloud w-90" label="ประเภทแหล่งกักเก็บน้ำ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
                <CForm className="w-40">
                  <CFormSelect className="cloud w-80" label="ความจุ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>
              <div className="mt-4">
                <CForm>
                  <CFormInput
                    className="cloud w-90"
                    label="ชื่อแหล่งกักเก็บน้ำ"
                  />
                </CForm>
              </div>

              <div className="p-input-icon-left mt-4 mx-auto">
                <CIcon icon={cilSearch}></CIcon>
                <InputText className="p-inputtext rounded-pill" placeholder='ค้นหาตำแหน่ง'
                  onInput={(e) =>
                    setFilters({
                      global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                    })
                  }
                />
              </div>
              <div className="mt-3">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</div>


              <div className="d-flex mt-2">
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="บ้านเลขที่ติดตั้ง" />
                </CForm>
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="หมู่" />
                </CForm>
              </div>


              <div className="d-flex mt-2">
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="ตำบล" />
                </CForm>
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="อำเภอ" />
                </CForm>
              </div>


              <div className="d-flex mt-2 mb-3">
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="จังหวัด" />
                </CForm>
              </div>
              <div className="piccontainer">+ เพิ่มรูปแหล่งกักเก็บน้ำ</div>
              <button className="wblue-button-unrounded mt-3 mb-4 w-60 text-center" onClick={alertBro}>เพิ่มแหล่งกักเก็บน้ำ</button>
            </div>

            <div className="text-center bg-light w-75 h-full">
              map
            </div>

          </div>


        </>
      )
  }
  if (storepage === '2') {
    content =
      (
        <>
          <div className="d-flex">
            <div className="d-flex flex-column w-25 mt-4 px-3">
              <div className="d-flex justify-content-center">
                <img className="mt-1 me-auto" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setStorepage('0')} />
                <h3 className="ms-auto me-auto w-75">แก้ไขแหล่งกักเก็บน้ำ</h3>
              </div>

              <div className="d-flex mt-3">
                <CForm className="w-60">
                  <CFormSelect className="cloud w-90" label="ประเภทแหล่งกักเก็บน้ำ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
                <CForm className="w-40">
                  <CFormSelect className="cloud w-80" label="ความจุ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>
              <div className="mt-4">
                <CForm>
                  <CFormInput
                    className="cloud w-90"
                    label="ชื่อแหล่งกักเก็บน้ำ"
                  />
                </CForm>
              </div>

              <div className="p-input-icon-left mt-4 mx-auto">
                <CIcon icon={cilSearch}></CIcon>
                <InputText className="p-inputtext rounded-pill" placeholder='ค้นหาตำแหน่ง'
                  onInput={(e) =>
                    setFilters({
                      global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                    })
                  }
                />
              </div>
              <div className="mt-3">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</div>


              <div className="d-flex mt-2">
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="บ้านเลขที่ติดตั้ง" />
                </CForm>
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="หมู่" />
                </CForm>
              </div>


              <div className="d-flex mt-2">
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="ตำบล" />
                </CForm>
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="อำเภอ" />
                </CForm>
              </div>


              <div className="d-flex mt-2 mb-3">
                <CForm className="w-50">
                  <CFormInput className="cloud w-90" label="จังหวัด" />
                </CForm>
                <CForm className="w-50">
                  <CFormSelect className="cloud w-50" label="สถานะ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>
              <div className="piccontainer">+ เพิ่มรูปแหล่งกักเก็บน้ำ</div>
              <button className="wblue-button-unrounded mt-3 mb-4 w-60 text-center" onClick={alertBro}>บันทึกการแก้ไข</button>
            </div>

            <div className="text-center bg-light w-75 h-full">
              map
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

export default WaterStoreData