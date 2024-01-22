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
import { Container } from "@mui/system";

const WaterDashBoard = () => {
  const [Mocdata, setMocdata] = useState([]);

  useEffect(() => {
    setMocdata([
      {
        fullname: "Tom Heaton",
        meter_num: "0-112734-56",
        address: "56/1   หมู่ 3   ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "10",
      },
      {
        fullname: "André Onana",
        meter_num: "0-112734-56",
        address: "32   หมู่ 3   ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ระงับใช้น้ำชั่วคราว",
        Useset_unit: "5",
      },
      {
        fullname: "Altay Bayindir",
        meter_num: "0-112734-56",
        address: "56/2   หมู่ 4   ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "25",
      },
      {
        fullname: "Victor Lindelöf",
        meter_num: "0-112734-56",
        address: "11/1   หมู่ 4   ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ค้างชำระ",
        Useset_unit: "9",
      },
      {
        fullname: "Harry Maguire",
        meter_num: "0-112734-56",
        address: "39/2   หมู่ 4   ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "15",
      },
      {
        fullname: "Lisandro Martínez",
        meter_num: "0-112734-56",
        address: "88   หมู่ 4   ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "16",
      },
      {
        fullname: "Tyrell Malacia",
        meter_num: "0-112734-56",
        address: "88 หมู่ 4 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ระงับใช้น้ำชั่วคราว",
        Useset_unit: "10",
      },
      {
        fullname: "Raphaël-Varane",
        meter_num: "0-112734-56",
        address: "72 หมู่ 3 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ระงับใช้น้ำชั่วคราว",
        Useset_unit: "5",
      },
      {
        fullname: "Diogo-Dalot",
        meter_num: "0-112734-56",
        address: "95 หมู่ 6 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ค้างชำระ",
        Useset_unit: "7",
      },
      {
        fullname: "Luke-Shaw",
        meter_num: "0-112734-56",
        address: "61 หมู่ 7 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "15",
      },
      {
        fullname: "Aaron-Wan-Bissaka",
        meter_num: "0-112734-56",
        address: "83 หมู่ 1 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "10",
      },
      {
        fullname: "Jonny-Evans",
        meter_num: "0-112734-56",
        address: "47 หมู่ 9 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "9",
      },
      {
        fullname: "Bruno-Fernandes",
        meter_num: "0-112734-56",
        address: "59 หมู่ 5 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "8",
      },
      {
        fullname: "Christian-Eriksen",
        meter_num: "0-112734-56",
        address: "34 หมู่ 2 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "13",
      },
      {
        fullname: "Casemiro",
        meter_num: "0-112734-56",
        address: "76 หมู่ 8 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ปกติ",
        Useset_unit: "40",
      },
      {
        fullname: "Facundo-Pellistri",
        meter_num: "0-112734-56",
        address: "21 หมู่ 10 ต.จรเข้เผือก",
        type: "xxxxxxxxxxxxxxxxxxx",
        status: "ค้างชำระ",
        Useset_unit: "20",
      },
    ]);
    console.log(Mocdata);
  }, []);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [datax, setDatax] = useState([]);
  const NHARA_API = process.env.REACT_APP_CENSUS_API;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/dash")
      .then((res) => {
        console.log(res);
        setDatax(res.data.data[0].unituse);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(datax);

  let content;

  content = (
    <>
      <div style={{ padding: "3.125rem 1.875rem" }}>
        <div className="d-flex mt-2">
          <div style={{ paddingBottom: "50px" }}>
            <Dropdown placeholder="2556" className="ms-2 rounded-pill" />
            <Dropdown placeholder="มกราคม" className="ms-2 rounded-pill" />
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
          <div style={{ marginLeft: "auto" }}>
            <Dropdown
              placeholder="ประเภทบุคคลที่ได้รับการยกเว้น"
              className="ms-2 rounded-pill"
              style={{ display: "flex", justifyContent: "end" }}
            />
          </div>
        </div>

        <div className="minicontainer2">
          <h5 style={{ width: "350px" }}>
            สถิติการใช้น้ำ เดือน มกราคม ปี 2566
          </h5>
          <CRow className="TopRow">
            <CCol className="set">
              <img
                src={require("../../assets/images/Ps.svg").default}
                width={30}
                height={30}
                className="setimg1"
                alt="Gp Logo"
              />
              <div
                style={{
                  display: "inline-grid",
                  paddingLeft: "10px",
                  width: "max-content",
                }}
              >
                <p className="setunit">{datax}</p>
                <p className="setunit2">จำนวนครัวเรือนผู้ใช้น้ำ</p>
              </div>
            </CCol>

            <CCol className="set">
              <img
                src={require("../../assets/images/Gp.svg").default}
                width={30}
                height={30}
                className="setimg2"
                alt="Gp Logo"
              />
              <div
                style={{
                  display: "inline-grid",
                  paddingLeft: "10px",
                  width: "max-content",
                }}
              >
                <p className="setunit">{datax} หน่วย</p>
                <p className="setunit2">จำนวนการใช้น้ำ</p>
              </div>
            </CCol>

            <CCol className="set">
              <img
                src={require("../../assets/images/Bs.svg").default}
                width={30}
                height={30}
                className="setimg3"
                alt="Gp Logo"
              />
              <div
                style={{
                  display: "inline-grid",
                  paddingLeft: "10px",
                  width: "max-content",
                }}
              >
                <p className="setunit">{datax} บาท</p>
                <p className="setunit2">จำนวนค่าน้ำ</p>
              </div>
            </CCol>
          </CRow>
        </div>

        <div className="">
          <DataTable
            // filters={filters}
            value={Mocdata}
            header="รายชื่อผู้ใช้น้ำทั้งหมด"
            paginator
            rows={8}
            paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
            currentPageReportTemplate="หน้า {currentPage} จาก {totalPages} "
          >
            <Column header="ชื่อ นามสกุล" field="fullname"></Column>
            <Column
              header="เลขที่ประจำมาตรวัดน้ำ"
              field="meter_num"
              bodyStyle={{ textAlign: "center" }}
            ></Column>
            <Column header="ที่ติดตั้งมาตร" field="address"></Column>
            <Column
              header="ประเภทบุคคลที่ได้รับการยกเว้น"
              field="type"
              bodyStyle={{ textAlign: "center" }}
            ></Column>
            <Column
              header="สถานะการใช้น้ำ"
              field="status"
              bodyStyle={{ textAlign: "center" }}
            ></Column>
            <Column
              header="จำนวนหน่วยที่ใช้"
              field="Useset_unit"
              bodyStyle={{ textAlign: "center" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    </>
  );
  return <>{content}</>;
};

export default WaterDashBoard;
