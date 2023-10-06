import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./waterx.css";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import PropTypes from "prop-types";
import CIcon from "@coreui/icons-react";
import { cilSearch } from "@coreui/icons";

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

  const data = [
    {
      name: "นายทำดี สีสะอาด",
      meterid: "0-112734-56",
      meterplace: "56/1 หมู่ 3 ต.จรเข้เผือก",
      wstatus: "ค้างชำระ",
      oldmeter: "5673",
      curmeter: "5688",
      difference: "15",
    },
    {
      name: "นางศรีนวล มานะ",
      meterid: "0-112734-56",
      meterplace: "32 หมู่ 3 ต.จรเข้เผือก",
      wstatus: "ระงับใช้น้ำชั่วคราว",
      oldmeter: "8200",
      curmeter: "8240",
      difference: "40",
    },
  ];
  const PaydeptButton = ({ data }) => {
    const handlePayClick = () => {
      // Use the 'data' prop here
      setMeterFtpage(2);

      // You can also call functions to handle the payment logic, etc.
      // For example: handlePayment(data);
    };

    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        // onClick={handlePayClick}
      >
        พิมพ์ใบเเจ้งหนี้
      </button>
    );
  };

  PaydeptButton.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };
  const MeterRecord = ({ data }) => {
    const handleMeterRecordClick = () => {
      // Use the 'data' prop here
      setMeterFtpage(3);

      // You can also call functions to handle the payment logic, etc.
      // For example: handlePayment(data);
    };

    return (
      <button
        type="button"
        className="btn btn-outline-success rounded-pill"
        onClick={handleMeterRecordClick}
      >
        จดมิเตอร์ค่าน้ำ
      </button>
    );
  };

  MeterRecord.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
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
            <Dropdown
              placeholder="เงื่อนไขการค้นหา"
              className="ms-2 rounded-pill"
            />
          </div>
          <button
            className="wblue-button me-5"
            onClick={() => setMeterFtpage(1)}
          >
            + จดมิเตอร์ค่าน้ำ
          </button>
        </div>
        <div className="mt-5">
          <DataTable
            value={data}
            header="ตารางรายการจดมิเตอร์ค่าน้ำ"
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column field="name" header="ชื่อ นามสกุล"></Column>
            <Column field="meterid" header="เลขที่ประจำมาตรวัดน้ำ"></Column>
            <Column field="meterplace" header="ที่ติดตั้งมาตร"></Column>
            <Column field="wstatus" header="สถานะการใช้น้ำ"></Column>
            <Column field="oldmeter" header="เลขมิเตอร์ครั้งก่อน"></Column>
            <Column field="curmeter" header="เลขมิเตอร์ครั้งนี้"></Column>
            <Column field="difference" header="จำนวนหน่วยที่ใช้"></Column>
            <Column body={PaydeptButton} header="ต้องการชำระเงิน"></Column>
          </DataTable>
        </div>
      </>
    );
  }
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
            value={data}
            header="ตารางรายการจดมิเตอร์ค่าน้ำ"
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
          >
            <Column field="name" header="ชื่อ นามสกุล"></Column>
            <Column field="meterid" header="เลขที่ประจำมาตรวัดน้ำ"></Column>
            <Column field="meterplace" header="ที่ติดตั้งมาตร"></Column>
            <Column field="wstatus" header="สถานะการใช้น้ำ"></Column>
            <Column body={MeterRecord} header="จดมิเตอร์ค่าน้ำ"></Column>
          </DataTable>
        </div>
      </>
    );
  }
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
                <div className="break-word mt-1">
                  ชื่อนามสกุล : นายทำดี สีสะอาด
                </div>
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

  return <>{content}</>;
};

export default WaterMeterFt;
