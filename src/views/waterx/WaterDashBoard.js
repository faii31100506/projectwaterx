import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import './waterx.css';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import { Steps } from 'primereact/steps';
import axios from 'axios';

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
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilChevronLeft } from '@coreui/icons';
import { Row } from 'primereact/row';

const WaterDashBoard = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [datax, setDatax] = useState([]);
  const NHARA_API = process.env.REACT_APP_CENSUS_API;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/dash')
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
      <div className='minicontainer2'>
        <h5>สถิติการใช้น้ำเดือนมกราคม ปี 2566</h5>
        <CRow>
          <CCol className='set'>
            <img
              src={require('../../assets/images/Icon.png')}
              width={30}
              height={30}
              className='setimg'
            />
            <p className='setunit'>{datax} หน่วย</p>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <p className='setunit2'>จำนวนการใช้น้ำ</p>
          </CCol>
        </CRow>
      </div>
      {/* <DataTable
        value={datax}
        header='รายชื่อผู้ใช้น้ำทั้งหมด'
        filters={filters}
        paginator
        rows={8}
        paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
        currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
      >
        <Column
          header='เจ้าของมาตรวัดน้ำ'
          body={(rowData) => (
            <span>
              {rowData.prefix} {rowData.fname} {rowData.lname}
            </span>
          )}
        />
        <Column field='meternumber' header='เลขที่ประจำมาตรวัดน้ำ'></Column>
        <Column field="baddress" header="ที่ติดตั้งมาตร"></Column>
        <Column
          header='ที่ติดตั้งมาตร'
          body={(rowData) => (
            <span>
              {rowData.baddress} หมู่ {rowData.bmoo} ตำบล {rowData.tambon_name}{' '}
              อำเภอ {rowData.amphoe_name} จังหวัด {rowData.province_name}
            </span>
          )}
        />
        <Column
          field='promotion_id'
          header='ประเภทบุคคลที่ได้รับการยกเว้น'
        ></Column>
        <Column field='status_name' header='สถานะการใช้น้ำ'></Column>
        <Column field="localelink" body={MapIcon} header="ตำแหน่ง"></Column>
        <Column field='editstat' header='จำนวนหน่วยที่ใช้'></Column>
        <Column field="rem" body={RemoveIcon} header=""></Column>
      </DataTable> */}
    </>
  );
  return <>{content}</>;
};

export default WaterDashBoard;
