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
import moment from 'moment-timezone';

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
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilChevronLeft } from '@coreui/icons';
import { Row } from 'primereact/row';
import { Container } from '@mui/system';
function isNotEmpty(obj) {
  return obj !== undefined && obj !== null && obj !== '';
}

//filter
function StrFilter2(data, query) {
  var str = '';
  Object.keys(data).forEach(function (key) {
    if (isNotEmpty(data[key])) {
      // if (query == "") {
      if (str == '') {
        str += '?' + [key] + '=' + data[key];
      } else {
        str += '&' + [key] + '=' + data[key];
      }
    }
  });
  return str;
}

const WaterDashBoard = () => {
  let precycle_year = moment()
    .tz('Asia/Bangkok')
    .add(543, 'years')
    .format('YYYY');
  let precycle_month = moment().tz('Asia/Bangkok').format('M');

  const [dashpage, setdashpage] = useState(0);
  const [Mocdata, setMocdata] = useState([]);
  const [datapromotionfee, setdatapromotionfee] = useState([]);
  const [datastatis, setdatastatis] = useState([]);
  const [datastatisyear, setdatastatisyear] = useState([]);
  const [dataxyear, setDataxyear] = useState([]);
  const [showyear, setshowyear] = useState(precycle_year);
  const [showmonth, setshowmonth] = useState(precycle_month);

  const [datax, setDatax] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [dataFiltermonthandyear, setFiltermonthandyear] = useState({
    cycle_year: precycle_year,
    cycle_month: precycle_month,
    promotion_id: '',
  });

  useEffect(() => {
    promo();
    dash();
    dashyear();
    dashstatis();
    dashstatisyear();
  }, []);

  //ดึงข้อมูลโปรโมชั่น
  const promo = () => {
    axios
      .get(process.env.REACT_APP_API + '/promotion')
      .then((res) => setdatapromotionfee(res.data.data))
      .catch((err) => console.log(err));
  };

  //ดึงข้อมูลdashbordหน้ารายเดือน
  const dash = () => {
    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/dash' + strFilter)
      .then((res) => {
        setDatax(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  //ดึงข้อมูลdashbordหน้ารายปี
  const dashyear = () => {
    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/dashyear' + strFilter)
      .then((res) => {
        setDataxyear(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  //ดึงข้อมูล dashbord ตามเดือน
  const dashstatis = () => {
    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/dashstatis' + strFilter)
      .then((res) => {
        setdatastatis(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  //ดึงข้อมูล dashbord ตามปี
  const dashstatisyear = () => {
    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/dashstatisyear' + strFilter)
      .then((res) => {
        setdatastatisyear(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const [selectedMonth, setSelectedMonth] = useState(precycle_month);
  const month = [
    { label: 'มกราคม', value: '1' },
    { label: 'กุมภาพันธ์', value: '2' },
    { label: 'มีนาคม', value: '3' },
    { label: 'เมษายน', value: '4' },
    { label: 'พฤษภาคม', value: '5' },
    { label: 'มิถุนายน', value: '6' },
    { label: 'กรกฎาคม', value: '7' },
    { label: 'สิงหาคม', value: '8' },
    { label: 'กันยายน', value: '9' },
    { label: 'ตุลาคม', value: '10' },
    { label: 'พฤศจิกายน', value: '11' },
    { label: 'ธันวาคม', value: '12' },
  ];

  const [selecteperson, setSelecteperson] = useState(null);
  const typeperson = [
    { label: 'คน เ ก เ ร', value: 'GayLay' },
    { label: 'พรี๊โต', value: 'PeeTho' },
    { label: 'พรี๊หลาม', value: 'PeeHlam' },
    { label: 'พรี๊คาสึยะ', value: 'PeeKazuya' },
    { label: 'อ้ายคาน', value: 'EyKhan' },
    { label: 'อ้ายมันคนซั่ว', value: 'EyManKhonSow' },
  ];

  const [selectedYears, setSelectedYears] = useState(precycle_year);
  const years = [
    '2556',
    '2557',
    '2558',
    '2559',
    '2560',
    '2561',
    '2562',
    '2563',
    '2564',
    '2565',
    '2566',
    '2567',
  ];
  const mapyears = years.map((year) => ({ label: year, value: year }));

  const handlefilter = (e) => {
    const { name, value } = e.target;
    setFiltermonthandyear({
      ...dataFiltermonthandyear,
      [name]: value,
    });

    var namee = name;
    var valuee = value;
    if (namee == 'cycle_year') {
      setSelectedYears(valuee);
    }

    if (namee == 'cycle_month') {
      setSelectedMonth(valuee);
    }

    if (namee == 'promotion_id') {
      setSelecteperson(valuee);
    }
  };

  const handleclink = () => {
    setshowyear(selectedYears);
    setshowmonth(selectedMonth);

    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/dashstatis' + strFilter)
      .then((respone) => {
        console.log(respone.data.data);
        setdatastatis(respone.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(process.env.REACT_APP_API + '/dashstatisyear' + strFilter)
      .then((res) => {
        setdatastatisyear(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(process.env.REACT_APP_API + '/dash' + strFilter)
      .then((res) => {
        setDatax(res.data.data[0]);
      })
      .catch((err) => console.log(err));

    axios
      .get(process.env.REACT_APP_API + '/dashyear' + strFilter)
      .then((res) => {
        setDataxyear(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handlereset = () => {
    setSelectedMonth(precycle_month);
    setSelectedYears(precycle_year);
    setshowyear(precycle_year);
    setshowmonth(precycle_month);
    setSelecteperson('');

    var cycle_year = 'cycle_year';
    var cycle_month = 'cycle_month';
    var promotion_id = 'promotion_id';

    setFiltermonthandyear({
      ...dataFiltermonthandyear,
      [cycle_year]: precycle_year,
      [cycle_month]: precycle_month,
      [promotion_id]: '',
    });

    window.location.reload();

    // onClick = { handleclink };
    // handleclink();
  };

  const setpage = () => {
    setdashpage(1);

    var cycle_year = 'cycle_year';
    var cycle_month = 'cycle_month';
    var promotion_id = 'promotion_id';

    setFiltermonthandyear({
      ...dataFiltermonthandyear,
      [cycle_year]: precycle_year,
      [cycle_month]: '',
      [promotion_id]: '',
    });
  };

  const setpage2 = () => {
    setdashpage(0);

    var cycle_year = 'cycle_year';
    var cycle_month = 'cycle_month';
    var promotion_id = 'promotion_id';

    setFiltermonthandyear({
      ...dataFiltermonthandyear,
      [cycle_year]: precycle_year,
      [cycle_month]: precycle_month,
      [promotion_id]: '',
    });
  };

  let content;

  // รายเดือน
  if (dashpage === 0) {
    content = (
      <>
        <div style={{ padding: '1.125rem  1.875rem' }}>
          <div className='d-flex mt-2'>
            <div className='dropdowngroup' style={{ paddingBottom: '50px' }}>
              <Dropdown
                className='ms-2 rounded-pill drownyear'
                value={selectedYears}
                onChange={handlefilter}
                options={mapyears}
                name='cycle_year'
              />
              <Dropdown
                // placeholder='Month'
                className='ms-2 rounded-pill drownyear2'
                value={selectedMonth}
                onChange={handlefilter}
                options={month}
                style={{ width: 160 }}
                name='cycle_month'
              />
              <div className='p-input-icon-left ms-2'>
                <CIcon icon={cilSearch}></CIcon>
                <InputText
                  className='input-search rounded-pill'
                  style={
                    {
                      // paddingTop: 5,
                      // paddingBottom: 5,
                    }
                  }
                  placeholder='ค้นหา'
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
            <div style={{ marginLeft: 'auto' }}>
              <CFormSelect
                placeholder='ประเภทบุคคลที่ได้รับการยกเว้น'
                className='selecteperson'
                value={selecteperson}
                onChange={handlefilter}
                name='promotion_id'
              >
                <option value={''}>เลือกข้อมูลการส่งเสริม</option>
                {datapromotionfee.map((item, index) => (
                  <option key={index} value={item.promotion_id}>
                    {item.promotion_name}
                  </option>
                ))}
              </CFormSelect>
              <CCol
                style={{
                  marginTop: 13,
                  marginLeft: 6,
                  float: 'right',
                }}
              >
                <button
                  className='wblue-button me-5'
                  onClick={handleclink}
                  style={{ fontSize: 12 }}
                >
                  Apply
                </button>
                <button
                  className='wblue-button'
                  onClick={handlereset}
                  style={{ fontSize: 12, marginLeft: -44 }}
                >
                  Reset
                </button>
              </CCol>
            </div>
          </div>

          <div className='minicontainer2'>
            <h5 style={{ width: '350px' }}>
              สถิติการใช้น้ำ เดือน {showmonth} ปี {showyear}
            </h5>
            <CRow className='TopRow'>
              <CCol className='set'>
                <img
                  src={require('../../assets/images/Ps.svg').default}
                  width={30}
                  height={30}
                  className='setimg1'
                  alt='Gp Logo'
                />
                <div
                  style={{
                    display: 'inline-grid',
                    paddingLeft: '10px',
                    width: 'max-content',
                  }}
                >
                  <p className='setunit'>{datax.prapaowner}</p>
                  <p className='setunit2'>จำนวนครัวเรือนผู้ใช้น้ำ</p>
                </div>
              </CCol>

              <CCol className='set'>
                <img
                  src={require('../../assets/images/Gp.svg').default}
                  width={30}
                  height={30}
                  className='setimg2'
                  alt='Gp Logo'
                />
                <div
                  style={{
                    display: 'inline-grid',
                    paddingLeft: '10px',
                    width: 'max-content',
                  }}
                >
                  <p className='setunit'>{datax.unituse} หน่วย</p>
                  <p className='setunit2'>จำนวนการใช้น้ำ</p>
                </div>
              </CCol>
            </CRow>
          </div>

          <div className=''>
            <DataTable
              // filters={filters}
              value={datastatis}
              header='รายชื่อผู้ใช้น้ำทั้งหมด'
              paginator
              rows={8}
              paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
              currentPageReportTemplate='หน้า {currentPage} จาก {totalPages} '
            >
              <Column header='ชื่อ นามสกุล' field='fullname'></Column>
              <Column
                header='เลขที่ประจำมาตรวัดน้ำ'
                field='meternumber'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column header='ที่ติดตั้งมาตร' field='baddress'></Column>
              <Column
                header='ประเภทบุคคลที่ได้รับการยกเว้น'
                // field={promotion_name !== null ? promotion_name : 'ไม่มีค่า'}
                body={(rowData) => (
                  <span>
                    {rowData.promotion_name !== null
                      ? rowData.promotion_name
                      : 'ไม่ได้รับการยกเว้น'}
                  </span>
                )}
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column
                header='จำนวนหน่วยที่ใช้'
                field='unituse'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column
                header='เดือน'
                field='cycle_month'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column
                header='ปี'
                field='cycle_year'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </>
    );
  }

  // รายปี
  if (dashpage === 1) {
    content = (
      <>
        {/* รายปี */}
        <div style={{ padding: '1.125rem  1.875rem' }}>
          <div className='d-flex mt-2'>
            <div className='dropdowngroup' style={{ paddingBottom: '50px' }}>
              <Dropdown
                className='ms-2 rounded-pill drownyear'
                value={selectedYears}
                onChange={handlefilter}
                options={mapyears}
                name='cycle_year'
              />
              {/* <Dropdown
                // placeholder='Month'
                className='ms-2 rounded-pill drownyear2'
                value={selectedMonth}
                onChange={handlefilter}
                options={month}
                style={{ width: 160 }}
                name='cycle_month'
              /> */}
              <div className='p-input-icon-left ms-2'>
                <CIcon icon={cilSearch}></CIcon>
                <InputText
                  className='input-search rounded-pill'
                  // style={{
                  //   paddingTop: 5,
                  //   paddingBottom: 5,
                  // }}
                  placeholder='ค้นหา'
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
            <div style={{ marginLeft: 'auto' }}>
              <CFormSelect
                placeholder='ประเภทบุคคลที่ได้รับการยกเว้น'
                className='selecteperson'
                value={selecteperson}
                onChange={handlefilter}
                name='promotion_id'
              >
                <option value={''}>เลือกข้อมูลการส่งเสริม</option>
                {datapromotionfee.map((item, index) => (
                  <option key={index} value={item.promotion_id}>
                    {item.promotion_name}
                  </option>
                ))}
              </CFormSelect>
              <CCol
                style={{
                  marginTop: 13,
                  marginLeft: 6,
                  float: 'right',
                }}
              >
                <button
                  className='wblue-button me-5'
                  onClick={handleclink}
                  style={{ fontSize: 12 }}
                >
                  Apply
                </button>
                <button
                  className='wblue-button'
                  onClick={handlereset}
                  style={{ fontSize: 12, marginLeft: -44 }}
                >
                  Reset
                </button>
              </CCol>
            </div>
          </div>

          <div className='minicontainer2'>
            <h5 style={{ width: '350px' }}>สถิติการใช้น้ำ ปี {showyear}</h5>
            <CRow className='TopRow'>
              <CCol className='set'>
                <img
                  src={require('../../assets/images/Ps.svg').default}
                  width={30}
                  height={30}
                  className='setimg1'
                  alt='Gp Logo'
                />
                <div
                  style={{
                    display: 'inline-grid',
                    paddingLeft: '10px',
                    width: 'max-content',
                  }}
                >
                  <p className='setunit'>{dataxyear.prapaowner}</p>
                  <p className='setunit2'>จำนวนครัวเรือนผู้ใช้น้ำ</p>
                </div>
              </CCol>

              <CCol className='set'>
                <img
                  src={require('../../assets/images/Gp.svg').default}
                  width={30}
                  height={30}
                  className='setimg2'
                  alt='Gp Logo'
                />
                <div
                  style={{
                    display: 'inline-grid',
                    paddingLeft: '10px',
                    width: 'max-content',
                  }}
                >
                  <p className='setunit'>{dataxyear.unituse} หน่วย</p>
                  <p className='setunit2'>จำนวนการใช้น้ำ</p>
                </div>
              </CCol>
            </CRow>
          </div>

          <div className=''>
            <DataTable
              // filters={filters}
              value={datastatisyear}
              header='รายชื่อผู้ใช้น้ำทั้งหมด'
              paginator
              rows={8}
              paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
              currentPageReportTemplate='หน้า {currentPage} จาก {totalPages} '
            >
              <Column header='ชื่อ นามสกุล' field='fullname'></Column>
              <Column
                header='เลขที่ประจำมาตรวัดน้ำ'
                field='meternumber'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column header='ที่ติดตั้งมาตร' field='baddress'></Column>
              <Column
                header='ประเภทบุคคลที่ได้รับการยกเว้น'
                body={(rowData) => (
                  <span>
                    {rowData.promotion_name !== null
                      ? rowData.promotion_name
                      : 'ไม่ได้รับการยกเว้น'}
                  </span>
                )}
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column
                header='จำนวนหน่วยที่ใช้'
                field='sumunituse'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
              <Column
                header='ปี'
                field='cycle_year'
                bodyStyle={{ textAlign: 'center' }}
              ></Column>
            </DataTable>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <CNav variant='pills' role='tablist'>
        <CNavItem role='presentation' className='cnav'>
          <CNavLink
            active={dashpage == 0}
            component='button'
            role='tab'
            aria-controls='home-tab-pane'
            aria-selected={dashpage == 0}
            onClick={setpage2}
          >
            รายเดือน
          </CNavLink>
        </CNavItem>
        <CNavItem role='presentation' className='cnav'>
          <CNavLink
            active={dashpage == 1}
            component='button'
            role='tab'
            aria-controls='home-tab-pane'
            aria-selected={dashpage == 1}
            onClick={setpage}
          >
            รายปี
          </CNavLink>
        </CNavItem>
      </CNav>
      {content}
    </>
  );
};

export default WaterDashBoard;
