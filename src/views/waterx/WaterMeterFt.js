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
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import moment from "moment-timezone";

import {
  CFormCheck,
  CFormInput,
  CForm,
  CFormSelect,
  CFormTextarea,
  CCol,
} from "@coreui/react";
import { Component } from "react";
import { useRef } from "react";

const WaterMeterFt = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [meterFtpage, setMeterFtpage] = useState(0);
  const [paymentvisible, setPaymentvisible] = useState(false);
  const [datax, setDatax] = useState([]);
  const [dataxcensus, setDataxcensus] = useState([]);
  const [previousnum, setpreviousnum] = useState("");
  const [meterasset_id, setmeterasset_id] = useState([]);
  const [editData, setEditData] = useState([]);
  const [dataid, setdataid] = useState([]);
  const [record, setRecord] = useState([]);
  const [currentnum, setcurrentnum] = useState([]);
  const [sumprices, setsumprices] = useState("0");
  const [Maintenance, setMaintenance] = useState(5);
  const [MeterUnit, setMeterUnit] = useState(5);
  const TRANSACTION_API = process.env.REACT_APP_TRANSACTION_API;
  // const NHARA_API = process.env.REACT_APP_NHARA_API;

  let unituse = currentnum - previousnum;

  const Displayunit = (rowData) => {
    return (
      <span>
        {rowData.budget !== null
          ? Intl.NumberFormat("en-US").format(rowData.budget)
          : rowData.budget}
      </span>
    );
  };

  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };

  const handlePrint2 = () => {
    <ReactToPrint content={() => componentRef.current} />;
  };

  useEffect(() => {
    axios
      .get(TRANSACTION_API)
      .then((res) => setDatax(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const [rate, setrate] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4034/api/nahra/rate")
      .then((res) => {
        const data = res.data.data;
        // const truedata = data.map((item) => item.min_m3);

        setrate(data);

        // console.log(data[2].min_m3);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4034/api/nahra/listcensus")
      .then((res) => {
        setDataxcensus(res.data.data);
        // setmeterasset_id(res.data.data.meterasset_id);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4034/api/nahra/previousnum?id=" + meterasset_id)
      .then((res) => {
        if (
          res.data.data[0].previousnum == null ||
          res.data.data[0].previousnum == ""
        ) {
          setpreviousnum("0");
        } else {
          setpreviousnum(res.data.data[0].previousnum);
        }
      })
      .catch((err) => console.log(err));
  }, [meterasset_id]);

  // กดบันทึกมาตรน้ำ
  const handleprasection = () => {
    let cycle_year = moment()
      .tz("Asia/Bangkok")
      .add(543, "years")
      .format("YYYY");
    let cycle_month = moment().tz("Asia/Bangkok").format("MM");

    if (currentnum == "") {
      return Swal.fire({
        text: "โปรดกรอกข้อมูลก่อนบันทึก",
        icon: "warning",
        buttonsStyling: false,
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn fw-bold btn-primary",
        },
      });
    }

    var data = {
      prapaowner_id: record.prapaowner_id,
      previousnum: previousnum,
      currentnum: currentnum,
      unituse: unituse,
      meterasset_id: record.meterasset_id,
      status_trasaction: "จดแล้ว",
      cycle_year: cycle_year,
      cycle_month: cycle_month,
    };

    // เช็คจาก previousnum ว่าเป็นคนที่เคยมีใน prasection มั้ย
    if (previousnum == "0") {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light",
        },
      }).then(async function (result) {
        if (result.value) {
          let resultsL = await axios
            .post(process.env.REACT_APP_API + "/modeltrasection", data)
            .then(
              (res) => {
                if (res.status === 200) {
                }
                console.log(res);
                Swal.fire({
                  icon: "success",
                  title: "succesfull",
                  preConfirm: () => {
                    return window.location.reload();
                  },
                });
              },
              async (error) => {
                Swal.fire({
                  text: "บันทึกข้อมูลไม่สำเร็จ.",
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "ตกลง.",
                  customClass: {
                    confirmButton: "btn fw-bold btn-primary",
                  },
                });
              }
            );
        }
      });
    } else {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลหรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-light",
        },
      }).then(async function (result) {
        if (result.value) {
          let resultsL = await axios
            .post(process.env.REACT_APP_API + "/currentnum", data)
            .then(
              (res) => {
                if (res.status === 200) {
                }
                console.log(res);
                Swal.fire({
                  icon: "success",
                  title: "succesfull",
                  preConfirm: () => {
                    return window.location.reload();
                  },
                });
              },
              async (error) => {
                Swal.fire({
                  text: "บันทึกข้อมูลไม่สำเร็จ.",
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "ตกลง.",
                  customClass: {
                    confirmButton: "btn fw-bold btn-primary",
                  },
                });
              }
            );
        }
      });
    }
  };

  useEffect(() => {
    if (rate.length > 0) {
      if (dataid.unituse >= 0 && dataid.unituse <= rate[0].max_m3) {
        setMeterUnit(rate[0].price);
      } else if (
        dataid.unituse >= rate[1].min_m3 &&
        dataid.unituse <= rate[1].max_m3
      ) {
        setMeterUnit(rate[1].price);
      } else if (dataid.unituse >= 101) {
        setMeterUnit(rate[2].price);
      }
    }
  }, [dataid.unituse, rate]);

  const PaydeptButton = (data) => {
    console.log(data.prapaowner_id);
    const handlePayClick = (data) => {
      setPaymentvisible(true, data);
      setdataid(data);
    };

    useEffect(() => {
      let sum =
        dataid.unituse * MeterUnit - dataid.promotion_percent + Maintenance;
      if (sum <= 0) {
        setsumprices("0");
      } else {
        setsumprices(sum);
      }
    }, [dataid, MeterUnit, Maintenance]);

    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        onClick={() => {
          handlePayClick(data);
          console.log(data);
        }}
        style={{ fontSize: 14 }}
      >
        ใบแจ้งหนี้
      </button>
    );
  };

  PaydeptButton.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };

  const MeterRecord = (data) => {
    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        onClick={() => {
          handleMeterRecordClick(data);
          setMeterFtpage(3);
          setmeterasset_id(data.meterasset_id);
        }}
        style={{ fontSize: 14 }}
      >
        จดมิเตอร์ค่าน้ำ
      </button>
    );
  };

  const handleMeterRecordClick = (data) => {
    setRecord(data);
  };

  MeterRecord.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };

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
    bmoo: "",
    baddress: "",
    tambon_name: "",
    amphoe_name: "",
    province_name: "",
    numberphone: "",
    meterasset_id: "",
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
      bmoo: editData.bmoo || "",
      baddress: editData.baddress || "",
      tambon_name: editData.tambon_name || "",
      amphoe_name: editData.amphoe_name || "",
      province_name: editData.province_name || "",
      numberphone: editData.numberphone || "",
      meterasset_id: editData.meterasset_id || "",
    });
  }, [editData]);

  const handlecheck = (e) => {
    var value = e.target.value;

    if (value === "-") {
      Swal.fire({
        text: "โปรดอย่ากรอกติดลบ",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn fw-bold btn-primary",
        },
      });

      setcurrentnum("");
    } else {
      // const withoutCommas = value.replaceAll(',', '');
      setcurrentnum(value);
    }

    if (value === ".") {
      Swal.fire({
        text: "โปรดอย่ากรอกจุดทศนิยมก่อน",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn fw-bold btn-primary",
        },
      });

      setcurrentnum("");
    } else {
      // const withoutCommas = value.replaceAll(',', '');
      setcurrentnum(value);
    }
  };

  const checkminus = (e) => {
    const characterCode = e.key;

    if (characterCode === "Backspace") return;
    const characterNumber = Number(characterCode);
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return;
      } else if (characterNumber === 0) {
        e.preventDefault();
      }
    } else if (characterCode === ".") {
      e.preventDefault();
    } else if ((e.ctrlKey || e.metaKey) && characterCode === "v") {
      return;
    } else if ((e.ctrlKey || e.metaKey) && characterCode === "c") {
      return;
    } else if ((e.ctrlKey || e.metaKey) && characterCode === "a") {
      return;
    } else if ((e.ctrlKey || e.metaKey) && characterCode === "x") {
      return;
    } else {
      e.preventDefault();
    }
  };

  let content;

  // หน้ารายชื่อคนที่จดแล้ว
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
              field="meternumber"
              header="เลขที่ประจำมาตรวัดน้ำ"
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              field="address"
              header="ที่ติดตั้งมาตร"
              style={{ fontSize: 14 }}
            ></Column>

            <Column
              field="previousnum"
              header="เลขมิเตอร์ครั้งก่อน"
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              field="currentnum"
              header="เลขมิเตอร์ครั้งนี้"
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              field="unituse"
              header="จำนวนหน่วยที่ใช้"
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              body={(rowData) => PaydeptButton(rowData)}
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
              field="fullname"
            ></Column>
            <Column
              header="เลขที่ประจำมาตรวัดน้ำ"
              style={{ fontSize: 14 }}
              field="meternumber"
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
              field="status_name"
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

  // หน้าบันทึกค่าน้ำ
  if (meterFtpage === 3) {
    content = (
      <>
        <div className="d-flex mt-4">
          <img
            className="mt-1"
            src={require("../../assets/images/backbutton.png")}
            width={30}
            height={30}
            onClick={() => setMeterFtpage(1)}
          />
          <h2 className="ms-2">จดมิเตอร์ค่าน้ำ</h2>
        </div>

        <div className="customcontainer2 mt-4 ms-4">
          <div className="d-flex flex-column">
            <div className="d-flex mt-5 mb-3 ms-5">
              <p className="ptransaction">ข้อมูลผู้ใช้น้ำ</p>
              <div className="d-flex flex-column ptransaction2">
                <div className="break-word mt-1">
                  ชื่อนามสกุล : {record.fname} {record.lname}
                </div>
                <div
                  className="break-word mt-1"
                  style={{ width: "max - content" }}
                >
                  เลขที่ประจำมาตรวัดน้ำ : {record.meternumber}
                </div>
                <div className="break-word mt-1">
                  ที่ติดตั้งมาตร: บ้านเลขที่ {record.baddress} หมู่{" "}
                  {record.bmoo}
                  ตำบล.{record.tambon_name} อำเภอ.{record.amphoe_name}
                  จังหวัด.{record.province_name}
                </div>
                <div className="break-word mt-1">
                  โทรศัพท์ : {record.numberphone}
                </div>
                <div className="break-word mt-1">
                  สถานะการใช้น้ำ : {record.status_name}
                </div>
              </div>
            </div>
            <div className="d-flex mt-5 ms-5">
              <p className="ptransaction"></p>
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <CForm className="mx-4">
                    <CFormInput
                      className="input"
                      label="จดเลขครั้งก่อน"
                      disabled
                      value={previousnum}
                    />
                  </CForm>
                  <CForm className="mx-4">
                    <label>จดเลขครั้งนี้</label>
                    <NumberFormat
                      style={{ marginTop: 8 }}
                      onChange={(e) => handlecheck(e)}
                      className="form-control"
                      onKeyDown={checkminus}
                      tabIndex="0"
                    />
                  </CForm>
                </div>
                <button
                  className="wblue-button-unrounded-nocenter mt-5 w-40 mb-5 text-center"
                  onClick={handleprasection}
                >
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
      <CCol style={{ display: "inline-flex", marginBottom: 10 }}></CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>สิทธิ์ที่ได้รับ (ส่วนลด) : </label>{" "}
        <p class="text-start" label="เลขประจำมาตรน้ำ" name="promotion_percent">
          {dataid.promotion_name} {dataid.promotion_percent}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>เลขประจำมาตรน้ำ : </label>{" "}
        <p class="text-start" label="เลขประจำมาตรน้ำ" name="meternumber">
          {dataid.meternumber}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>ชื่อ : </label>{" "}
        <p class="text-start" label="ชื่อ" name="fname">
          {dataid.fname} {dataid.lname}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>ที่อยู่ : </label>{" "}
        <p class="text-start" label="ที่อยู่" name="address">
          {dataid.address}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>หน่วยน้ำครั้งก่อน : </label>{" "}
        <p class="text-start" label="หน่วยน้ำครั้งก่อน" name="previousnum">
          {dataid.previousnum}{" "}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>หน่วยน้ำครั้งล่าสุด : </label>{" "}
        <p class="text-start" label="หน่วยน้ำครั้งล่าสุด" name="currentnum">
          {dataid.currentnum}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>หน่วยน้ำที่ใช้ไป : </label>{" "}
        <p class="text-start" label="หน่วยน้ำที่ใช้ไป" name="unituse">
          {dataid.unituse}
        </p>
      </CCol>

      {/* ไม่อยากแสดงก็ลบออกเลย */}
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>คิดราคาหน่วยละ : </label>{" "}
        <p class="text-start" label="หน่วยน้ำที่ใช้ไป" name="unituse">
          {MeterUnit}
        </p>
      </CCol>

      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>ค่าบำรุงมาตรวัดน้ำ : </label>{" "}
        <p class="text-start" label="หน่วยน้ำที่ใช้ไป" name="unituse">
          {Maintenance}
        </p>
      </CCol>
      <CCol style={{ display: "inline-flex" }}>
        {" "}
        <label>สรุปยอดชำระ : </label>{" "}
        <p class="text-start" label="สรุปยอดชำระ" name="promotion_percent">
          {sumprices}
        </p>
      </CCol>
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
        <button
          className="wblue-button-unrounded mt-2 w-100"
          onClick={handlePrint}
        >
          พิมพ์ใบเสร็จ
        </button>
      </div>
      <div className="mt-auto text-center">
        <button
          className="wblue-button-unrounded mt-2 w-100"
          onClick={handlePrint2}
        >
          พิมพ์ใบเสร็จ
        </button>
      </div>
      {/* <ReactToPrint
        trigger={(dataid) => (
          <div className="mt-auto text-center">
            <button className="wblue-button-unrounded mt-2 w-100">
              พิมพ์ใบเสร็จ
            </button>
          </div>
        )}
        content={() => componentRef.current}
      /> */}
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
      {/* <div ref={componentRef} style={{ display: "none" }}>
        ss
      </div> */}
    </>
  );
};

export default WaterMeterFt;
