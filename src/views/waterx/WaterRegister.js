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






const WaterRegister = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [registerpage, setRegisterpage] = useState(0)
  const [suspendvisible, setSuspendvisible] = useState(false)
  const [paymentvisible, setPaymentvisible] = useState(false)
  const [registerform, setRegisterform] = useState(0)
  const [dialogpage, setDialogpage] = useState('0')
  const [activeIndex, setActiveIndex] = useState(0);
  const alertBro = () => {
    alert("ทดสอบว่าปุ่มกดได้จริงๆไม่ได้โม้ไม่ได้หลอก")
  }


  const nextPage = () => {
    setRegisterform(registerform + 1)
    setActiveIndex(activeIndex + 1)
  }





  const MapIcon = () => {
    return (
      <button className="buttonpic"> <img src={require("../../assets/images/map-pin.png")} width={30} height={30} onClick={alertBro} /></button>
    )

  }
  const EditIcon = () => {
    return (
      <button className="buttonpic"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={() => setRegisterpage(3)} /></button>
    )

  }
  const RemoveIcon = () => {
    return (
      <button className='buttonpic'><img src={require("../../assets/images/remove.png")} width={30} height={30} onClick={alertBro} /></button>
    )

  }
  const FileIcon = () => {
    return (
      <button className="buttonpic"><img src={require("../../assets/images/file.png")} width={30} height={30} onClick={alertBro} /></button>
    )
  }

  const PaydeptButton = ({ data }) => {
    const handlePayClick = () => {
      // Use the 'data' prop here
      setPaymentvisible(true)
      setDialogpage('1')

      // You can also call functions to handle the payment logic, etc.
      // For example: handlePayment(data);
    };

    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        onClick={handlePayClick}
      >
        ชำระเงิน
      </button>
    );
  };

  PaydeptButton.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };


  const SuspendButton = (data) => {
    const handleSuspendClick = () => {
      // Use the 'data' prop here
      setSuspendvisible(true)
      setDialogpage('2')

      // You can also call functions to handle the payment logic, etc.
      // For example: handlePayment(data);
    };
    if (data.localelink === '1') {
      return (
        <button type="button" disabled="true" className="btn btn-outline rounded-pill" onClick={handleSuspendClick}>ระงับการใช้น้ำ</button>
      )
    }
    if (data.localelink === '2') {


      return (
        <>
          <button type="button" className="btn btn-outline-danger rounded-pill" onClick={handleSuspendClick}>ระงับการใช้น้ำ</button>
        </>
      )
    }
  }
  const steps = [
    {
      label: 'กรอกข้อมูลผู้ใช้',
      command: (event) => {
        setRegisterform(0)
      }
    },
    {
      label: 'ตำแหน่งติดตั้งมาตรวัดน้ำ',
      command: (event) => {
        setRegisterform(1)
      }
    },
    {
      label: 'ไฟล์คำขอต่างๆ',
      command: (event) => {
        setRegisterform(2)
      }
    },
    {
      label: 'รายละเอียดค่าใช้จ่าย',
      command: (event) => {
        setRegisterform(3)
      }
    },
    {
      label: 'สถานะการอนุมัติ',
      command: (event) => {
        setRegisterform(4)
      }
    }
  ];


  const data = [
    {
      agent: "นายทำดี สีสะอาด",
      agentid: "0-112734-56",
      guage: "56/1 หมู่ 3 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นางศรีนวล มานะ",
      agentid: "0-112734-56",
      guage: "32 หมู่ ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ระงับใช้น้ำชั่วคราว",
      localelink: "1",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายมีสุข ขยันดี",
      agentid: "0-112734-56",
      guage: "56/2 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "การเกษตร",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นางสาวฤทัย ใจดี",
      agentid: "0-112734-56",
      guage: "11/1 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "ประปาชั่วคราว",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "39/2 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ค้างชำระ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "การเกษตร",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ค้างชำระ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "การเกษตร",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ค้างชำระ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "การเกษตร",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    }, {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ค้างชำระ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "การเกษตร",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ค้างชำระ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "อุปโภค บริโภค",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
    {
      agent: "นายสะอาด บุญงาม",
      agentid: "0-112734-56",
      guage: "88 หมู่ 4 ต.จรเข้เผือก",
      typeusage: "การเกษตร",
      wstatus: "ปกติ",
      localelink: "2",
      editstat: "2",
      rem: "2",
      pepega: "2",
      debt: "0",
    },
  ];




  let content;
  let formcontent;
  if (registerpage === 0) {
    content = (
      <>

        <h2 className="mt-4 ms-4">ทะเบียนผู้ใช้น้ำ</h2>
        <div className="d-flex justify-content-between mt-4 ms-4">
          <div className="d-flex ms-3">
            <div className="p-input-icon-left">
              <CIcon icon={cilSearch}></CIcon>
              <InputText className="p-inputtext-sm rounded-pill" placeholder='ค้นหา'
                onInput={(e) =>
                  setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                  })
                }
              />
              <Dropdown
                placeholder="เงื่อนไขการค้นหา" className="ms-2 w-full md:w-14rem rounded-pill" />
            </div>

          </div>
          <div className='d-flex me-5'>
            <button type="button" className="btn btn-outline-danger rounded-pill me-2" onClick={() => setRegisterpage(1)}>รายการค้างชำระ</button>
            <button type="button" className="btn btn-outline-success rounded-pill" onClick={() => setRegisterpage(2)}>+ เพิ่มทะเบียนผู้ใช้น้ำ</button>
          </div>
        </div>

        <div>





          <DataTable value={data} header="ตารางทะเบียนผู้ใช้น้ำ" filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column field="agent" header="เจ้าของมาตรวัดน้ำ"></Column>
            <Column field="agentid" header="เลขที่ประจำมาตรวัดน้ำ"></Column>
            <Column field="guage" header="ที่ติดตั้งมาตร"></Column>
            <Column field="typeusage" header="ประเภทการใช้น้ำ"></Column>
            <Column field="wstatus" header="สถานะการใช้น้ำ"></Column>
            <Column field="localelink" body={MapIcon} header="ตำแหน่ง"></Column>
            <Column field="editstat" body={EditIcon} header=""></Column>
            <Column field="rem" body={RemoveIcon} header=""></Column>
          </DataTable>
        </div>
      </>
    );
  }
  if (registerpage === 1) {
    content = (
      <>
        <div className="d-flex mt-4">

          <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setRegisterpage(0)} />
          <h2 className="ms-2">รายการผู้ค้างชำระ</h2>
        </div>

        <div>
        <div className="d-flex mt-4 mx-3">
                        <Dropdown
                            placeholder="รอบบิลที่ 360/38" className="ms-2 rounded-pill" />
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

          <DataTable value={data} header="รายชื่อ" filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column field="agent" header="เจ้าของมาตรวัดน้ำ"></Column>
            <Column field="agentid" header="เลขที่ประจำมาตรวัดน้ำ"></Column>
            <Column field="guage" header="ที่ติดตั้งมาตร"></Column>
            <Column field="wstatus" header="สถานะการใช้น้ำ"></Column>
            <Column field="rem" body={(rowData) => <PaydeptButton data={rowData} />} header="ต้องการชำระเงิน"></Column>
            <Column field="editstat" body={SuspendButton} header=""></Column>
            <Column field="pepega" body={FileIcon} header=""></Column>
          </DataTable>
        </div>
      </>
    );
  }

  if (registerform === 0) {
    formcontent = (
      <>

        <div className="customcontainer1 d-flex flex-column">
          <div className="d-flex mx-5 mt-5">
            <h5 className="w-25">ข้อมูลผู้ใช้น้ำ</h5>
            <CFormCheck className="w-30" type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="ช่องค้นหาทำอย่างไร" />
            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="เสียบบัตรประชาชน" defaultChecked />
          </div>
          <div className='customcontainer3 h-20 w-40 d-flex'>
            <div className="w-15">
              <img src={require("../../assets/images/alt_avatar.png")} ></img>
            </div>
            <div className="d-flex flex-column px-5">
              นางสาว กินรี จันทร์สวัสดิ์
              <br></br>บ้านเลขที่ 232 หมู่ 1
              <br></br>ต.นครปฐม อ.นครปฐม จ.นครปฐม

            </div>




            <div className="d-flex mx-auto">
              <button className="buttonpic me-3"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={alertBro} /></button>
              <button className="buttonpic"><img src={require("../../assets/images/remove.png")} width={30} height={30} onClick={alertBro} /></button>

            </div>

          </div>
          <div className="d-flex mx-5">
            <h5 className="w-25">ข้อมูลเพื่อส่งเสริมหรืออุดหนุน</h5>
            <Dropdown
              placeholder="ฉันก็ไม่รู้หรอกว่ามันคืออะไรแต่ฉันคิดว่าอันนี้มันต้องยาว ยาวมากๆแน่ๆ" className="w-25" />
          </div>
          <button className="wblue-button-unrounded mt-auto mb-5 w-10 text-center" onClick={nextPage}>ถัดไป</button>


        </div>


      </>
    )
  }

  if (registerform === 1) {
    formcontent = (
      <>

        <div className="customcontainer3 d-flex flex-column">

          <div className="p-input-icon-left mt-2 mx-5">
            <CIcon icon={cilSearch}></CIcon>
            <InputText className="p-inputtext-sm rounded-pill" placeholder='ค้นหาตำแหน่ง'
              onInput={(e) =>
                setFilters({
                  global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                })
              }
            />
          </div>
          <h5 className="mx-5 mt-5">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</h5>

          <div className="mapcontainer"> map </div>

          <div className="d-flex">
            <h5 className="w-20">ข้อมูลตำแหน่งมาตร</h5>
            <div className="d-flex w-75 justify-content-between">
              <CForm className="mx-5 w-33">
                <CFormInput className="mb-2"
                  type=""
                  id=""
                  label="บ้านเลขที่"
                  placeholder=""
                  aria-describedby="exampleFormControlInputHelpInline"
                />

                <CFormSelect className="mt-2 mb-2" label="ซอย">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
                <CFormSelect className="mt-2 mb-2" label="อำเภอ / เขต">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>

              </CForm>
              <CForm className="mx-5 w-33">
                <CFormInput className="mb-2"
                  type=""
                  id=""
                  label="หมู่"
                  placeholder=""
                  aria-describedby="exampleFormControlInputHelpInline"
                />
                <CFormSelect className="mt-2 mb-2" label="ชุมชน">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
                <CFormSelect className="mt-2 mb-2" label="จังหวัด">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>

              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="ถนน">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
                <CFormSelect className="mt-2 mb-2" label="ตำบล / แขวง">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
                <CFormSelect className="mt-2 mb-2" label="รหัสไปรษณีย์">
                  <option></option>
                  <option value="1">One</option>
                </CFormSelect>

              </CForm>

            </div>

          </div>

          <div className="d-flex mt-5">
            <h5 className="w-20">ข้อมูลมาตรวัดน้ำ</h5>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="ขนาดท่อน้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33">
              </div>
              <div className="mx-5 w-33">
              </div>

            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="ขนาดมาตรวัดน้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="เลขที่ประจำมาตรวัดน้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="ประเภทมาตรวัดน้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>

            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="วัสดุมาตรวัดน้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33">
              </div>
              <div className="mx-5 w-33">
              </div>

            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="ประเภทการใช้">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="ประเภทผู้ใช้">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33">
              </div>

            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75 mb-5">
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="วันที่ของการใช้น้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect className="mt-2 mb-2" label="วันที่เริ่มใช้น้ำ">
                  <option></option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3" disabled>Three</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33">
              </div>

            </div>
          </div>

          <button className="wblue-button-unrounded mt-5 mb-5 w-10 text-center" onClick={nextPage}>ถัดไป</button>

        </div>


      </>
    )
  }

  if (registerform === 2) {
    formcontent = (
      <>



        <div className="customcontainer1 d-flex flex-column">
          <div className="d-flex mt-5">
            <button className="minicontainer w-auto mx-5" onClick={alertBro}>
              <img className="mx-2" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
              เอกสารคำขอมาตรวัดน้ำ
            </button>
            <button className="minicontainer w-auto me-auto mx-auto" onClick={alertBro}>
              <img className="mx-2" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
              สำเนาบัตรประชาชน
            </button>
            <button className="minicontainer w-auto me-5 mx-5" onClick={alertBro}>
              <img className="mx-2" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
              สำเนาทะเบียนบ้าน
            </button>
          </div>
          <div className="d-flex  mt-5 ">
            <button className="minicontainer w-auto mx-5" onClick={alertBro}>
              <img className="mx-2" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
              เอกสารเกี่ยวกับที่ดิน
            </button>
            <div className="w-auto  me-auto mx-auto"></div><div className="w-auto me-5 mx-5"></div>
          </div>
          <button className="wblue-button-unrounded mt-auto mb-5 w-15 text-center" onClick={nextPage}>ถัดไป</button>
        </div>

      </>

    )
  }
  if (registerform === 3) {
    formcontent = (
      <>
        <div className="customcontainer4 d-flex flex-column">
          <div className="d-flex mx-5 mt-5">
            <h5 className="me-5">สรุปค่าใช้จ่าย</h5>
            <div className="d-flex flex-column mx-5">

              <p className="me-1">ค่าธรรมเนียม</p>


              <p className="me-1">ค่าประกัน</p>


              <p className="me-1">ค่าติดตั้ง</p>


              <b className="me-1">รวมยอดที่ต้องชำระ</b>




            </div>

            <div className="d-flex flex-column mx-5">

              <p className="textwithbg">100</p>


              <p className="textwithbg">100</p>


              <p className="textwithbg">350</p>


              <b>550 บาท</b>



            </div>



          </div>

          <button className="wblue-button-unrounded mt-5 mb-5 " onClick={nextPage}>พิมพ์ใบชำระเงิน</button>
          <div className="mt-auto mb-5 d-flex flex-column">
            <div className="d-flex mb-5">
              <h5 className="mx-5 mb-5">การรับชำระ</h5>
              <Dropdown
                placeholder="เงินสด" className="h-75 w-20 bg-light" />

              <button type="button" className="btn btn-success text-white h-75 mx-3">บันทึก</button>
            </div>

            <button className="wblue-button-unrounded mb-5 text-center" onClick={nextPage}>พิมพ์ใบเสร็จ</button>
          </div>
        </div>

      </>

    )
  }
  if (registerform === 4) {
    formcontent = (
      <>

        <div className="customcontainer3 d-flex flex-column">
          <button className="wblue-button-unrounded mt-5 mb-5 w-10 text-center" >ห้ามกด</button>
        </div>

      </>

    )
  }


  if (registerpage === 2) {
    content = (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex mt-4">
            <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setRegisterpage(0)} />
            <h2 className="mx-3">เพิ่มทะเบียนผู้ใช้น้ำ</h2>

          </div>
          <div className="formstep">
            <Steps className="customsteps mt-2 mb-5" model={steps} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
          </div>
          {formcontent}
        </div>
      </>
    );
  }

  if (registerpage === 3) {
    content = (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex mt-4">
            <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setRegisterpage(0)} />
            <h2 className="mx-3">แก้ไขทะเบียนผู้ใช้น้ำ</h2>

          </div>
          <div className="customcontainer3 mt-4">
            <div className="p-input-icon-left mt-5 mx-5">
              <CIcon icon={cilSearch}></CIcon>
              <InputText className="p-inputtext-sm rounded-pill" placeholder='ค้นหาตำแหน่ง'
                onInput={(e) =>
                  setFilters({
                    global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                  })
                }
              />
            </div>
            <h5 className="mt-4 mx-5">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</h5>
            <div className="d-flex flex-column">
              <div className="d-flex mt-5">
                <div className="d-flex w-65">
                  <div className="customcontainer4 ml-5 mr-5">

                  </div>
                </div>
                <div className="d-flex flex-column w-35">
                  <div className="d-flex ml-5 mr-5">
                    <img src={require("../../assets/images/map_pin_bl.png")} width={30} height={30}></img>
                    <h5 className="mx-2">รายละเอียดตำแหน่ง</h5>
                  </div>
                  <div className="d-flex mt-3 ml-5 mr-5">
                    <CForm className="w-50">
                      <CFormInput className="cloud w-90" label="บ้านเลขที่ติดตั้ง" />
                    </CForm>
                    <CForm className="w-50">
                      <CFormInput className="cloud w-90" label="หมู่" />
                    </CForm>
                  </div>
                  <div className="d-flex mt-3 ml-5 mr-5">
                    <CForm className="w-50">
                      <CFormInput className="cloud w-90" label="ตำบล" />
                    </CForm>
                    <CForm className="w-50">
                      <CFormInput className="cloud w-90" label="อำเภอ" />
                    </CForm>
                  </div>
                  <div className="d-flex mt-3 ml-5 mr-5">
                    <CForm className="w-50">
                      <CFormInput className="cloud w-90" label="จังหวัด" />
                    </CForm>
                  </div>

                </div>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">
                  รูปมิเตอร์วัดน้ำ
                </h5>
                <img src={require("../../assets/images/ex_meter.png")} width={200} height={200} />
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">
                  สถานะผู้ใช้น้ำ
                </h5>
                <>คุณถูกระงับบลาๆๆ</>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">
                  ข้อมูลผู้ใช้น้ำ
                </h5>
                <div className='customcontainer3 h-20 w-80 d-flex'>
                  <div className="w-15">
                    <img src={require("../../assets/images/alt_avatar.png")} ></img>
                  </div>
                  <div className="d-flex flex-column px-5 w-75">
                    นางสาว กินรี จันทร์สวัสดิ์
                    <br></br>บ้านเลขที่ 232 หมู่ 1
                    <br></br>ต.นครปฐม อ.นครปฐม จ.นครปฐม

                  </div>

                  <div className="d-flex w-15 ml-auto">
                    <button className="buttonpic me-3"><img src={require("../../assets/images/edit.png")} width={50} height={50} onClick={alertBro} /></button>
                    <button className="buttonpic"><img src={require("../../assets/images/remove.png")} width={50} height={50} onClick={alertBro} /></button>

                  </div>

                </div>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">
                  ข้อมูลมาตรวัดน้ำ
                </h5>
                <div className="d-flex w-75 justify-content-between">
                  <CForm className="mx-5 w-33">
                    <CFormSelect className="mt-2 mb-2" label="เลขที่ประจำมาตรวัดน้ำ">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>
                    <CFormSelect className="mt-2 mb-2" label="วัสดุมาตรวัดน้ำ">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>
                    <CFormSelect className="mt-2 mb-2" label="วันที่ของการใช้น้ำ">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>

                  </CForm>
                  <CForm className="mx-5 w-33">
                    <CFormSelect className="mt-2 mb-2" label="ประเภทมาตรวัดน้ำ">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>
                    <CFormSelect className="mt-2 mb-2" label="ขนาดท่อน้ำประปา">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>
                    <CFormSelect className="mt-2 mb-2" label="วันที่เริ่มใช้น้ำ">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>

                  </CForm>
                  <CForm className="mx-5 w-33">
                    <CFormSelect className="mt-2 mb-2" label="ขนาดมาตรวัดน้ำ">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>
                    <CFormSelect className="mt-2 mb-2" label="ประเภทการใช้">
                      <option></option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3" disabled>Three</option>
                    </CFormSelect>
                    <CFormSelect className="mt-2 mb-2" label="ประเภทผู้ใช้">
                      <option></option>
                      <option value="1">One</option>
                    </CFormSelect>

                  </CForm>

                </div>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">
                  สถานะและค่าธรรมเนียม
                </h5>
                <div className="d-flex w-75 justify-content-between">
                  <CForm className="mx-5 w-33">
                    <CFormInput label="ค่าธรรมเนียม" />
                  </CForm>
                  <CForm className="mx-5 w-33">
                    <CFormInput label="ค่าปรับ" />
                  </CForm>
                  <CForm className="mx-5 w-33">
                    <CFormInput label="ค่าประกัน" />
                  </CForm>
                </div>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">
                  ดาวน์โหลดเอกสาร
                </h5>
                <div className="d-flex mt-5 w-75">
                  <button className="minicontainer w-30 mx-3" onClick={alertBro}>
                    <div className="d-flex align-items-center">
                      <img className="mx-1 w-25" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
                      <div className="w-75">เอกสารคำขอมาตรวัดน้ำ</div>
                    </div>
                  </button>
                  <button className="minicontainer w-30 mx-3" onClick={alertBro}>
                    <div className="d-flex align-items-center">
                      <img className="mx-1 w-25" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
                      <div className="w-75">คำขอยกเลิกมาตรวัดน้ำ</div>
                    </div>
                  </button>
                  <button className="minicontainer w-30 mx-3" onClick={alertBro}>
                    <div className="d-flex align-items-center">
                      <img className="mx-1 w-25" src={require("../../assets/images/FilePic.png")} width={80} height={80} />
                      <div className="w-75">คำขอเปลี่ยนแปลงขนาดมาตรวัดน้ำ</div>
                    </div>
                  </button>
                </div>
              </div>
              <div className="d-flex mx-5 mt-5 decoline">
                <div className="w-25">
                </div>
                <div className="d-flex mt-5 w-75">
                  <button className="btn w-25 mx-3 btn-outline-primary" onClick={alertBro}>
                    <div className="d-flex align-items-center">
                      <img className="mx-1 w-20" src={require("../../assets/images/3d_box.png")} width={25} height={40} />
                      <div className="w-75">เปลี่ยนขนาดมาตรวัดน้ำ</div>
                    </div>
                  </button>
                  <button className="btn w-25 mx-3 btn-outline-primary" onClick={alertBro}>
                    <div className="d-flex align-items-center">
                      <img className="mx-1 w-20" src={require("../../assets/images/Folder_send_fill.png")} width={25} height={40} />
                      <div className="w-75">โอนทะเบียนมาตรวัดน้ำ</div>
                    </div>
                  </button>
                  <button className="btn w-25 mx-3 btn-outline-primary" onClick={alertBro}>
                    <div className="d-flex align-items-center">
                      <img className="mx-1 w-20" src={require("../../assets/images/close_ring.png")} width={25} height={40} />
                      <div className="w-75">ยกเลิกการใช้มาตรน้ำ</div>
                    </div>
                  </button>
                </div>
              </div>
              <button className="wblue-button-unrounded mt-5 mb-5 w-20 text-center">บันทึกข้อมูล</button>


            </div>
          </div>
        </div>
      </>
    )
  }



  let dialogcontent1;
  let dialogcontent2;

  dialogcontent1 = (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <img className="mt-4" src={require("../../assets/images/greenicon.png")} width={60} height={60} />
      </div>
      <div className="d-flex flex-column">
        <h5 className="text-left mt-3">สรุปยอดค้างชำระ</h5>
        <div className="mt-4">ชื่อ-นามสกุล:</div>
        เลขที่ประจำมาตรวัดน้ำ:
        <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์:
        <div className="customcontainer2">
          <div className="d-flex">
            <img className="mt-4" src={require("../../assets/images/suspendicon.png")} width={45} height={45} />
            <div className="d-flex flex-column mx-3">
              <div className="text-danger">สถานะ:</div>
              ยอดค้างชำระ:
              <br></br>ค่าปรับ:
              <br></br>รวมยอดที่ต้องชำระ:
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-3">
        <button className="wblue-button-unrounded mt-4 w-100" >พิมพ์ใบชำระเงิน</button>
      </div>
      <b>การรับชำระ</b>
      <div className="container mt-2 mb-2 ">
        <div className="row">
          <div className="col">
            <Dropdown
              placeholder="เงินสด" className="pb-1 h-75 w-100 bg-light" />
          </div>
          <div className="col-md-auto">
            <button type="button" className="btn btn-success text-white">บันทึก</button>
          </div>
        </div>
      </div>
      <div className="mt-auto text-center">
        <button className="wblue-button-unrounded mt-2 w-100" >พิมพ์ใบเสร็จ</button>
      </div>
    </>
  )


  dialogcontent2 = (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <img className="mt-4" src={require("../../assets/images/suspendicon.png")} width={60} height={60} />
      </div>
      <div className="d-flex flex-column mb-3">
        <h5 className="text-left mt-3">บันทึกการระงับน้ำชั่วคราว</h5>
        <div className="mt-4">ชื่อ-นามสกุล:</div>
        เลขที่ประจำมาตรวัดน้ำ:
        <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์:
        <div className="customcontainer2">
          <div className="d-flex">
            <img className="mt-4" src={require("../../assets/images/suspendicon.png")} width={45} height={45} />
            <div className="d-flex flex-column mx-3">
              <div className="text-danger">สถานะ:</div>
              ยอดค้างชำระ:
              <br></br>ค่าปรับ:
              <br></br>รวมยอดที่ต้องชำระ:
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto text-center">
        <button className="wred-button " >ยกเลิก</button>
        <button className="wred-button " >ระงับการใช้น้ำ</button>

      </div>
    </>
  )



  return (
    <>
      {content}
      <Dialog visible={suspendvisible}
        onHide={() => setSuspendvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "22vw", height: "auto" }}
        showHeader={false}

      >
        {dialogcontent2}
      </Dialog>



      <Dialog visible={paymentvisible}
        onHide={() => setPaymentvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "25vw", height: "auto" }}
        showHeader={false}

      >
        {dialogcontent1}
      </Dialog>

    </>
  )
}

export default WaterRegister
