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
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';
import moment from 'moment-timezone';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { useParams, useLocation } from 'react-router-dom';
import { BlockUILoading1 } from './BlockUILoading';

import {
  locale,
  addLocale,
  updateLocaleOption,
  updateLocaleOptions,
  localeOption,
  localeOptions,
} from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import './waterx.css';

import {
  CFormCheck,
  CFormInput,
  CForm,
  CFormSelect,
  CFormTextarea,
  CCol,
  CButtonGroup,
  CRow,
  CButton,
} from '@coreui/react';
import { Component } from 'react';
import { useRef } from 'react';

function isNotEmpty(obj) {
  return obj !== undefined && obj !== null && obj !== '';
}

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

const WaterMeterFt = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [meterFtpage, setMeterFtpage] = useState(0);
  const [paymentvisible, setPaymentvisible] = useState(false);
  const [datax, setDatax] = useState([]);
  const [dataxcensus, setDataxcensus] = useState([]);
  const [previousnum, setpreviousnum] = useState('');
  const [meterasset_id, setmeterasset_id] = useState([]);
  const [editData, setEditData] = useState([]);
  const [dataid, setdataid] = useState([]);
  const [record, setRecord] = useState([]);
  const [currentnum, setcurrentnum] = useState([]);
  const [sumprices, setsumprices] = useState('0');
  const [Maintenance, setMaintenance] = useState(5);
  const [MeterUnit, setMeterUnit] = useState(5);
  const TRANSACTION_API = process.env.REACT_APP_TRANSACTION_API;
  const location = useLocation();
  const user2 = JSON.parse(localStorage.getItem('myObject111'));
  const [officer, setofficer] = useState('');
  const [recordby, setrecordby] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkmonth, setcheckmonth] = useState('');

  let unituse = currentnum - previousnum;
  let precycle_year = moment()
    .tz('Asia/Bangkok')
    .add(543, 'years')
    .format('YYYY');
  let precycle_month = moment().tz('Asia/Bangkok').format('M');

  const [dataFiltermonthandyear, setFiltermonthandyear] = useState({
    cycle_year: precycle_year,
    cycle_month: precycle_month,
  });

  const Displayunit = (rowData) => {
    return (
      <span>
        {rowData.budget !== null
          ? Intl.NumberFormat('en-US').format(rowData.budget)
          : rowData.budget}
      </span>
    );
  };

  const componentRef = useRef();
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    trasection();
    offi();
    checkmonth2();
  }, []);

  const trasection = () => {
    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/transaction' + strFilter)
      .then((res) => {
        setDatax(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const [rate, setrate] = useState([]);

  const offi = () => {
    axios
      .get(process.env.REACT_APP_API + '/officer')
      .then((res) => setofficer(res.data.data))
      .catch((err) => console.log(err));
  };

  const checkmonth2 = () => {
    axios
      .get(process.env.REACT_APP_API + '/checkmonth')
      .then((res) => {
        setcheckmonth(res.data.data[0].month);
        console.log(res.data.data[0].month);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/rate')
      .then((res) => {
        const data = res.data.data;
        setrate(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/listusernitprasection')
      .then((res) => {
        setDataxcensus(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/previousnum?id=' + meterasset_id)
      .then((res) => {
        if (
          res.data.data[0].previousnum == null ||
          res.data.data[0].previousnum == ''
        ) {
          setpreviousnum('0');
        } else {
          setpreviousnum(res.data.data[0].previousnum);
        }
      })
      .catch((err) => console.log(err));
  }, [meterasset_id]);

  const [selectedMonth, setSelectedMonth] = useState(precycle_month);
  const month = [
    // { label: 'มกราคม', value: '1' },
    // { label: 'กุมภาพันธ์', value: '2' },
    // { label: 'มีนาคม', value: '3' },
    // { label: 'เมษายน', value: '4' },
    // { label: 'พฤษภาคม', value: '5' },
    // { label: 'มิถุนายน', value: '6' },
    // { label: 'กรกฎาคม', value: '7' },
    // { label: 'สิงหาคม', value: '8' },
    // { label: 'กันยายน', value: '9' },
    // { label: 'ตุลาคม', value: '10' },
    // { label: 'พฤศจิกายน', value: '11' },
    // { label: 'ธันวาคม', value: '12' },
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
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
    if (namee === 'cycle_year') {
      setSelectedYears(valuee);
    }

    if (namee === 'cycle_month') {
      setSelectedMonth(valuee);
    }
  };

  const handleclink = () => {
    var strFilter = StrFilter2(dataFiltermonthandyear, '');
    axios
      .get(process.env.REACT_APP_API + '/transaction' + strFilter)
      .then((respone) => {
        console.log(respone.data.data);
        setDatax(respone.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handlereset = () => {
    setSelectedMonth(precycle_month);
    setSelectedYears(precycle_year);

    var cycle_year = 'cycle_year';
    var cycle_month = 'cycle_month';

    setFiltermonthandyear({
      ...dataFiltermonthandyear,
      [cycle_year]: precycle_year,
      [cycle_month]: precycle_month,
    });

    window.location.reload();

    // trasection();
  };

  // กดบันทึกมาตรน้ำ
  const handleprasection = () => {
    let cycle_year = moment()
      .tz('Asia/Bangkok')
      .add(543, 'years')
      .format('YYYY');
    let cycle_month = moment().tz('Asia/Bangkok').format('M');

    if (currentnum === '') {
      return Swal.fire({
        text: 'โปรดกรอกข้อมูลก่อนบันทึก',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (currentnum < previousnum) {
      return Swal.fire({
        text: 'โปรดกรอกเลขครั้งนี้ใหม่',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    var data = {
      prapaowner_id: record.prapaowner_id,
      previousnum: previousnum,
      currentnum: currentnum,
      unituse: unituse,
      meterasset_id: record.meterasset_id,
      status_trasaction: '1',
      cycle_year: cycle_year,
      cycle_month: cycle_month,
      record_by: recordby,
    };

    // เช็คจาก previousnum ว่าเป็นคนที่เคยมีใน prasection มั้ย
    if (previousnum === '0') {
      Swal.fire({
        text: 'คุณต้องการบันทึกข้อมูลหรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
        },
      }).then(async function (result) {
        if (result.value) {
          let resultsL = await axios
            .post(process.env.REACT_APP_API + '/modeltrasection', data)
            .then(
              (res) => {
                if (res.status === 200) {
                }
                console.log(res);
                Swal.fire({
                  icon: 'success',
                  title: 'succesfull',
                  preConfirm: () => {
                    return window.location.reload();
                  },
                });
              },
              async (error) => {
                Swal.fire({
                  text: 'บันทึกข้อมูลไม่สำเร็จ.',
                  icon: 'error',
                  buttonsStyling: false,
                  confirmButtonText: 'ตกลง.',
                  customClass: {
                    confirmButton: 'btn fw-bold btn-primary',
                  },
                });
              }
            );
        }
      });
    } else {
      Swal.fire({
        text: 'คุณต้องการบันทึกข้อมูลหรือไม่ ?',
        icon: 'warning',
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-light',
        },
      }).then(async function (result) {
        if (result.value) {
          let resultsL = await axios
            .post(process.env.REACT_APP_API + '/currentnum', data)
            .then(
              (res) => {
                if (res.status === 200) {
                }
                console.log(res);
                Swal.fire({
                  icon: 'success',
                  title: 'succesfull',
                  preConfirm: () => {
                    return window.location.reload();
                  },
                });
              },
              async (error) => {
                Swal.fire({
                  text: 'บันทึกข้อมูลไม่สำเร็จ.',
                  icon: 'error',
                  buttonsStyling: false,
                  confirmButtonText: 'ตกลง.',
                  customClass: {
                    confirmButton: 'btn fw-bold btn-primary',
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
    const handlePayClick = (data) => {
      setPaymentvisible(true, data);
      setdataid(data);
    };

    useEffect(() => {
      let sum =
        dataid.unituse * MeterUnit - dataid.promotion_percent + Maintenance;
      if (sum <= 0) {
        setsumprices('0');
      } else {
        setsumprices(sum);
      }
    }, [dataid, MeterUnit, Maintenance]);

    return (
      <button
        type='button'
        className='btn btn-outline-success rounded-pill'
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
        type='button'
        className='btn btn-outline-success rounded-pill'
        onClick={() => {
          handleMeterRecordClick(data);
          setMeterFtpage(3);
          setmeterasset_id(data.meterasset_id);

          console.log(data);
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
    prefix: '',
    fname: '',
    lname: '',
    meternumber: '',
    address: '',
    meter_status: '',
    previousnum: '',
    currentnum: '',
    unituse: '',
    bmoo: '',
    baddress: '',
    tambon_name: '',
    amphoe_name: '',
    province_name: '',
    numberphone: '',
    meterasset_id: '',
  });

  useEffect(() => {
    setAddNewData({
      prefix: editData.prefix || '',
      fname: editData.fname || '',
      lname: editData.lname || '',
      meternumber: editData.meternumber || '',
      address: editData.address || '',
      meter_status: editData.meter_status || '',
      previousnum: editData.previousnum || '',
      currentnum: editData.currentnum || '',
      unituse: editData.unituse || '',
      bmoo: editData.bmoo || '',
      baddress: editData.baddress || '',
      tambon_name: editData.tambon_name || '',
      amphoe_name: editData.amphoe_name || '',
      province_name: editData.province_name || '',
      numberphone: editData.numberphone || '',
      meterasset_id: editData.meterasset_id || '',
    });
  }, [editData]);

  const handlecheck = (e) => {
    var value = e.target.value;

    if (value === '-') {
      Swal.fire({
        text: 'โปรดอย่ากรอกติดลบ',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });

      setcurrentnum('');
    } else {
      setcurrentnum(value);
    }

    if (value === '.') {
      Swal.fire({
        text: 'โปรดอย่ากรอกจุดทศนิยมก่อน',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });

      setcurrentnum('');
    } else {
      setcurrentnum(value);
    }
  };

  const checkminus = (e) => {
    const characterCode = e.key;

    if (characterCode === 'Backspace') return;
    const characterNumber = Number(characterCode);
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return;
      } else if (characterNumber === 0) {
        // e.preventDefault();
        return;
      }
    } else if (characterCode === '.') {
      e.preventDefault();
    } else if ((e.ctrlKey || e.metaKey) && characterCode === 'v') {
      return;
    } else if ((e.ctrlKey || e.metaKey) && characterCode === 'c') {
      return;
    } else if ((e.ctrlKey || e.metaKey) && characterCode === 'a') {
      return;
    } else if ((e.ctrlKey || e.metaKey) && characterCode === 'x') {
      return;
    } else {
      e.preventDefault();
    }
  };

  const checkuser2 = async () => {
    if (user2 !== '') {
      var Activity = officer.filter((res) => res.fullname == user2);
      console.log(Activity);
      setrecordby(Activity[0].officer_id);
    }

    if (checkmonth !== precycle_month) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    setMeterFtpage(1);
  };

  console.log('checkmonth', checkmonth);

  const BlockUILoading = () => {
    const styles = {
      margin: '0',
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: document.documentElement.scrollHeight + 'px',
      opacity: '.5',
      backgroundColor: '#000',
      zIndex: '10000',
      overflow: 'auto',
    };

    const styles2 = {
      borderRadius: '0.475rem',
      boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
      backgroundColor: '#fff',
      color: 'rgb(24 28 50 / 72%)',
      fontWeight: '500',
      margin: '0',
      width: 'auto',
      padding: '1rem 2rem',
      top: 'calc(308% - 2rem)',
      left: 'calc(50% - 4rem)',
      zIndex: '10001',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      justifyitems: 'center',
    };

    const styles3 = {
      width: '30%',
      // left: '61%',
      // position: 'sticky',
      // // transform: 'translate(-50%, -50%)',
      // justifycontent: 'center',
    };

    const updatestatuspransection = async () => {
      var data = {
        month: precycle_month,
      };

      axios.post(process.env.REACT_APP_API + '/updateprapwner', data).then(
        (res) => {
          if (res.status === 200) {
            setcheckmonth(precycle_month);
            setLoading(false);

            Swal.fire({
              icon: 'success',
              title: 'อัพเดทสถานะสำเร็จ',
              preConfirm: () => {
                return window.location.reload();
              },
            });
          }
        },
        async (error) => {
          Swal.fire({
            text: 'อัพเดทสถานะไม่สำเร็จ',
            icon: 'error',
            buttonsStyling: false,
            confirmButtonText: 'ตกลง',
            customClass: {
              confirmButton: 'btn fw-bold btn-primary',
            },
          });
        }
      );

      // let precycle_month = moment().tz('Asia/Bangkok').format('M');
    };

    return (
      <>
        <div
          style={{ ...styles, position: 'fixed', textAlign: 'center' }}
        ></div>
        <div
          className='d-grid gap-2 col-6 mx-auto divpopup'
          style={{
            ...styles2,
            position: 'absolute',
            textAlign: 'top',
            justifyitems: 'center',
          }}
        >
          <p>
            กรุณากดเพื่อเปลี่ยนสถานะการจดของผู้ใช้น้ำ
            เพื่อทำการจดค่าน้ำของเดือนใหม่
          </p>
          <CButton
            color='primary'
            style={{ ...styles3 }}
            onClick={updatestatuspransection}
          >
            ตกลง
          </CButton>
        </div>
      </>
    );
  };

  let content;

  // หน้ารายชื่อคนที่จดแล้ว
  if (meterFtpage === 0) {
    content = (
      <>
        <CCol>
          <h2 className='mt-4 ms-4'>รายชื่อคนที่จดค่าน้ำแล้ว</h2>
        </CCol>
        <div className='d-flex justify-content-between mt-4 ms-4'>
          <div className='d-flex mt-2'>
            <Dropdown
              placeholder='Month'
              className='ms-2 rounded-pill'
              value={selectedMonth}
              name='cycle_month'
              onChange={handlefilter}
              options={month}
              style={{ width: 101 }}
            />
            <Dropdown
              placeholder='Year'
              className='ms-2 rounded-pill'
              value={selectedYears}
              name='cycle_year'
              onChange={handlefilter}
              options={mapyears}
              style={{ width: 129 }}
            />
            <CCol
              style={{
                marginTop: 13,
                marginLeft: 6,
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
                className='wblue-button me-5'
                onClick={handlereset}
                style={{ fontSize: 12, marginLeft: -44 }}
              >
                Reset
              </button>
            </CCol>

            <div className='p-input-icon-left ms-2'>
              <CIcon icon={cilSearch}></CIcon>
              <InputText
                className='input-search rounded-pill'
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
          <button
            className='wblue-button me-5'
            onClick={checkuser2}
            style={{ fontSize: 14, height: 31 }}
          >
            จดค่าน้ำ
          </button>
        </div>
        <div className='mt-5'>
          <DataTable
            value={datax}
            header='ตารางรายการจดค่าน้ำ'
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
            currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
          >
            <Column
              header='ชื่อ นามสกุล'
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
              field='meternumber'
              header='เลขที่ประจำมาตรวัดน้ำ'
              style={{ fontSize: 14 }}
            ></Column>
            {/* <Column
              field='address'
              header='ที่ติดตั้งมาตร'
              style={{ fontSize: 14 }}
            ></Column> */}

            <Column
              field='previousnum'
              header='เลขมิเตอร์ครั้งก่อน'
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              field='currentnum'
              header='เลขมิเตอร์ครั้งนี้'
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              field='unituse'
              header='จำนวนหน่วยที่ใช้'
              style={{ fontSize: 14 }}
            ></Column>
            <Column
              body={(rowData) => PaydeptButton(rowData)}
              header='การชำระเงิน'
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
        {loading && <BlockUILoading />}
        <div className='d-flex mt-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setMeterFtpage(0)}
          />
          <h2 className='ms-2'>จดค่าน้ำ</h2>
        </div>
        <div className='d-flex justify-content-between mt-4 ms-4'>
          <div className='d-flex'>
            {/* <Dropdown
              placeholder='Year'
              className='ms-2 rounded-pill'
              value={selectedYears}
              onChange={(e) => setSelectedYears(e.value)}
              options={mapyears}
            />
            <Dropdown
              placeholder='Month'
              className='ms-2 rounded-pill'
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.value)}
              options={month}
            /> */}
            <div className='p-input-icon-left ms-2'>
              <CIcon icon={cilSearch}></CIcon>
              <InputText
                className='input-search rounded-pill'
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
        </div>
        <div className='mt-5'>
          <DataTable
            header='ตารางรายการจดค่าน้ำ'
            filters={filters}
            paginator
            value={dataxcensus}
            rows={8}
            paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
            currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
          >
            <Column
              header='ชื่อ นามสกุล'
              style={{ fontSize: 14 }}
              field='fullname'
            ></Column>
            <Column
              header='เลขที่ประจำมาตรวัดน้ำ'
              style={{ fontSize: 14 }}
              field='meternumber'
            ></Column>
            <Column
              header='ที่ติดตั้งมาตร'
              style={{ fontSize: 14 }}
              body={(rowData) => (
                <span>
                  {rowData.baddress} หมู่ {rowData.bmoo} ตำบล{' '}
                  {rowData.tambon_name} อำเภอ {rowData.amphoe_name} จังหวัด{' '}
                  {rowData.province_name}
                </span>
              )}
            ></Column>
            <Column
              header='สถานะการใช้น้ำ'
              style={{ fontSize: 14 }}
              field='status_name'
            ></Column>
            <Column
              field='จดค่าน้ำ'
              body={(rowData) => MeterRecord(rowData)}
              header=''
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
        <div className='d-flex mt-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setMeterFtpage(1)}
          />
          <h2 className='ms-2'>จดมิเตอร์ค่าน้ำ</h2>
        </div>

        <div className='customcontainer2 mt-4 ms-4'>
          <div className='d-flex flex-column'>
            <div className='d-flex mt-5 mb-3 ms-5'>
              <p className='ptransaction'>ข้อมูลผู้ใช้น้ำ</p>
              <div className='d-flex flex-column ptransaction2'>
                <div className='break-word mt-1'>
                  ชื่อนามสกุล : {record.fname} {record.lname}
                </div>
                <div
                  className='break-word mt-1'
                  style={{ width: 'max - content' }}
                >
                  เลขที่ประจำมาตรวัดน้ำ : {record.meternumber}
                </div>
                <div className='break-word mt-1'>
                  ที่ติดตั้งมาตร: บ้านเลขที่ {record.baddress} หมู่{' '}
                  {record.bmoo}
                  ตำบล.{record.tambon_name} อำเภอ.{record.amphoe_name}
                  จังหวัด.{record.province_name}
                </div>
                <div className='break-word mt-1'>
                  โทรศัพท์ : {record.numberphone}
                </div>
                <div className='break-word mt-1'>
                  สถานะการใช้น้ำ : {record.status_name}
                </div>
              </div>
            </div>
            <div className='d-flex mt-5 ms-5'>
              <p className='ptransaction'></p>
              <div className='d-flex flex-column'>
                <div className='d-flex'>
                  <CForm className='mx-4'>
                    <CFormInput
                      className='input'
                      label='จดเลขครั้งก่อน'
                      disabled
                      value={previousnum}
                    />
                  </CForm>
                  <CForm className='mx-4'>
                    <label>จดเลขครั้งนี้</label>
                    <NumberFormat
                      style={{ marginTop: 8 }}
                      onChange={(e) => handlecheck(e)}
                      className='form-control'
                      onKeyDown={checkminus}
                      tabIndex='0'
                    />
                  </CForm>
                </div>
                <button
                  className='wblue-button-unrounded-nocenter mt-5 w-40 mb-5 text-center'
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
      <div className='d-flex align-items-center justify-content-center'>
        <img
          className='mt-4'
          src={require('../../assets/images/greenicon.png')}
          width={60}
          height={60}
        />
      </div>
      <CCol style={{ display: 'inline-flex', marginBottom: 10 }}></CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>สิทธิ์ที่ได้รับ (ส่วนลด) : </label>{' '}
        <p class='text-start' label='เลขประจำมาตรน้ำ' name='promotion_percent'>
          {dataid.promotion_name} {dataid.promotion_percent}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>เลขประจำมาตรน้ำ : </label>{' '}
        <p class='text-start' label='เลขประจำมาตรน้ำ' name='meternumber'>
          {dataid.meternumber}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>ชื่อ : </label>{' '}
        <p class='text-start' label='ชื่อ' name='fname'>
          {dataid.fname} {dataid.lname}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>ที่อยู่ : </label>{' '}
        <p class='text-start' label='ที่อยู่' name='address'>
          {dataid.address}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>หน่วยน้ำครั้งก่อน : </label>{' '}
        <p class='text-start' label='หน่วยน้ำครั้งก่อน' name='previousnum'>
          {dataid.previousnum}{' '}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>หน่วยน้ำครั้งล่าสุด : </label>{' '}
        <p class='text-start' label='หน่วยน้ำครั้งล่าสุด' name='currentnum'>
          {dataid.currentnum}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>หน่วยน้ำที่ใช้ไป : </label>{' '}
        <p class='text-start' label='หน่วยน้ำที่ใช้ไป' name='unituse'>
          {dataid.unituse}
        </p>
      </CCol>

      {/* ไม่อยากแสดงก็ลบออกเลย */}
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>คิดราคาหน่วยละ : </label>{' '}
        <p class='text-start' label='หน่วยน้ำที่ใช้ไป' name='unituse'>
          {MeterUnit}
        </p>
      </CCol>

      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>ค่าบำรุงมาตรวัดน้ำ : </label>{' '}
        <p class='text-start' label='หน่วยน้ำที่ใช้ไป' name='unituse'>
          {Maintenance}
        </p>
      </CCol>
      <CCol style={{ display: 'inline-flex' }}>
        {' '}
        <label>สรุปยอดชำระ : </label>{' '}
        <p class='text-start' label='สรุปยอดชำระ' name='promotion_percent'>
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
      <div className='mt-auto text-center'>
        <button
          className='wblue-button-unrounded mt-2 w-100'
          onClick={handlePrint}
        >
          พิมพ์ใบเสร็จ
        </button>
      </div>
      {/* <div className='mt-auto text-center'>
        <button
          className='wblue-button-unrounded mt-2 w-100'
          onClick={handlePrint2}
        >
          พิมพ์ใบเสร็จ
        </button>
      </div> */}
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
        style={{ width: '25rem', height: 'auto' }}
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
