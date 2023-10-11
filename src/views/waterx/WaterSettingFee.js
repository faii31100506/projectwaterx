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
import { getAllByDisplayValue } from "@testing-library/react";

const WaterSettingFee = () => {
  const [settingPage, setSettingPage] = useState("13");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const handleSelectPage = (a) => {
    setSettingPage(a);
  };
  const [registerpage, setRegisterpage] = useState(0);
  const [editData, setEditData] = useState([]);
  const [datax, setDatax] = useState([]);
  const PROMOTION_API = process.env.REACT_APP_PROMOTION_API;
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   // Update the form data as the user types
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // ดึงข้อมูล
  useEffect(() => {
    axios
      .get(PROMOTION_API)
      .then((res) => setDatax(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // บันทึกข้อมูล
  const handlepost = (event) => {
    var data = {
      promotion_name: promotion_name,
      promotion_percent: promotion_percent,
    };
    console.log(event);
    fetch("http://localhost:4034/api/nahra/modelpro", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json({}));
    return window.location.reload();
  };

  // แก้ไข
  const handleput = (event) => {
    event.preventDefault();
    var data = {
      promotion_percent: addNewData.promotion_percent,
      promotion_name: addNewData.promotion_name,
    };
    console.log(event);
    axios
      .put(
        "http://localhost:4034/api/nahra/promotion/" + addNewData.promotion_id,
        data
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        return res.data.token, window.location.reload();
      });
  };

  // ลบ
  const handleDel = (promotion_id) => {
    var data = {
      promotion_id: promotion_id,
    };
    console.log(promotion_id);
    axios
      .delete("http://localhost:4034/api/nahra/prodel/" + data.promotion_id, {})
      .then((res) => {
        if (res.status == 200) {
          alert("succesfull");
        }
        console.log(res);
        console.log(res.data);
        return res.data.token, window.location.reload();
      });
  };

  //ปุ่มแกไข
  const EditIcon = (data) => {
    console.log(data);
    return (
      <button className="buttonpic">
        <img
          src={require("../../assets/images/edit.png")}
          width={30}
          height={30}
          onClick={() => {
            setRegisterpage(1);
            handleEdit(data);
          }}
        />
      </button>
    );
  };
  // ปุ่มลบ
  const RemoveIcon = (data) => {
    return (
      <button className="buttonpic">
        <img
          src={require("../../assets/images/remove.png")}
          width={30}
          height={30}
          onClick={() => {
            handleDel(data);
          }}
        />
      </button>
    );
  };

  const [addNewData, setAddNewData] = useState({
    promotion_id: "",
    promotion_percent: "",
    promotion_name: "",
  });

  const [promotion_percent, setPromotion_percent] = useState("");
  const [promotion_name, setPromotion_name] = useState("");

  useEffect(() => {
    setAddNewData({
      promotion_percent: editData.promotion_percent || "",
      promotion_name: editData.promotion_name || "",
      promotion_id: editData.promotion_id || "",
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

  // หน้าแสดงข้อมูลหลัก
  if (settingPage === "13") {
    content = (
      <>
        <div>
          <div className="d-flex flex-column mt-5 ml-10">
            <div className="mr-10">
              <DataTable
                value={datax}
                header="รายการข้อมูลเพื่อส่งเสริมหรืออุดหนุน"
                filters={filters}
              >
                <Column
                  body={(rowData) => <span>{rowData.promotion_name}</span>}
                  header="ประเภทข้อมูลเพื่อส่งเสริมหรืออุดหนุน"
                ></Column>
                <Column
                  body={(rowData) => <span>{rowData.promotion_percent}</span>}
                  header="สิทธิ์ที่ได้รับ (ส่วนลด)"
                ></Column>
                <Column
                  field="editstat"
                  body={(rowData) => EditIcon(rowData)}
                  header=""
                ></Column>
                <Column
                  body={(rowData) => RemoveIcon(rowData.promotion_id)}
                  header=""
                ></Column>
              </DataTable>
            </div>
          </div>
          {/* เพิ่ม */}
          <div className="mx-5">
            <h5 className="ml-10 mt-5">เพิ่มข้อมูลเพื่อส่งเสริมหรืออุดหนุน</h5>
            <div className="d-flex ml-10 mt-2 pb-3">
              <div className="me-5">
                <CForm>
                  <CFormInput
                    label="ประเภทข้อมูลเพื่อส่งเสริมหรืออุดหนุน"
                    onChange={(e) => setPromotion_name(e.target.value)}
                  />
                </CForm>
              </div>
              <div className="me-5">
                <CForm>
                  <CFormInput
                    label="สิทธิ์ที่ได้รับ (ส่วนลด)"
                    onChange={(e) => setPromotion_percent(e.target.value)}
                  />
                </CForm>
              </div>
              <button
                className="wblue-button-unrounded-nocenter w-10 h-50 mt-4 text-center"
                onClick={handlepost}
              >
                เพิ่มข้อมูล
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // แก้ไขข้อมูล
  const handleEdit = (data) => {
    setEditData(data);
    console.log(editData);
    console.log(PROMOTION_API);
  };
  if (registerpage === 1) {
    content = (
      <>
        <div className="d-flex flex-column">
          <h2 className="mx-3">แก้ไข</h2>
          <div className="d-flex mt-4">
            <img
              className="mt-1"
              src={require("../../assets/images/backbutton.png")}
              width={30}
              height={30}
              onClick={() => setRegisterpage(0)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <CForm className="row g-3">
              <CForm className="w-50">
                <CFormInput
                  label="ประเภทข้อมูลเพื่อส่งเสริมหรืออุดหนุน"
                  name="promotion_name"
                  value={addNewData.promotion_name}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className="w-50">
                <CFormInput
                  label="สิทธิ์ที่ได้รับ (ส่วนลด)"
                  name="promotion_percent"
                  value={addNewData.promotion_percent}
                  onChange={handleNewInputChange}
                />
              </CForm>
            </CForm>
          </div>
          <div className="d-flex mt-4">
            <CCol className="align-items-center">
              <button
                type="button"
                class="btn btn-primary "
                onClick={handleput}
                style={{ float: "left", marginLeft: 50 }}
              >
                บันทึก
              </button>
            </CCol>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h4 className="mt-4 mx-4" value="13">
        ข้อมูลเพื่อส่งเสริมหรืออุดหนุน
      </h4>
      <div className="customcontainer3 mt-5">
        <div className="d-flex flex-column">{content}</div>
      </div>
    </>
  );
};

export default WaterSettingFee;
