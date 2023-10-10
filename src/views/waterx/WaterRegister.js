import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./waterx.css";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";
import { Steps } from "primereact/steps";
import axios from "axios";

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
} from "@coreui/react";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import CIcon from "@coreui/icons-react";
import { cilSearch, cilChevronLeft } from "@coreui/icons";
import { Row } from "primereact/row";

const WaterRegister = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [registerpage, setRegisterpage] = useState(0);
  const [suspendvisible, setSuspendvisible] = useState(false);
  const [paymentvisible, setPaymentvisible] = useState(false);
  const [newpersonalvisible, setNewpersonalvisible] = useState(false);
  const [editpersonalvisible, setEditpersonalvisible] = useState(false);
  const [registerform, setRegisterform] = useState(0);
  const [dialogpage, setDialogpage] = useState("0");
  const [activeIndex, setActiveIndex] = useState(0);
  const [editData, setEditData] = useState([]);
  const [datax, setDatax] = useState([]);
  const NHARA_API = process.env.REACT_APP_NHARA_API;

  useEffect(() => {
    axios
      .get(NHARA_API)
      .then((res) => setDatax(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const alertBro = () => {
    alert("ทดสอบ");
  };

  const nextPage = () => {
    setRegisterform(registerform + 1);
    setActiveIndex(activeIndex + 1);
  };
  const [addNewData, setAddNewData] = useState({
    baddress: "",
    bmoo: "",
    road: "",
    soi: "",
    tambon_name: "",
    amphoe_name: "",
    province_name: "",
    zipcode: "",
    international_size: "",
    meternumber: "",
    metertypename: "",
    metermaterial: "",
    fname: "",
    lname: "",
    prefix: "",
    caddress: "",
    cmoo: "",
    ctambon_name: "",
    camphoe_name: "",
    cprovince_name: "",
    pop_id: "",
  });

  const [formData, setFormData] = useState({
    status_name: "",
    road: "",
    baddress: "", // Initialize with an empty string or provide a default value if needed
    bmoo: "", // Initialize with an empty string or provide a default value if needed
    tambon_name: "",
    amphoe_name: "",
    province_name: "",
    ctambon_name: "",
    camphoe_name: "",
    cprovince_name: "",
    meternumber: "",
    metermaterial: "",
    metertypename: "",
    international_size: "",
    // pipesize:'',
    watertype_name: "",
    // usertype: '',
    // dateused: '',
    // datestarted: '',
    fname: "",
    lname: "",
    prefix: "",
    caddress: "",
    cmoo: "",
    pop_id: "",
    zipcode: "",
  });

  useEffect(() => {
    setFormData({
      status_name: editData.status_name || "",
      road: editData.road || "",
      baddress: editData.baddress || "", // Provide a default value if editData.name is undefined
      bmoo: editData.bmoo || "", // Provide a default value if editData.work is undefined
      tambon_name: editData.tambon_name || "",
      amphoe_name: editData.amphoe_name || "",
      province_name: editData.province_name || "",
      meternumber: editData.meternumber || "",
      metermaterial: editData.metermaterial || "",
      metertypename: editData.metertypename || "",
      international_size: editData.international_size || "",
      watertype_name: editData.watertype_name || "",
      fname: editData.fname || "",
      lname: editData.lname || "",
      prefix: editData.prefix || "",
      caddress: editData.caddress || "",
      cmoo: editData.cmoo || "",
      ctambon_name: editData.ctambon_name || "",
      camphoe_name: editData.camphoe_name || "",
      cprovince_name: editData.cprovince_name || "",
      pop_id: editData.pop_id || "",
      zipcode: editData.zipcode || "",
    });
  }, [editData]);

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form data as the user types
    setAddNewData({
      ...addNewData,
      [name]: value,
    });
  };

  const handleNewSelectChange = (e) => {
    const { name, value } = e.target;
    setAddNewData({
      ...addNewData,
      [name]: value,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form data as the user types
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const MapIcon = () => {
    return (
      <button className="buttonpic">
        {" "}
        <img
          src={require("../../assets/images/map-pin.png")}
          width={30}
          height={30}
          onClick={alertBro}
        />
      </button>
    );
  };
  const EditIcon = (data) => {
    return (
      <button className="buttonpic">
        <img
          src={require("../../assets/images/edit.png")}
          width={30}
          height={30}
          onClick={() => {
            setRegisterpage(3);
            handleEdit(data);
          }}
        />
      </button>
    );
  };
  const RemoveIcon = () => {
    return (
      <button className="buttonpic">
        <img
          src={require("../../assets/images/remove.png")}
          width={30}
          height={30}
          onClick={alertBro}
        />
      </button>
    );
  };
  const FileIcon = () => {
    return (
      <button className="buttonpic">
        <img
          src={require("../../assets/images/file.png")}
          width={30}
          height={30}
          onClick={alertBro}
        />
      </button>
    );
  };

  const PaydeptButton = ({ data }) => {
    const handlePayClick = () => {
      // Use the 'data' prop here
      setPaymentvisible(true);

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
  const handleSuspendModalExit = () => {
    setSuspendvisible(false);
  };
  const handlePersonalEdit = () => {
    setEditpersonalvisible(true);
  };
  const handlePersonalNew = () => {
    setNewpersonalvisible(true);
  };

  const handlePersonalEditExit = () => {
    setEditpersonalvisible(false);
  };
  const handlePersonalNewExit = () => {
    setNewpersonalvisible(false);
  };

  const SuspendButton = (data) => {
    const handleSuspendClick = () => {
      // Use the 'data' prop here
      setSuspendvisible(true);

      // You can also call functions to handle the payment logic, etc.
      // For example: handlePayment(data);
    };
    if (data.localelink === "1") {
      return (
        <button
          type="button"
          disabled="true"
          className="btn btn-outline rounded-pill"
          onClick={handleSuspendClick}
        >
          ระงับการใช้น้ำ
        </button>
      );
    }
    if (data.localelink === "2") {
      return (
        <>
          <button
            type="button"
            className="btn btn-outline-danger rounded-pill"
            onClick={handleSuspendClick}
          >
            ระงับการใช้น้ำ
          </button>
        </>
      );
    }
  };
  const steps = [
    {
      label: "กรอกข้อมูลผู้ใช้",
      command: (event) => {
        setRegisterform(0);
      },
    },
    {
      label: "ตำแหน่งติดตั้งมาตรวัดน้ำ",
      command: (event) => {
        setRegisterform(1);
      },
    },
  ];

  const debugBro = () => {
    console.log(addNewData);
  };

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
              <InputText
                className="p-inputtext-sm rounded-pill"
                placeholder="ค้นหา"
                onInput={(e) =>
                  setFilters({
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="d-flex me-5">
            <button
              type="button"
              className="btn btn-outline-success rounded-pill"
              onClick={() => setRegisterpage(2)}
            >
              + เพิ่มทะเบียนผู้ใช้น้ำ
            </button>
          </div>
        </div>

        <div>
          <DataTable
            value={datax}
            header="ตารางทะเบียนผู้ใช้น้ำ"
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column
              header="เจ้าของมาตรวัดน้ำ"
              body={(rowData) => (
                <span>
                  {rowData.prefix} {rowData.fname} {rowData.lname}
                </span>
              )}
            />
            <Column field="meternumber" header="เลขที่ประจำมาตรวัดน้ำ"></Column>
            {/* <Column field="baddress" header="ที่ติดตั้งมาตร"></Column> */}
            <Column
              header="ที่ติดตั้งมาตร"
              body={(rowData) => (
                <span>
                  {rowData.baddress} หมู่ {rowData.bmoo} ตำบล{" "}
                  {rowData.tambon_name} อำเภอ {rowData.amphoe_name} จังหวัด{" "}
                  {rowData.province_name}
                </span>
              )}
            />
            <Column field="watertype_name" header="ประเภทการใช้น้ำ"></Column>
            <Column field="status_name" header="สถานะการใช้น้ำ"></Column>
            {/* <Column field="localelink" body={MapIcon} header="ตำแหน่ง"></Column> */}
            <Column
              field="editstat"
              body={(rowData) => EditIcon(rowData)}
              header=""
            ></Column>
            {/* <Column field="rem" body={RemoveIcon} header=""></Column> */}
          </DataTable>
        </div>
      </>
    );
  }
  if (registerpage === 1) {
    content = (
      <>
        <div className="d-flex mt-4">
          <img
            className="mt-1"
            src={require("../../assets/images/backbutton.png")}
            width={30}
            height={30}
            onClick={() => setRegisterpage(0)}
          />
          <h2 className="ms-2">รายการผู้ค้างชำระ</h2>
        </div>

        <div>
          <div className="d-flex mt-4 mx-3">
            <Dropdown
              placeholder="รอบบิลที่ 360/38"
              className="ms-2 rounded-pill"
            />
            <div className="p-input-icon-left ms-2">
              <CIcon icon={cilSearch}></CIcon>
              <InputText
                className="input-search rounded-pill"
                placeholder="ค้นหา"
                onInput={(e) =>
                  setFilters({
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
              />
            </div>
            <Dropdown
              placeholder="เงื่อนไขการค้นหา"
              className="ms-2 rounded-pill"
            />
          </div>

          <DataTable
            value={data}
            header="รายชื่อ"
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column field="fname" header="เจ้าของมาตรวัดน้ำ"></Column>
            <Column
              field="meterasset_id"
              header="เลขที่ประจำมาตรวัดน้ำ"
            ></Column>
            <Column field="address" header="ที่ติดตั้งมาตร"></Column>
            <Column field="wstatus" header="สถานะการใช้น้ำ"></Column>
            <Column
              field="rem"
              body={(rowData) => <PaydeptButton data={rowData} />}
              header="ต้องการชำระเงิน"
            ></Column>
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
            {/* <CFormCheck className="w-30" type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="ช่องค้นหา" />
            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="เสียบบัตรประชาชน" defaultChecked /> */}
          </div>
          <div className="customcontainer6 h-20 w-50 d-flex">
            <div className="w-15">
              <img src={require("../../assets/images/alt_avatar.png")}></img>
            </div>
            <div className="d-flex flex-column w-50 px-5">
              {addNewData.prefix} {addNewData.fname} {addNewData.lname}
              <br></br>
              <h7>
                บ้านเลขที่&nbsp;{addNewData.caddress}&nbsp;หมู่&nbsp;
                {addNewData.cmoo}
                <br></br>ตำบล&nbsp;&nbsp;&nbsp;&nbsp;{addNewData.ctambon_name}
                <br></br>อำเภอ&nbsp;&nbsp;&nbsp;{addNewData.camphoe_name}
                <br></br>จังหวัด&nbsp;&nbsp;{addNewData.cprovince_name}
              </h7>
            </div>

            <div className="d-flex">
              {/* <button className="buttonpic me-3"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={alertBro} /></button> */}

              <button
                className="wblue-button-unrounded mt-auto mb-5 text-center"
                onClick={handlePersonalNew}
              >
                เพิ่มข้อมูล
              </button>

              {/* <button className="buttonpic mx-4"><img src={require("../../assets/images/remove.png")} width={40} height={40} onClick={alertBro} /></button> */}
            </div>
          </div>
          <div className="d-flex mx-5">
            <h5 className="w-25">ข้อมูลเพื่อส่งเสริมหรืออุดหนุน</h5>
            <CFormSelect
              placeholder="ช่องข้อมูลเพื่อส่งเสริมหรืออุดหนุน"
              className="w-20"
            >
              <option>ข้อมูลเพื่อส่งเสริมหรืออุดหนุน</option>
              <option>ผู้ป่วย</option>
              <option>คนแก่</option>
              <option>ผู้พิการ</option>
            </CFormSelect>
          </div>
          <button
            className="wblue-button-unrounded mt-auto mb-5 w-10 text-center"
            onClick={nextPage}
          >
            ถัดไป
          </button>
        </div>
      </>
    );
  }

  if (registerform === 1) {
    formcontent = (
      <>
        <div className="customcontainer3 d-flex flex-column">
          <div className="d-flex">
            <h5 className="w-20">ข้อมูลตำแหน่งมาตร</h5>
            <div className="d-flex w-75 justify-content-between">
              <CForm className="mx-5 w-33">
                <CFormInput
                  className="mb-2"
                  label="บ้านเลขที่"
                  name="baddress"
                  value={addNewData.baddress}
                  onChange={handleNewInputChange}
                />
                <CFormInput
                  className="mt-2 mb-2"
                  label="ซอย"
                  name="soi"
                  value={addNewData.soi}
                  onChange={handleNewSelectChange}
                />

                <CFormSelect
                  className="mt-2 mb-2"
                  label="อำเภอ / เขต"
                  name="amphoe_name"
                  value={addNewData.amphoe_name}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="ศรีสวัสดิ์">ศรีสวัสดิ์</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormInput
                  className="mb-2"
                  label="หมู่"
                  name="bmoo"
                  value={addNewData.bmoo}
                  onChange={handleNewInputChange}
                />
                <CFormSelect className="mt-2 mb-2" label="ชุมชน">
                  <option></option>
                  <option value="1">To Be Number One</option>
                </CFormSelect>
                <CFormSelect
                  className="mt-2 mb-2"
                  label="จังหวัด"
                  name="province_name"
                  value={addNewData.province_name}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="กาญจนบุรี">กาญจนบุรี</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormInput
                  className="mb-2"
                  label="ถนน"
                  name="road"
                  value={addNewData.road}
                  onChange={handleNewInputChange}
                />
                <CFormSelect
                  className="mt-2 mb-2"
                  label="ตำบล / แขวง"
                  name="tambon_name"
                  value={addNewData.tambon_name}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="หนองเป็ด">หนองเป็ด</option>
                </CFormSelect>
                <CFormSelect
                  className="mt-2 mb-2"
                  label="รหัสไปรษณีย์"
                  name="zipcode"
                  value={addNewData.zipcode}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="71250">71250</option>
                </CFormSelect>
              </CForm>
            </div>
          </div>

          <div className="d-flex mt-5">
            <h5 className="w-20">ข้อมูลมาตรวัดน้ำ</h5>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="ขนาดท่อน้ำ"
                  name="international_size"
                  value={addNewData.international_size}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="3.125">3.125</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33"></div>
              <div className="mx-5 w-33"></div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="ขนาดมาตรวัดน้ำ"
                  name="international_size"
                  value={addNewData.international_size}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="3.125">3.125</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormInput
                  className="mt-2 mb-2"
                  label="เลขที่ประจำมาตรวัดน้ำ"
                  name="meternumber"
                  value={addNewData.meternumber}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="ประเภทมาตรวัดน้ำ"
                  name="metertypename"
                  value={addNewData.metertypename}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="Muti-jet Turbine water meter">
                    Muti-jet Turbine water meter
                  </option>
                </CFormSelect>
              </CForm>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="วัสดุมาตรวัดน้ำ"
                  name="metermaterial"
                  value={addNewData.metermaterial}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="ทองเหลือง">ทองเหลือง</option>
                  <option value="ทองแดง">ทองแดง</option>
                  <option value="ทองดำ">ทองดำ</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33"></div>
              <div className="mx-5 w-33"></div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75">
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="ประเภทการใช้"
                  name="typeuse"
                  value={addNewData.typeuse}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="อุปโภค บริโภค">อุปโภค บริโภค</option>
                  <option value="การเกษตร">การเกษตร</option>
                  <option value="ประปาชั่วคราว">ประปาชั่วคราว</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="ประเภทผู้ใช้"
                  name="usertype"
                  value={addNewData.usertype}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="71250">71250</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33"></div>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="w-20"></div>

            <div className="d-flex w-75 mb-5">
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="วันที่ของการใช้น้ำ"
                  name="dateused"
                  value={addNewData.dateused}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="วันนี้">วันนี้</option>
                </CFormSelect>
              </CForm>
              <CForm className="mx-5 w-33">
                <CFormSelect
                  className="mt-2 mb-2"
                  label="วันที่เริ่มใช้น้ำ"
                  name="datestarted"
                  value={addNewData.datestarted}
                  onChange={handleNewInputChange}
                >
                  <option></option>
                  <option value="เมื่อวาน">เมื่อวาน</option>
                </CFormSelect>
              </CForm>
              <div className="mx-5 w-33"></div>
            </div>
          </div>

          {/* <button className="wblue-button-unrounded mt-5 mb-5 w-10 text-center" onClick={() => { nextPage(); debugBro(); }}>ถัดไป</button> */}
          <button
            className="wblue-button-unrounded mt-5 mb-5 w-10 text-center"
            onClick={() => {
              setRegisterpage(0);
              debugBro();
            }}
          >
            บันทึก
          </button>
        </div>
      </>
    );
  }

  if (registerform === 2) {
    formcontent = (
      <>
        <div className="customcontainer1 d-flex flex-column">
          <div className="d-flex mt-5">
            <button className="minicontainer w-auto mx-5" onClick={alertBro}>
              <img
                className="mx-2"
                src={require("../../assets/images/FilePic.png")}
                width={80}
                height={80}
              />
              เอกสารคำขอมาตรวัดน้ำ
            </button>
            <button
              className="minicontainer w-auto me-auto mx-auto"
              onClick={alertBro}
            >
              <img
                className="mx-2"
                src={require("../../assets/images/FilePic.png")}
                width={80}
                height={80}
              />
              สำเนาบัตรประชาชน
            </button>
            <button
              className="minicontainer w-auto me-5 mx-5"
              onClick={alertBro}
            >
              <img
                className="mx-2"
                src={require("../../assets/images/FilePic.png")}
                width={80}
                height={80}
              />
              สำเนาทะเบียนบ้าน
            </button>
          </div>
          <div className="d-flex  mt-5 ">
            <button className="minicontainer w-auto mx-5" onClick={alertBro}>
              <img
                className="mx-2"
                src={require("../../assets/images/FilePic.png")}
                width={80}
                height={80}
              />
              เอกสารเกี่ยวกับที่ดิน
            </button>
            <div className="w-auto  me-auto mx-auto"></div>
            <div className="w-auto me-5 mx-5"></div>
          </div>
          <button
            className="wblue-button-unrounded mt-auto mb-5 w-15 text-center"
            onClick={nextPage}
          >
            ถัดไป
          </button>
        </div>
      </>
    );
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

          <button
            className="wblue-button-unrounded mt-5 mb-5 "
            onClick={nextPage}
          >
            พิมพ์ใบชำระเงิน
          </button>
          <div className="mt-auto mb-5 d-flex flex-column">
            <div className="d-flex mb-5">
              <h5 className="mx-5 mb-5">การรับชำระ</h5>
              <Dropdown placeholder="เงินสด" className="h-75 w-20 bg-light" />

              <button
                type="button"
                className="btn btn-success text-white h-75 mx-3"
              >
                บันทึก
              </button>
            </div>

            <button
              className="wblue-button-unrounded mb-5 text-center"
              onClick={nextPage}
            >
              พิมพ์ใบเสร็จ
            </button>
          </div>
        </div>
      </>
    );
  }

  if (registerpage === 2) {
    content = (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex mt-4">
            <img
              className="mt-1"
              src={require("../../assets/images/backbutton.png")}
              width={30}
              height={30}
              onClick={() => setRegisterpage(0)}
            />
            <h2 className="mx-3">เพิ่มทะเบียนผู้ใช้น้ำ</h2>
          </div>
          <div className="formstep">
            <Steps
              className="customsteps mt-2 mb-5"
              model={steps}
              activeIndex={activeIndex}
              onSelect={(e) => setActiveIndex(e.index)}
              readOnly={false}
            />
          </div>
          {formcontent}
        </div>
      </>
    );
  }

  const handleEdit = (data) => {
    setEditData(data);
    console.log(editData);
    console.log(NHARA_API);
  };
  if (registerpage === 3) {
    content = (
      <>
        <div className="d-flex flex-column">
          <div className="d-flex mt-4">
            <img
              className="mt-1"
              src={require("../../assets/images/backbutton.png")}
              width={30}
              height={30}
              onClick={() => setRegisterpage(0)}
            />
            <h2 className="mx-3">แก้ไขทะเบียนผู้ใช้น้ำ</h2>
          </div>
          <div className="customcontainer3 mt-4">
            <div className="p-input-icon-left mt-5 mx-5">
              <CIcon icon={cilSearch}></CIcon>
              <InputText
                className="p-inputtext-sm rounded-pill"
                placeholder="ค้นหาตำแหน่ง"
                onInput={(e) =>
                  setFilters({
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
              />
            </div>
            <h5 className="mt-4 mx-5">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</h5>
            <div className="d-flex flex-column">
              <div className="d-flex mt-5">
                <div className="d-flex w-65">
                  <div className="customcontainer4 ml-5 mr-5"></div>
                </div>
                <div className="d-flex flex-column w-35">
                  <div className="d-flex ml-5 mr-5">
                    <img
                      src={require("../../assets/images/map_pin_bl.png")}
                      width={30}
                      height={30}
                    ></img>
                    <h5 className="mx-2">รายละเอียดตำแหน่ง</h5>
                  </div>
                  <div className="d-flex mt-3 ml-5 mr-5">
                    <CForm className="w-50">
                      <CFormInput
                        className="cloud w-90"
                        label="บ้านเลขที่ติดตั้ง"
                        name="baddress"
                        value={formData.baddress}
                        onChange={handleInputChange}
                      />
                    </CForm>
                    <CForm className="w-50">
                      <CFormInput
                        className="cloud w-90"
                        label="หมู่"
                        name="bmoo"
                        value={formData.bmoo}
                        onChange={handleInputChange}
                      />
                    </CForm>
                  </div>
                  <div className="d-flex mt-3 ml-5 mr-5">
                    <CForm className="w-50">
                      <CFormInput
                        className="cloud w-90"
                        label="ตำบล"
                        name="tambon_name"
                        value={formData.tambon_name}
                        onChange={handleInputChange}
                      />
                    </CForm>
                    <CForm className="w-50">
                      <CFormInput
                        className="cloud w-90"
                        label="อำเภอ"
                        name="amphoe_name"
                        value={formData.amphoe_name}
                        onChange={handleInputChange}
                      />
                    </CForm>
                  </div>
                  <div className="d-flex mt-3 ml-5 mr-5">
                    <CForm className="w-50">
                      <CFormInput
                        className="cloud w-90"
                        label="จังหวัด"
                        name="province_name"
                        value={formData.province_name}
                        onChange={handleInputChange}
                      />
                    </CForm>
                  </div>
                </div>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">รูปมิเตอร์วัดน้ำ</h5>
                <img
                  src={require("../../assets/images/ex_meter.png")}
                  width={200}
                  height={200}
                />
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">สถานะผู้ใช้น้ำ</h5>
                {formData.status_name}
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">ข้อมูลผู้ใช้น้ำ</h5>
                <div className="customcontainer3 h-20 w-80 d-flex">
                  <div className="w-15">
                    <img
                      src={require("../../assets/images/alt_avatar.png")}
                    ></img>
                  </div>
                  <div className="d-flex flex-column px-5 w-75">
                    {formData.prefix} {formData.fname} {formData.lname}
                    <br></br>บ้านเลขที่ {formData.caddress} หมู่ {formData.cmoo}
                    <br></br>ต.{formData.ctambon_name} อ.{formData.camphoe_name}{" "}
                    จ.{formData.cprovince_name}
                  </div>

                  <div className="d-flex w-15 ml-auto">
                    <button className="buttonpic me-3">
                      <img
                        src={require("../../assets/images/edit.png")}
                        width={50}
                        height={50}
                        onClick={handlePersonalEdit}
                      />
                    </button>
                    {/* <button className="buttonpic"><img src={require("../../assets/images/remove.png")} width={50} height={50} onClick={alertBro} /></button> */}
                  </div>
                </div>
              </div>
              <div className="d-flex mx-5 mt-5 ">
                <h5 className="w-25">ข้อมูลมาตรวัดน้ำ</h5>
                <div className="d-flex w-75 justify-content-between">
                  <CForm className="mx-5 w-33">
                    <CFormInput
                      className="mt-2 mb-2"
                      label="เลขที่ประจำมาตรวัดน้ำ"
                      name="meternumber"
                      value={formData.meternumber}
                      onChange={handleInputChange}
                    />
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="วัสดุมาตรวัดน้ำ"
                      name="metermaterial"
                      value={formData.metermaterial}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="ทองแดง">แมว</option>
                      <option value="ทองเหลือง">ทองเหลือง</option>
                    </CFormSelect>
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="วันที่ของการใช้น้ำ"
                      name="dateused"
                      value={formData.dateused}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="ทองแดง">แมว</option>
                      <option value="ทองเหลือง">ทองเหลือง</option>
                    </CFormSelect>
                  </CForm>
                  <CForm className="mx-5 w-33">
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="ประเภทมาตรวัดน้ำ"
                      name="metertypename"
                      value={formData.metertypename}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="Muti-jet Turbine water meter">
                        Muti-jet Turbine water meter
                      </option>
                      <option value="ประเภทกระดาษ">ประเภทกระดาษ</option>
                    </CFormSelect>
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="ขนาดท่อน้ำประปา"
                      name="international_size"
                      value={formData.international_size}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="3">3</option>
                      <option value="3.175">3.175</option>
                    </CFormSelect>
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="วันที่เริ่มใช้น้ำ"
                      name="datestarted"
                      value={formData.datestarted}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="ทองแดง">แมว</option>
                      <option value="ทองเหลือง">ทองเหลือง</option>
                    </CFormSelect>
                  </CForm>
                  <CForm className="mx-5 w-33">
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="ขนาดมาตรวัดน้ำ"
                      name="international_size"
                      value={formData.international_size}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="3">3</option>
                      <option value="3.175">3.175</option>
                    </CFormSelect>
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="ประเภทการใช้"
                      name="watertype_name"
                      value={formData.watertype_name}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="การเกษตร">การเกษตร</option>
                      <option value="อุปโภค บริโภค">อุปโภค บริโภค</option>
                    </CFormSelect>
                    <CFormSelect
                      className="mt-2 mb-2"
                      label="ประเภทผู้ใช้"
                      name="usertype"
                      value={formData.usertype}
                      onChange={handleSelectChange}
                    >
                      <option></option>
                      <option value="แมว">แมว</option>
                      <option value="นกแก้ว">นกแก้ว</option>
                    </CFormSelect>
                  </CForm>
                </div>
              </div>

              <button className="wblue-button-unrounded mt-5 mb-5 w-20 text-center">
                บันทึกข้อมูล
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  let dialogcontent1;
  let dialogcontent2;
  let dialog_editpersonal;
  let dialog_newpersonal;
  dialog_editpersonal = (
    <>
      <h5 className="text-center mt-5">แก้ไขข้อมูลส่วนตัวของผู้ใช้น้ำ</h5>
      <div className="d-flex mt-5">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="คำนำหน้าชื่อ"
            name="prefix"
            value={formData.prefix}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ชื่อจริง"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="นามสกุล"
            name="lname"
            value={formData.lname}
            onChange={handleInputChange}
          />
        </CForm>
      </div>
      <div className="d-flex mt-3">
        <CForm className="mx-5 w-33"></CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="เลขที่บัตรประจำตัวประชาชน"
            name="pop_id"
            value={formData.pop_id}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33"></CForm>
      </div>
      <div className="d-flex mt-3">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="บ้านเลขที่"
            name="caddress"
            value={formData.caddress}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="หมู่"
            name="coo"
            value={formData.cmoo}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ซอย"
            name="soi"
            value={formData.soi}
            onChange={handleInputChange}
          />
        </CForm>
      </div>
      <div className="d-flex mt-3 mb-3">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ถนน"
            name="road"
            value={formData.road}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ตำบล/แขวง"
            name="ctambon_name"
            value={formData.ctambon_name}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="อำเภอ/เขต"
            name="camphoe_name"
            value={formData.camphoe_name}
            onChange={handleInputChange}
          />
        </CForm>
      </div>
      <div className="d-flex mt-3 mb-3">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="จังหวัด"
            name="cprovince_name"
            value={formData.cprovince_name}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="รหัสไปรษณีย์"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33"></CForm>
      </div>

      <button
        className="wblue-button-unrounded mt-5 mb-3 w-10 text-center"
        onClick={handlePersonalEditExit}
      >
        บันทึก
      </button>
    </>
  );

  dialog_newpersonal = (
    <>
      <h5 className="text-center mt-5">เพิ่มข้อมูลส่วนตัวของผู้ใช้น้ำ</h5>
      <div className="d-flex mt-5">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="คำนำหน้าชื่อ"
            name="prefix"
            value={addNewData.prefix}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ชื่อจริง"
            name="fname"
            value={addNewData.fname}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="นามสกุล"
            name="lname"
            value={addNewData.lname}
            onChange={handleNewInputChange}
          />
        </CForm>
      </div>
      <div className="d-flex mt-3">
        <CForm className="mx-5 w-33"></CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="เลขที่บัตรประจำตัวประชาชน"
            name="pop_id"
            value={addNewData.pop_id}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33"></CForm>
      </div>
      <div className="d-flex mt-3">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="บ้านเลขที่"
            name="caddress"
            value={addNewData.caddress}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="หมู่"
            name="cmoo"
            value={addNewData.cmoo}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ซอย"
            name="soi"
            value={addNewData.soi}
            onChange={handleNewInputChange}
          />
        </CForm>
      </div>
      <div className="d-flex mt-3 mb-3">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ถนน"
            name="road"
            value={addNewData.road}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="ตำบล/แขวง"
            name="ctambon_name"
            value={addNewData.ctambon_name}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="อำเภอ/เขต"
            name="camphoe_name"
            value={addNewData.camphoe_name}
            onChange={handleNewInputChange}
          />
        </CForm>
      </div>
      <div className="d-flex mt-3 mb-3">
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="จังหวัด"
            name="cprovince_name"
            value={addNewData.cprovince_name}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33">
          <CFormInput
            className="mt-2 mb-2"
            label="รหัสไปรษณีย์"
            name="zipcode"
            value={addNewData.zipcode}
            onChange={handleNewInputChange}
          />
        </CForm>
        <CForm className="mx-5 w-33"></CForm>
      </div>

      <button
        className="wblue-button-unrounded mt-5 mb-3 w-10 text-center"
        onClick={handlePersonalNewExit}
      >
        บันทึก
      </button>
    </>
  );

  //ใบชำระเงิน
  dialogcontent1 = (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <img
          className="mt-4"
          src={require("../../assets/images/greenicon.png")}
          width={60}
          height={60}
        />
      </div>
      <div className="d-flex flex-column">
        <h5 className="text-left mt-3">สรุปยอดค้างชำระ</h5>
        <div className="mt-4">ชื่อ-นามสกุล:</div>
        เลขที่ประจำมาตรวัดน้ำ:
        <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์:
        <div className="customcontainer2">
          <div className="d-flex">
            <img
              className="mt-4"
              src={require("../../assets/images/suspendicon.png")}
              width={45}
              height={45}
            />
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
        <button className="wblue-button-unrounded mt-4 w-100">
          พิมพ์ใบชำระเงิน
        </button>
      </div>
      <b>การรับชำระ</b>
      <div className="container mt-2 mb-2 ">
        <div className="row">
          <div className="col">
            <Dropdown
              placeholder="เงินสด"
              className="pb-1 h-75 w-100 bg-light"
            />
          </div>
          <div className="col-md-auto">
            <button type="button" className="btn btn-success text-white">
              บันทึก
            </button>
          </div>
        </div>
      </div>
      <div className="mt-auto text-center">
        <button className="wblue-button-unrounded mt-2 w-100">
          พิมพ์ใบเสร็จ
        </button>
      </div>
    </>
  );

  dialogcontent2 = (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <img
          className="mt-4"
          src={require("../../assets/images/suspendicon.png")}
          width={60}
          height={60}
        />
      </div>
      <div className="d-flex flex-column mb-3">
        <h5 className="text-left mt-3">บันทึกการระงับน้ำชั่วคราว</h5>
        <div className="mt-4">ชื่อ-นามสกุล:</div>
        เลขที่ประจำมาตรวัดน้ำ:
        <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์:
        <div className="customcontainer2">
          <div className="d-flex">
            <img
              className="mt-4"
              src={require("../../assets/images/suspendicon.png")}
              width={45}
              height={45}
            />
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
        <button className="wred-button " onClick={handleSuspendModalExit}>
          ยกเลิก
        </button>
        <button className="wred-button ">ระงับการใช้น้ำ</button>
      </div>
    </>
  );

  return (
    <>
      {content}
      <Dialog
        visible={suspendvisible}
        onHide={() => setSuspendvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "22rem", height: "auto" }}
        showHeader={false}
      >
        {dialogcontent2}
      </Dialog>

      <Dialog
        visible={paymentvisible}
        onHide={() => setPaymentvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "25rem", height: "auto" }}
        showHeader={false}
      >
        {dialogcontent1}
      </Dialog>

      <Dialog
        visible={newpersonalvisible}
        onHide={() => setNewpersonalvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "75rem", height: "auto" }}
        showHeader={false}
      >
        {dialog_newpersonal}
      </Dialog>

      <Dialog
        visible={editpersonalvisible}
        onHide={() => setEditpersonalvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "75rem", height: "auto" }}
        showHeader={false}
      >
        {dialog_editpersonal}
      </Dialog>
    </>
  );
};

export default WaterRegister;
