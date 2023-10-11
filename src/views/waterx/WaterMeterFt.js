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
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";
import axios from "axios";
import {
  CFormCheck,
  CFormInput,
  CForm,
  CFormSelect,
  CFormTextarea,
} from "@coreui/react";

const WaterMeterFt = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [meterFtpage, setMeterFtpage] = useState(0);
  const [paymentvisible, setPaymentvisible] = useState(false);
  const [datax, setDatax] = useState([]);
  const [dataxcensus, setDataxcensus] = useState([]);
  const [editData, setEditData] = useState([]);

  const TRANSACTION_API = process.env.REACT_APP_TRANSACTION_API;
  // const NHARA_API = process.env.REACT_APP_NHARA_API;

  useEffect(() => {
    axios
      .get(TRANSACTION_API)
      .then((res) => setDatax(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4034/api/nahra/listcensus")
      .then((res) => setDataxcensus(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ปุ่มใบเเจ้งหนี้
  const PaydeptButton = ({ data }) => {
    console.log(data);
    const handlePayClick = (data) => {
      // Use the 'data' prop here
      setPaymentvisible(true, data);
      // You can also call functions to handle the payment logic, etc.
      // For example: handlePayment(data);
    };
    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        // onClick={handlePayClick(data)}
        onClick={() => {
          handlePayClick(data);
          console.log(data);
        }}
        style={{ fontSize: 14 }}
      >
        ใบเเจ้งหนี้
      </button>
    );
  };

  PaydeptButton.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };
  // const MeterRecord = ({ data }) => {
  //   console.log(data);
  //   const handleMeterRecordClick = (data) => {
  //     // Use the 'data' prop here
  //     setMeterFtpage(3);

  //     // You can also call functions to handle the payment logic, etc.
  //     // For example: handlePayment(data);
  //   };
  //   return (
  //     <button
  //       type="button"
  //       className="btn btn-outline-success rounded-pill"
  //       onClick={() => {
  //         handleMeterRecordClick(data);
  //       }}
  //       style={{ fontSize: 14 }}
  //     >
  //       จดมิเตอร์ค่าน้ำ
  //     </button>
  //   );
  // };
  const MeterRecord = (data) => {
    console.log(data);
    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        onClick={() => {
          handleMeterRecordClick(data);
          setMeterFtpage(3);
        }}
        style={{ fontSize: 14 }}
      >
        จดมิเตอร์ค่าน้ำ
      </button>
    );
  };
  MeterRecord.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };

  // const [prefix, setprefix] = useState("");
  // const [fname, setfname] = useState("");
  // const [lname, setlname] = useState("");
  // const [meternumber, setmeternumber] = useState("");
  // const [address, setaddress] = useState("");
  // const [meter_status, setmeter_status] = useState("");
  // const [previousnum, setpreviousnum] = useState("");
  // const [currentnum, setcurrentnum] = useState("");
  // const [unituse, setunituse] = useState("");

  const [addNewData, setAddNewData] = useState({
    prefix: "",
    fname: "",
    lname: "",
    meternumber: "",
    address: "",
    meter_status: "",
    previousnum: "",
    currentnum: "",
    unituse: "",
  });
  useEffect(() => {
    setAddNewData({
      prefix: editData.prefix || "",
      fname: editData.fname || "",
      lname: editData.lname || "",
      meternumber: editData.meternumber || "",
      address: editData.address || "",
      meter_status: editData.meter_status || "",
      previousnum: editData.previousnum || "",
      currentnum: editData.currentnum || "",
      unituse: editData.unituse || "",
    });
  }, [editData]);

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form data as the user types
    setAddNewData({
      ...addNewData,
      [name]: value,
    });
    console.log(addNewData);
  };

  let content;
  if (meterFtpage === 0) {
    content = (
      <>
        <h2 className="mt-4 ms-4">รายการจดค่าน้ำ</h2>
        <div className="d-flex justify-content-between mt-4 ms-4">
          <div className="d-flex mt-2">
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
            {/* <Dropdown
              placeholder="เงื่อนไขการค้นหา"
              className="ms-2 rounded-pill"
            /> */}
          </div>
          <button
            className="wblue-button me-5"
            onClick={() => setMeterFtpage(1)}
            style={{ fontSize: 14 }}
          >
            + จดมิเตอร์ค่าน้ำ
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            value={datax}
            header="ตารางรายการจดค่าน้ำ"
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column
              header="ชื่อ นามสกุล"
              body={(rowData) => (
                <span>
                  {rowData.prefix} {rowData.fname} {rowData.lname}
                </span>
              )}
              style={{
                fontSize: 14,
              }}
            />
            <Column
              field="meterid"
              header="เลขที่ประจำมาตรวัดน้ำ"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.meternumber}</span>}
            ></Column>
            <Column
              field="meterplace"
              header="ที่ติดตั้งมาตร"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.address}</span>}
            ></Column>
            {/* <Column
              field="wstatus"
              header="สถานะการใช้น้ำ"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.meter_status}</span>}
            ></Column> */}
            <Column
              field="oldmeter"
              header="เลขมิเตอร์ครั้งก่อน"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.previousnum}</span>}
            ></Column>
            <Column
              field="curmeter"
              header="เลขมิเตอร์ครั้งนี้"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.currentnum}</span>}
            ></Column>
            <Column
              field="difference"
              header="จำนวนหน่วยที่ใช้"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.unituse}</span>}
            ></Column>
            <Column
              body={(rowData) => PaydeptButton(rowData)}
              // body={PaydeptButton}
              header="การชำระเงิน"
              style={{ fontSize: 14 }}
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }

  // ตารางจดมาตรน้ำ
  if (meterFtpage === 1) {
    content = (
      <>
        <div className="d-flex mt-4">
          <img
            className="mt-1"
            src={require("../../assets/images/backbutton.png")}
            width={30}
            height={30}
            onClick={() => setMeterFtpage(0)}
          />
          <h2 className="ms-2">จดมิเตอร์ค่าน้ำ</h2>
        </div>
        <div className="d-flex justify-content-between mt-4 ms-4">
          <div className="d-flex">
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
          </div>
        </div>
        <div className="mt-5">
          <DataTable
            header="ตารางรายการจดมิเตอร์ค่าน้ำ"
            filters={filters}
            paginator
            value={dataxcensus}
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column
              header="ชื่อ นามสกุล"
              style={{ fontSize: 14 }}
              body={(rowData) => (
                <span>
                  {rowData.prefix} {rowData.fname} {rowData.lname}
                </span>
              )}
            ></Column>
            <Column
              header="เลขที่ประจำมาตรวัดน้ำ"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.meternumber}</span>}
            ></Column>
            <Column
              header="ที่ติดตั้งมาตร"
              style={{ fontSize: 14 }}
              body={(rowData) => (
                <span>
                  {rowData.baddress} หมู่ {rowData.bmoo} ตำบล{" "}
                  {rowData.tambon_name} อำเภอ {rowData.amphoe_name} จังหวัด{" "}
                  {rowData.province_name}
                </span>
              )}
            ></Column>
            <Column
              header="สถานะการใช้น้ำ"
              style={{ fontSize: 14 }}
              body={(rowData) => <span>{rowData.meter_status}</span>}
            ></Column>
            <Column
              field="จดมิเตอร์ค่าน้ำ"
              body={(rowData) => MeterRecord(rowData)}
              header=""
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }

  const handleMeterRecordClick = (data) => {
    setEditData(data);
    console.log(editData);
    // console.log(PROMOTION_API);
  };
  // หน้าจด
  if (meterFtpage === 3) {
    content = (
      <>
        <div className="d-flex mt-4">
          <img
            className="mt-1"
            src={require("../../assets/images/backbutton.png")}
            width={30}
            height={30}
            onClick={() => setMeterFtpage(0)}
          />
          <h2 className="ms-2">จดมิเตอร์ค่าน้ำ</h2>
        </div>

        <div className="customcontainer2 mt-4 ms-4">
          <div className="d-flex flex-column">
            <div className="d-flex mt-5 mb-3 ms-5">
              <h5 className="w-20">ข้อมูลผู้ใช้น้ำ</h5>
              <div className="d-flex flex-column w-20">
                <div className="break-word mt-1">ชื่อนามสกุล : นายทำดี</div>
                <div className="break-word mt-1">
                  เลขที่ประจำมาตรวัดน้ำ : 0-112734-56
                </div>
                <div className="break-word mt-1">
                  ที่ติดตั้งมาตร: บ้านเลขที่ 56/1 หมู่ 3 ต.จรเข้เผือก
                  อ.ด่านมะขามเตี้ย จ.กาญจนบุรี
                </div>
                <div className="break-word mt-1">โทรศัพท์ : 0612345678 </div>
              </div>
            </div>
            <div className="d-flex mt-5 mb-3 ms-5">
              <h5 className="w-20">สถานะการใช้น้ำ</h5>
              <div className="d-flex flex-column w-20">
                <div className="break-word mt-1">ปกติ</div>
              </div>
            </div>
            <div className="d-flex mt-5 ms-5">
              <h5 className="w-20">ข้อมูลผู้ใช้น้ำ</h5>
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <CForm className="me-4">
                    <CFormInput
                      label="จดเลขครั้งก่อน"
                      disabled
                      defaultValue={1893790}
                    />
                  </CForm>
                  <CForm className="mx-4">
                    <CFormInput label="จดเลขครั้งนี้" />
                  </CForm>
                </div>
                <button className="wblue-button-unrounded-nocenter mt-5 w-40 mb-5 text-center">
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handlePayClick = (data) => {
    setEditData(data);
    console.log(editData);
    console.log(TRANSACTION_API);
  };
  //ใบเสร็จ
  let dialogcontent1;
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
      <CForm className="w-50">
        <CFormInput
          label="สิทธิ์ที่ได้รับ (ส่วนลด)"
          name="promotion_percent"
          value={addNewData.unituse}
          onChange={handleNewInputChange}
        />
      </CForm>
      {/* <div className="d-flex flex-column"  > */}
      {/* <p class="fw-bolder">
          สรุปยอดชำระ
          <CFormInput
            label="สรุปยอดชำระ"
            name="unituse"
            value={addNewData.unituse}
            onChange={handleNewInputChange}
          />
        </p> */}
      {/* <div className="mt-4">ชื่อ-นามสกุล:</div> */}
      {/* เลขที่ประจำมาตรวัดน้ำ: */}
      {/* <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์: */}
      {/* <div className="customcontainer2">
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
        </div> */}
      {/* </div> */}
      {/* <div className="text-center mb-3">
        <button className="wblue-button-unrounded mt-4 w-100">
          พิมพ์ใบชำระเงิน
        </button>
      </div> */}
      {/* <b>การรับชำระ</b> */}
      {/* <div className="container mt-2 mb-2 ">
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
      </div> */}
      <div className="mt-auto text-center">
        <button className="wblue-button-unrounded mt-2 w-100">
          พิมพ์ใบเสร็จ
        </button>
      </div>
    </>
  );
  return (
    <>
      {content}
      <Dialog
        visible={paymentvisible}
        onHide={() => setPaymentvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: "25rem", height: "auto" }}
        showHeader={false}
        value={datax}
      >
        {dialogcontent1}
      </Dialog>
    </>
  );
};

export default WaterMeterFt;
