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
import { Calendar } from 'primereact/calendar';
import NumberFormat from 'react-number-format';

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
  CInputGroup,
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilChevronLeft } from '@coreui/icons';
import { Row } from 'primereact/row';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import ErrorIcon from '../../assets/images/warning.png';
import OwnerIcon from '../../assets/images/owner.png';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorText = styled.p`
  color: red;
  font-style: italic;
  margin-left: 5px;
  font-size: 14px;
`;

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
  const [dialogpage, setDialogpage] = useState('0');
  const [activeIndex, setActiveIndex] = useState(0);
  const [editData, setEditData] = useState([]);
  const [datax, setDatax] = useState([]);
  const [dataprovince, setdataprovice] = useState([]);
  const [dataamphoe, setdataamphoe] = useState([]);
  const [datatambon, setdatatambon] = useState([]);
  const [datapromotionfee, setdatapromotionfee] = useState([]);
  const [dataxnull, setDataxnull] = useState([]);

  //ข้อมูลและที่อยู่ของผู้ใช้น้ำ
  const [datazipcode, setdatazipcode] = useState('');
  const [prefix, setprefix] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [pop_id, setpop_id] = useState('');
  const [caddress, setcaddress] = useState('');
  const [cmoo, setcmoo] = useState('');
  const [csoi, setcsoi] = useState('');
  const [croad, setcroad] = useState('');
  const [cprovince, setcprovice] = useState('');
  const [camphoe, setcamphoe] = useState('');
  const [ctambon, setctambon] = useState('');
  const [promotionfee, setpromotionfee] = useState('');

  const NHARA_API = process.env.REACT_APP_CENSUS_API;

  // ข้อมูลมาตรและที่ตั้งมาตร
  const [address, setaddress] = useState('');
  const [soi, setsoi] = useState('');
  const [tambon_id, settambon_id] = useState('710403');
  const [moo, setmoo] = useState('');
  const [province_id, setprovince_id] = useState('71');
  const [road, setroad] = useState('');
  const [amphoe_id, setamphoe_id] = useState('7104');
  const [zipcode, setzipcode] = useState('71250');
  const [meterasset_id, setmeterasset_id] = useState('');
  const [showmeter, setshowmeter] = useState([]);

  const [showbrand, setshowbrand] = useState('');
  const [showmodel, setshowmodel] = useState('');
  const [sizemodel, setsizemodel] = useState('');
  const [typemeter, settypemeter] = useState('');
  const [matmiter, setmatmeter] = useState('');
  const [date, setDate] = useState('');

  const [tambon, setchecktambon] = useState('0');
  const [checkpopid, setcheckpopid] = useState('0');
  const [maxcensusid, setmaxcensusid] = useState([]);
  const [maxbid, setmaxbid] = useState([]);
  const [prapaowner, setprapaownwer] = useState('');

  const [statusname, setstatusname] = useState([]);

  const [addNewData, setAddNewData] = useState({
    prapaowner_id: null,
    census_id: null,
    prefix: null,
    fname: null,
    lname: null,
    caddress: null,
    cmoo: null,
    soi: null,
    road: null,
    ctambon_name: null,
    camphoe_name: null,
    cprovince_name: null,
    zipcode: null,
    baddress: null,
    bmoo: null,
    tambon_name: null,
    amphoe_name: null,
    province_name: null,
    international_size: null,
    meternumber: null,
    metermaterial: null,
    metertypename: null,
    typeuse: null,
    usertype: null,
  });

  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');
  const [error5, setError5] = useState('');
  const [error6, setError6] = useState('');
  const [error7, setError7] = useState('');
  const [error8, setError8] = useState('');

  // เช็คชื่อนามสกุล
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    const namee = name;
    const inputValue = e.target.value;
    // ตรวจสอบรูปแบบของข้อมูล
    if (namee === 'fname') {
      if (
        inputValue === '' ||
        (/^[A-Za-z\sก-๙]+$/u.test(inputValue) &&
          !/[\u0E50-\u0E59]/.test(inputValue))
      ) {
        setfname(inputValue);
        setError('');
      } else {
        setError('โปรดกรอกภาษาไทยหรือภาษาอังกฤษเท่านั้น');
      }
    }

    if (namee === 'lname') {
      if (
        inputValue === '' ||
        (/^[A-Za-z\sก-๙]+$/u.test(inputValue) &&
          !/[\u0E50-\u0E59]/.test(inputValue))
      ) {
        setlname(inputValue);
        setError2('');
      } else {
        setError2('โปรดกรอกภาษาไทยหรือภาษาอังกฤษเท่านั้น');
      }
    }

    if (namee === 'caddress') {
      if (/^[0-9/]*$/.test(inputValue)) {
        setcaddress(inputValue);
        setError3('');
      } else {
        setError3('กรอก 0-9 และ / เท่านั้น');
      }
    }

    if (namee === 'cmoo') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setcmoo(inputValue);
        setError4('');
      } else {
        setError4('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'csoi') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setcsoi(inputValue);
        setError5('');
      } else {
        setError5('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'csoi') {
      if (inputValue === '' || /^[A-Za-z0-9/ก-๙\s]*$/u.test(inputValue)) {
        setcsoi(inputValue);
        setError5('');
      } else {
        setError5('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'address') {
      if (/^[0-9/]*$/.test(inputValue)) {
        setaddress(inputValue);
        setError6('');
      } else {
        setError6('กรอก 0-9 และ / เท่านั้น');
      }
    }

    if (namee === 'soi') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setsoi(inputValue);
        setError7('');
      } else {
        setError7('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'moo') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setmoo(inputValue);
        setError8('');
      } else {
        setError8('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }
  };

  const [formData, setFormData] = useState({
    prapaowner_id: null,
    census_id: null,
    bid_id: null,
    create_at: null,
    promotion_id: null,
    meterasset_id: null,
    prapaowner_number: null,
    paraowner_status_id: null,
    bid: null,
    oid: null,
    baddress: null,
    bmoo: null,
    bsoi: null,
    broad: null,
    tambon_name: null,
    amphoe_name: null,
    province_name: null,
    zipcode: null,
    id: null,
    pop_id: null,
    prefix: null,
    fname: null,
    lname: null,
    caddress: null,
    cmoo: null,
    soi: null,
    road: null,
    fullname: null,
    numberphone: null,
    ctambon_name: null,
    camphoe_name: null,
    cprovince_name: null,
    meter_status: null,
    meternumber: null,
    status_name: null,
    camphoe_id: null,
    ctambon_id: null,
    cprovince_id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const respone = await axios
        .get(process.env.REACT_APP_API + `/amphoe?id=` + cprovince)
        .then((respone) => {
          setdataamphoe(respone.data.data);
        });
    };
    fetchData().catch((err) => console.log(err));
  }, [cprovince]);

  useEffect(() => {
    const fetchData = async () => {
      const respone = await axios
        .get(process.env.REACT_APP_API + `/tambon?id=` + camphoe)
        .then((respone) => {
          setdatatambon(respone.data.data);
        });
    };
    fetchData().catch((err) => console.log(err));
  }, [camphoe]);

  useEffect(() => {
    province();
    census();
    promotion();
    meternowner([]);
    maxcensus_id();
    maxb_id();
  }, []);

  const census = () => {
    axios
      .get(process.env.REACT_APP_API + '/listcensus')
      .then((res) => {
        setDatax(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const maxcensus_id = () => {
    axios
      .get(process.env.REACT_APP_API + '/maxcensusid')
      .then((res) => setmaxcensusid(res.data.data[0].censusid))
      .catch((err) => console.log(err));
  };

  const maxb_id = () => {
    axios
      .get(process.env.REACT_APP_API + '/getmaxbid')
      .then((res) => {
        setmaxbid(res.data.data[0].bid);
      })
      .catch((err) => console.log(err));
  };

  const promotion = () => {
    axios
      .get(process.env.REACT_APP_API + '/promotion')
      .then((res) => setdatapromotionfee(res.data.data))
      .catch((err) => console.log(err));
  };

  const province = () => {
    axios
      .get(process.env.REACT_APP_API + '/province')
      .then((res) => setdataprovice(res.data.data))
      .catch((err) => console.log(err));
  };

  const meternowner = (edit_data) => {
    axios
      .get(process.env.REACT_APP_API + '/nullmeter')
      .then((res) => {
        var data = [];
        if (edit_data.length != 0) {
          var editDataid = {
            meterasset_id: edit_data[0].meterasset_id,
            meternumber: edit_data[0].meternumber,
            metermaster_id: edit_data[0].metermaster_id,
            meter_status: edit_data[0].meter_status,
            metertypename: edit_data[0].metertypename,
            metermaterial: edit_data[0].metermaster_id,
            international_size: edit_data[0].international_size,
            prapaowner_id: edit_data[0].prapaowner_id,
            longitude: null,
            latitude: null,
            brand: edit_data[0].brand,
            model: edit_data[0].model,
            geom_point: null,
          };
          data.push(editDataid);
        }
        data.push(...res.data.data);
        // console.log('datnull', res.data.data, data);
        setDataxnull(data);
      })
      .catch((err) => console.log(err));
  };

  //เพิ่มผู้ใช้น้ำ
  const handleinsertprapaowner = () => {
    if (checkpopid < 13) {
      return Swal.fire({
        text: 'โปรดกรอกเลขที่บัตรประจำตัวประชาชนให้ครบ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (prefix === '') {
      return Swal.fire({
        text: 'โปรดเลือกคำนำหน้า',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (fname === '') {
      return Swal.fire({
        text: 'โปรดกรอกชื่อ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (lname === '') {
      return Swal.fire({
        text: 'โปรดกรอกนามสกุล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (pop_id === '') {
      return Swal.fire({
        text: 'โปรดกรอกเลขที่บัตรประจำตัวประชาชน',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (caddress === '') {
      return Swal.fire({
        text: 'โปรดกรอกบ้านเลขที่',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (cprovince === '') {
      return Swal.fire({
        text: 'โปรดเลือกจังหวัด',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (camphoe === '') {
      return Swal.fire({
        text: 'โปรดเลือกอำเภอ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (ctambon === '') {
      return Swal.fire({
        text: 'โปรดเลือกตำบล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (meterasset_id === '') {
      return Swal.fire({
        text: 'โปรดเลือกมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (address === '') {
      return Swal.fire({
        text: 'โปรดกรอกบ้านเลขที่ ที่ติดตั้งมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    var id = maxcensusid + 1;

    var datacensus = {
      id: id,
      prefix: prefix,
      fname: fname,
      lname: lname,
      pop_id: pop_id,
      address: caddress,
      moo: cmoo !== '' ? cmoo : null,
      soi: csoi !== '' ? csoi : null,
      road: croad !== '' ? croad : null,
      province_id: cprovince,
      amphoe_id: camphoe,
      tambon_id: ctambon,
      zip_code: datazipcode,
      flag_delete: 0,
    };
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
        // สร้าง census
        let resultsL = await axios
          .post(process.env.REACT_APP_API + '/modelcensus', datacensus)
          .then(
            async (res) => {
              if (res.status === 200) {
                console.log('rescensus', res);
              }
              var census_id = res.data.data.id;
              var data = {
                census_id: census_id,
                flag: 0,
                promotion_id: promotionfee !== '' ? promotionfee : null,
                meterasset_id: meterasset_id,
                paraowner_status_id: 1,
                status_trasaction: 0,
              };

              // สร้าง prapaowner
              await axios
                .post(process.env.REACT_APP_API + '/modelowner', data)
                .then(async (res) => {
                  if (res.status === 200) {
                    console.log('prapaowner', res);
                  }

                  setprapaownwer(res.data.data.prapaowner_id);
                  console.log(res.data.data.prapaowner_id);

                  var prapaowner2 = res.data.data.prapaowner_id;

                  var bid = maxbid + 1;
                  var databuilding = {
                    bid: bid,
                    address: address,
                    moo: moo !== '' ? moo : null,
                    soi: soi !== '' ? soi : null,
                    road: road !== '' ? road : null,
                    tambon_id: tambon_id,
                    amphoe_id: amphoe_id,
                    province_id: province_id,
                  };

                  //สร้าง bu ที่ตั้งของมาตรน้ำ
                  await axios
                    .post(
                      process.env.REACT_APP_API + '/modelbuilding',
                      databuilding
                    )
                    .then(async (res) => {
                      if (res.status === 200) {
                        console.log('building', res);
                      }
                      var bid = res.data.data.bid;

                      var dataupdate = {
                        prapaowner_id: prapaowner2,
                        bid_id: bid,
                      };

                      console.log('dataupdate', dataupdate);

                      // updateb_id ใน prapaowner
                      await axios
                        .put(
                          process.env.REACT_APP_API + '/bidinprapaowner',
                          dataupdate
                        )
                        .then((res) => {
                          if (res.status === 200) {
                            console.log('updatebidinprapaowner', res);
                          }
                          Swal.fire({
                            icon: 'success',
                            title: 'succesfull',
                            preConfirm: () => {
                              return window.location.reload();
                            },
                          });
                        })
                        .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
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
  };

  const alertBro = () => {
    alert('ทดสอบ');
  };

  //ตำบลที่อยู่ของผู้ใช้น้ำ
  const handletambon = (e) => {
    setctambon(e.target.value);

    var valuetambon = e.target.value;
    var Activity = datatambon.filter((res) => res.tambon_id == valuetambon);
    if (Activity.length !== 0) {
      setdatazipcode(Activity[0].zipcode);
    }
  };

  //ตำบลที่อยู่มาตรน้ำ
  const handletambonmeter = (e) => {
    settambon_id(e.target.value);
    setzipcode('71250');
  };

  const handlemeterasset = (e) => {
    var value = e.target.value;
    var Activity = dataxnull.filter((res) => res.meterasset_id === value);
    if (Activity.length !== 0) {
      setshowbrand(Activity[0].brand);
      setshowmodel(Activity[0].model);
      setsizemodel(Activity[0].international_size);
      settypemeter(Activity[0].metertypename);
      setmatmeter(Activity[0].metermaterial);
    }
    setmeterasset_id(e.target.value);
  };

  const nextPage = () => {
    setRegisterform(registerform + 1);
    setActiveIndex(activeIndex + 1);
  };

  useEffect(() => {
    setFormData({
      prapaowner_id: editData.prapaowner_id || null,
      census_id: editData.census_id || null,
      bid_id: editData.bid_id || null,
      create_at: editData.create_at || null,
      promotion_id: editData.promotion_id || null,
      meterasset_id: editData.meterasset_id || null,
      prapaowner_number: editData.prapaowner_number || null,
      paraowner_status_id: editData.paraowner_status_id || null,
      bid: editData.bid || null,
      oid: editData.oid || null,
      baddress: editData.baddress || null,
      bmoo: editData.bmoo || null,
      tambon_name: editData.tambon_name || null,
      amphoe_name: editData.amphoe_name || null,
      province_name: editData.province_name || null,
      zipcode: editData.zipcode || null,
      bsoi: editData.bsoi || null,
      broad: editData.broad || null,
      id: editData.id || null,
      pop_id: editData.pop_id || null,
      prefix: editData.prefix || null,
      fname: editData.fname || null,
      lname: editData.lname || null,
      caddress: editData.caddress || null,
      cmoo: editData.cmoo || null,
      soi: editData.soi || null,
      road: editData.road || null,
      fullname: editData.fullname || null,
      numberphone: editData.numberphone || null,
      ctambon_name: editData.ctambon_name || null,
      camphoe_name: editData.camphoe_name || null,
      cprovince_name: editData.cprovince_name || null,
      meter_status: editData.meter_status || null,
      meternumber: editData.meternumber || null,
      status_name: editData.status_name || null,
      brand: editData.brand || null,
      model: editData.model || null,
      metermaterial: editData.metermaterial || null,
      metertypename: editData.metertypename || null,
      international_size: editData.international_size || null,
      camphoe_id: editData.camphoe_id || null,
      ctambon_id: editData.ctambon_id || null,
      cprovince_id: editData.cprovince_id || null,
    });
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const inputValue = e.target.value;

    handlemeterasset(e);

    var namee = name;
    var valuee = value;

    if (namee === 'baddress') {
      if (/^[0-9/]*$/.test(inputValue)) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError6('');
      } else {
        setError6('กรอก 0-9 และ / เท่านั้น');
      }
    }

    if (namee === 'bsoi') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError7('');
      } else {
        setError7('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'cprovince_id') {
      if (valuee === '') {
        setcamphoe('');
      }
      setcamphoe('');
      setcprovice(valuee);

      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'camphoe_id') {
      if (valuee === '') {
        setchecktambon('');
      }
      setchecktambon('');
      setcamphoe(valuee);

      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'ctambon_id') {
      if (valuee === '') {
        setchecktambon(' ');
      } else {
        setchecktambon('0');
      }

      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'meterasset_id') {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'bmoo') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError4('');
      } else {
        setError4('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'broad') {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'paraowner_status_id') {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'prefix') {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }

    if (namee === 'fname') {
      if (
        inputValue === '' ||
        (/^[A-Za-z\sก-๙]+$/u.test(inputValue) &&
          !/[\u0E50-\u0E59]/.test(inputValue))
      ) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError('');
      } else {
        setError('โปรดกรอกภาษาไทยหรือภาษาอังกฤษเท่านั้น');
      }
    }

    if (namee === 'lname') {
      if (
        inputValue === '' ||
        (/^[A-Za-z\sก-๙]+$/u.test(inputValue) &&
          !/[\u0E50-\u0E59]/.test(inputValue))
      ) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError2('');
      } else {
        setError2('โปรดกรอกภาษาไทยหรือภาษาอังกฤษเท่านั้น');
      }
    }

    if (namee === 'caddress') {
      if (/^[0-9/]*$/.test(inputValue)) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError3('');
      } else {
        setError3('กรอก 0-9 และ / เท่านั้น');
      }
    }

    if (namee === 'cmoo') {
      if (inputValue === '' || /^[A-Za-z0-9ก-๙\s]*$/u.test(inputValue)) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError4('');
      } else {
        setError4('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'soi') {
      if (inputValue === '' || /^[A-Za-z0-9/ก-๙\s]*$/u.test(inputValue)) {
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        setError5('');
      } else {
        setError5('กรอกตัวอักษรและตัวเลขเท่านั้น');
      }
    }

    if (namee === 'road') {
      setFormData({
        ...formData,
        [name]: inputValue,
      });
    }
  };

  const MapIcon = () => {
    return (
      <button className='buttonpic'>
        {' '}
        <img
          src={require('../../assets/images/map-pin.png')}
          width={30}
          height={30}
          onClick={alertBro}
        />
      </button>
    );
  };

  const EditIcon = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/edit.png')}
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
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/remove.png')}
          width={30}
          height={30}
          onClick={alertBro}
        />
      </button>
    );
  };

  const FileIcon = () => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/file.png')}
          width={30}
          height={30}
          onClick={alertBro}
        />
      </button>
    );
  };

  const PaydeptButton = ({ data }) => {
    const handlePayClick = () => {
      setPaymentvisible(true);
    };

    return (
      <button
        type='button'
        className='btn btn-outline-success rounded-pill'
        onClick={handlePayClick}
      >
        ชำระเงิน
      </button>
    );
  };

  PaydeptButton.propTypes = {
    data: PropTypes.object.isRequired, // Define the 'data' prop type
  };

  const custommeterfilter = (value, filter) => {
    return filter === 'true' ? value !== null : true;
  };

  const handleAddNewData = () => {
    console.log(addNewData);
    axios
      .post('http://localhost:4034/api/nahra/modelowner', addNewData)
      .then((response) => {
        // console.log('POST request successful');
        // console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    setAddNewData({
      prefix: null,
      fname: null,
      lname: null,
      caddress: null,
      cmoo: null,
      soi: null,
      road: null,
      ctambon_name: null,
      camphoe_name: null,
      cprovince_name: null,
      zipcode: null,
      baddress: null,
      bmoo: null,
      tambon_name: null,
      amphoe_name: null,
      province_name: null,
      international_size: null,
      meternumber: null,
      metermaterial: null,
      metertypename: null,
      typeuse: null,
      usertype: null,
    });
  };

  //บันทึกข้อมูลที่แก้ไข
  const handleEditData = () => {
    if (checkpopid < 13) {
      return Swal.fire({
        text: 'โปรดกรอกเลขที่บัตรประจำตัวประชาชนให้ครบ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.baddress === '' || formData.baddress === null) {
      return Swal.fire({
        text: 'โปรดกรอกบ้านเลขที่ ที่ติดตั้งมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.baddress === '' || formData.baddress === null) {
      return Swal.fire({
        text: 'โปรดกรอกบ้านเลขที่ ที่ติดตั้งมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (
      formData.paraowner_status_id === '' ||
      formData.paraowner_status_id === null
    ) {
      return Swal.fire({
        text: 'โปรดเลือกสถานะผู้ใช้น้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.prefix === '' || formData.prefix === null) {
      return Swal.fire({
        text: 'โปรดเลือกคำนำหน้า',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.fname === '' || formData.fname === null) {
      return Swal.fire({
        text: 'โปรดกรอกชื่อ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.lname === '' || formData.lname === null) {
      return Swal.fire({
        text: 'โปรดกรอกนามสกุล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.pop_id === '' || formData.pop_id === null) {
      return Swal.fire({
        text: 'โปรดกรอกเลขที่บัตรประจำตัวประชาชน',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.caddress === '' || formData.caddress === null) {
      return Swal.fire({
        text: 'โปรดกรอกบ้านเลขที่',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.cprovince_id === '' || formData.cprovince_id === null) {
      return Swal.fire({
        text: 'โปรดเลือกจังหวัด',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.camphoe_id === '' || formData.camphoe_id === null) {
      return Swal.fire({
        text: 'โปรดเลือกอำเภอ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (formData.ctambon_id === '' || formData.ctambon_id === null) {
      return Swal.fire({
        text: 'โปรดเลือกตำบล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (camphoe === '' || camphoe === null) {
      return Swal.fire({
        text: 'โปรดเลือกอำเภอ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (datatambon != 0 && (tambon === '' || tambon === null)) {
      return Swal.fire({
        text: 'โปรดเลือกตำบล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

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
          .put(
            'http://localhost:4034/api/nahra/owner/' + formData.prapaowner_id,
            formData
          )
          .then(
            (res) => {
              if (res.status === 200) {
                // alert("succesfull");
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
      setSuspendvisible(true);
    };
    if (data.localelink === '1') {
      return (
        <button
          type='button'
          disabled='true'
          className='btn btn-outline rounded-pill'
          onClick={handleSuspendClick}
        >
          ระงับการใช้น้ำ
        </button>
      );
    }
    if (data.localelink === '2') {
      return (
        <>
          <button
            type='button'
            className='btn btn-outline-danger rounded-pill'
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
      label: 'กรอกข้อมูลผู้ใช้',
      command: (event) => {
        setRegisterform(0);
      },
    },
    {
      label: 'ตำแหน่งติดตั้งมาตรวัดน้ำ',
      command: (event) => {
        setRegisterform(1);
      },
    },
  ];

  const debugBro = () => {
    console.log(addNewData);
  };

  const handlecheck = async (e) => {
    const { name, value } = e.target;

    var lengthvalue = e.target.value.length;
    setcheckpopid(lengthvalue);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //กรอกเลข
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

  let content;
  let formcontent;

  // หน้าหลักแสดงรายชื่อผู้ใช้น้ำ
  if (registerpage === 0) {
    content = (
      <>
        <div>
          {' '}
          {/* <img
            src={require('../../assets/images/owner.png')}
            width={60}
            height={50}
          /> */}
          <h2 className='mt-4 ms-4'>ทะเบียนผู้ใช้น้ำ</h2>
        </div>

        <div className='d-flex justify-content-between mt-4 ms-4'>
          <div className='d-flex ms-3'>
            <div className='p-input-icon-left'>
              <CIcon icon={cilSearch}></CIcon>
              <InputText
                className='p-inputtext-sm rounded-pill'
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
          <div className='d-flex me-5'>
            <button
              type='button'
              className='btn btn-outline-success rounded-pill'
              onClick={() => setRegisterpage(2)}
            >
              เพิ่มทะเบียนผู้ใช้น้ำ
            </button>
          </div>
        </div>

        <div>
          <DataTable
            value={datax}
            header='ตารางทะเบียนผู้ใช้น้ำ'
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
            currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
          >
            <Column
              header='ชื่อผู้ใช้น้ำ'
              // body={(rowData) => (
              //   <span>
              //     {rowData.prefix} {rowData.fname} {rowData.lname}
              //   </span>
              // )}
              field='fullname'
            />
            <Column field='meternumber' header='เลขที่ประจำมาตรวัดน้ำ'></Column>
            {/* <Column field="baddress" header="ที่ติดตั้งมาตร"></Column> */}
            <Column
              header='ที่ติดตั้งมาตรวัดน้ำ'
              body={(rowData) => (
                <span>
                  {rowData.baddress} หมู่ {rowData.bmoo}
                  ตำบล {rowData.tambon_name} อำเภอ {rowData.amphoe_name} จังหวัด{' '}
                  {rowData.province_name}
                </span>
              )}
            />
            {/* <Column field='watertype_name' header='ประเภทการใช้น้ำ'></Column> */}
            <Column
              field='status_name'
              header='สถานะการใช้น้ำของผู้ใช้น้ำ'
            ></Column>
            {/* <Column field="localelink" body={MapIcon} header="ตำแหน่ง"></Column> */}
            <Column
              field='editstat'
              body={(rowData) => EditIcon(rowData)}
              header=''
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
        <div className='d-flex mt-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setRegisterpage(0)}
          />
          <h2 className='ms-2'>รายการผู้ค้างชำระ</h2>
        </div>

        <div>
          <div className='d-flex mt-4 mx-3'>
            <Dropdown
              placeholder='รอบบิลที่ 360/38'
              className='ms-2 rounded-pill'
            />
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
            <Dropdown
              placeholder='เงื่อนไขการค้นหา'
              className='ms-2 rounded-pill'
            />
          </div>

          <DataTable
            value={data}
            header='รายชื่อ'
            filters={filters}
            paginator
            rows={8}
            paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
            currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
          >
            <Column field='fname' header='เจ้าของมาตรวัดน้ำ'></Column>
            <Column
              field='meterasset_id'
              header='เลขที่ประจำมาตรวัดน้ำ'
            ></Column>
            <Column field='address' header='ที่ติดตั้งมาตร'></Column>
            <Column field='wstatus' header='สถานะการใช้น้ำ'></Column>
            <Column
              field='rem'
              body={(rowData) => <PaydeptButton data={rowData} />}
              header='ต้องการชำระเงิน'
            ></Column>
            <Column field='editstat' body={SuspendButton} header=''></Column>
            <Column field='pepega' body={FileIcon} header=''></Column>
          </DataTable>
        </div>
      </>
    );
  }

  // หน้าเพิ่ม
  if (registerform === 0) {
    formcontent = (
      <>
        <div className='customcontainer1 d-flex flex-column'>
          <div className='d-flex mx-5 mt-5'>
            <h6 className='w-25'>ข้อมูลผู้ใช้น้ำ</h6>
            {/* <CFormCheck className="w-30" type="radio" name="flexRadioDefault" id="flexRadioDefault1" label="ช่องค้นหา" />
            <CFormCheck type="radio" name="flexRadioDefault" id="flexRadioDefault2" label="เสียบบัตรประชาชน" defaultChecked /> */}
          </div>
          <div className='customcontainer6 h-20 w-50 d-flex'>
            <div className='w-15'>
              <img src={require('../../assets/images/alt_avatar.png')}></img>
            </div>
            <div className='d-flex flex-column w-50  name'>
              <h11 className='showname'>ชื่อ-นามสกุล:</h11>{' '}
              <h7 className='showname2'>
                {prefix} {fname} {lname}
              </h7>
            </div>

            <div className='d-flex'>
              {/* <button className="buttonpic me-3"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={alertBro} /></button> */}

              <button
                className='wblue-button-unrounded mt-auto mb-5 text-center'
                onClick={handlePersonalNew}
              >
                เพิ่มข้อมูล
              </button>

              {/* <button className="buttonpic mx-4"><img src={require("../../assets/images/remove.png")} width={40} height={40} onClick={alertBro} /></button> */}
            </div>
          </div>
          <div className='d-flex mx-5'>
            <h6 className='w-25'>ข้อมูลเพื่อส่งเสริมหรืออุดหนุน</h6>
          </div>
          <CFormSelect
            placeholder='ช่องข้อมูลเพื่อส่งเสริมหรืออุดหนุน'
            className='w-20'
            value={promotionfee}
            onChange={(e) => setpromotionfee(e.target.value)}
          >
            <option value={''}>เลือกข้อมูลการส่งเสริม</option>
            {datapromotionfee.map((item, index) => (
              <option key={index} value={item.promotion_id}>
                {item.promotion_name}
              </option>
            ))}
          </CFormSelect>

          <button
            className='wblue-button-unrounded mt-auto mb-5 w-10 text-center'
            onClick={nextPage}
          >
            ถัดไป
          </button>
        </div>
      </>
    );
  }

  //ตำแหน่งติดตั้งมาตรวัดน้ำ
  if (registerform === 1) {
    formcontent = (
      <>
        <div className='customcontainer3 d-flex flex-column'>
          <div className='d-flex'>
            <h6>ข้อมูลตำแหน่งมาตร</h6>
            <div className='d-flex w-75 justify-content-between'>
              <CForm className='mx-5 w-33'>
                <CFormInput
                  className='mb-2'
                  label='บ้านเลขที่'
                  name='address'
                  value={address}
                  // onChange={(e) => setaddress(e.target.value)}
                  onChange={handleInputChange2}
                />
                {error6 && (
                  <ErrorContainer>
                    <img
                      src={ErrorIcon}
                      alt='Error Icon'
                      width='16'
                      height='16'
                      style={{ marginTop: -21 }}
                    />
                    <ErrorText>{error6}</ErrorText>
                  </ErrorContainer>
                )}{' '}
                <CFormInput
                  className='mt-2 mb-2'
                  label='ซอย'
                  name='soi'
                  value={soi}
                  // onChange={(e) => setsoi(e.target.value)}
                  onChange={handleInputChange2}
                />
                {error7 && (
                  <ErrorContainer>
                    <img
                      src={ErrorIcon}
                      alt='Error Icon'
                      width='16'
                      height='16'
                      style={{ marginTop: -21 }}
                    />
                    <ErrorText>{error7}</ErrorText>
                  </ErrorContainer>
                )}{' '}
                <CFormInput
                  className='mt-2 mb-2'
                  label='ตำบล / แขวง'
                  name='soi'
                  value={'หนองเป็ด'}
                  // onChange={(e) => setsoi(e.target.value)}
                  disabled
                />
              </CForm>
              <CForm className='mx-5 w-33'>
                <CFormInput
                  className='mb-2'
                  label='หมู่'
                  name='moo'
                  value={moo}
                  // onChange={(e) => setmoo(e.target.value)}
                  onChange={handleInputChange2}
                />
                {error8 && (
                  <ErrorContainer>
                    <img
                      src={ErrorIcon}
                      alt='Error Icon'
                      width='16'
                      height='16'
                      style={{ marginTop: -21 }}
                    />
                    <ErrorText>{error8}</ErrorText>
                  </ErrorContainer>
                )}{' '}
                <CFormInput
                  className='mb-2'
                  label='จังหวัด'
                  name='province_id'
                  value={'กาญจนบุรี'}
                  // onChange={(e) => setmoo(e.target.value)}
                  disabled
                />
                <CFormInput
                  className='mt-2 mb-2'
                  label='รหัสไปรษณีย์'
                  name='zipcode'
                  value={'71250'}
                  disabled
                  // onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='mx-5 w-33'>
                <CFormInput
                  className='mb-2'
                  label='ถนน'
                  name='road'
                  value={road}
                  onChange={(e) => setroad(e.target.value)}
                />

                <CFormInput
                  className='mb-2'
                  label='อำเภอ / เขต'
                  name='amphoe_id'
                  value={'ศรีสวัสดิ์'}
                  // onChange={(e) => setroad(e.target.value)}
                  disabled
                />
              </CForm>
            </div>
          </div>

          <div className='d-flex mt-5'>
            <h6>ข้อมูลมาตร</h6>
            <div className='d-flex w-5'></div>

            <div className='d-flex w-75 justify-content-between '>
              <CForm className='mx-5 w-25'>
                <CFormSelect
                  className=''
                  aria-label='Small select example'
                  label='เลขที่ประจำมาตร'
                  name='meternumber'
                  // value={addNewData.metertype_id}
                  value={meterasset_id}
                  onChange={handlemeterasset}
                >
                  <option value={''}>โปรดเลือกมาตรน้ำ</option>
                  {dataxnull.map((item, index) => (
                    <option key={index} value={item.meterasset_id}>
                      {item.meternumber}
                    </option>
                  ))}
                </CFormSelect>
              </CForm>
              <CForm className='mx-5 w-25'>
                <CFormInput
                  className=' mb-2'
                  label='Brand'
                  value={showbrand}
                  disabled
                />
              </CForm>
              <CForm className='mx-5 w-25'>
                <CFormInput
                  className=' mb-2'
                  label='Model'
                  value={showmodel}
                  disabled
                />
              </CForm>
            </div>
          </div>

          <div className='d-flex mt-5'>
            <div className='d-flex w-13'></div>

            <div className='d-flex w-75 justify-content-between '>
              <CForm className='mx-5 w-25'>
                <CFormInput
                  className=' mb-2'
                  label='ขนาดมาตร'
                  value={sizemodel !== null ? sizemodel + '' + 'นิ้ว' : ''}
                  disabled
                />
              </CForm>
              <CForm className='mx-5 w-25'>
                <CFormInput
                  className=' mb-2'
                  label='ประเภทมาตร'
                  value={typemeter}
                  disabled
                />
              </CForm>
              <CForm className='mx-5 w-25'>
                <CFormInput
                  className=' mb-2'
                  label='ประเภทวัสดุมาตร'
                  value={matmiter}
                  disabled
                />
              </CForm>
            </div>
          </div>

          {/* <div className='d-flex mt-2 ml-12'>
            <div className='d-flex w-2'></div>

            <div className='d-flex w-75 mb-5'>
              <CForm className='mx-5 w-33'>
                <label>วันที่ติดตั้ง</label>
                <Calendar
                  className='calendar'
                  // value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                />
              </CForm>
              <div className='mx-5 w-33'></div>
            </div>
          </div> */}

          {/* <button className="wblue-button-unrounded mt-5 mb-5 w-10 text-center" onClick={() => { nextPage(); debugBro(); }}>ถัดไป</button> */}
          <button
            className='wblue-button-unrounded mt-5 mb-5 w-10 text-center'
            onClick={handleinsertprapaowner}
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
        <div className='customcontainer1 d-flex flex-column'>
          <div className='d-flex mt-5'>
            <button className='minicontainer w-auto mx-5' onClick={alertBro}>
              <img
                className='mx-2'
                src={require('../../assets/images/FilePic.png')}
                width={80}
                height={80}
              />
              เอกสารคำขอมาตรวัดน้ำ
            </button>
            <button
              className='minicontainer w-auto me-auto mx-auto'
              onClick={alertBro}
            >
              <img
                className='mx-2'
                src={require('../../assets/images/FilePic.png')}
                width={80}
                height={80}
              />
              สำเนาบัตรประชาชน
            </button>
            <button
              className='minicontainer w-auto me-5 mx-5'
              onClick={alertBro}
            >
              <img
                className='mx-2'
                src={require('../../assets/images/FilePic.png')}
                width={80}
                height={80}
              />
              สำเนาทะเบียนบ้าน
            </button>
          </div>
          <div className='d-flex  mt-5 '>
            <button className='minicontainer w-auto mx-5' onClick={alertBro}>
              <img
                className='mx-2'
                src={require('../../assets/images/FilePic.png')}
                width={80}
                height={80}
              />
              เอกสารเกี่ยวกับที่ดิน
            </button>
            <div className='w-auto  me-auto mx-auto'></div>
            <div className='w-auto me-5 mx-5'></div>
          </div>
          <button
            className='wblue-button-unrounded mt-auto mb-5 w-15 text-center'
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
        <div className='customcontainer4 d-flex flex-column'>
          <div className='d-flex mx-5 mt-5'>
            <h5 className='me-5'>สรุปค่าใช้จ่าย</h5>
            <div className='d-flex flex-column mx-5'>
              <p className='me-1'>ค่าธรรมเนียม</p>

              <p className='me-1'>ค่าประกัน</p>

              <p className='me-1'>ค่าติดตั้ง</p>

              <b className='me-1'>รวมยอดที่ต้องชำระ</b>
            </div>

            <div className='d-flex flex-column mx-5'>
              <p className='textwithbg'>100</p>

              <p className='textwithbg'>100</p>

              <p className='textwithbg'>350</p>

              <b>550 บาท</b>
            </div>
          </div>

          <button
            className='wblue-button-unrounded mt-5 mb-5 '
            onClick={nextPage}
          >
            พิมพ์ใบชำระเงิน
          </button>
          <div className='mt-auto mb-5 d-flex flex-column'>
            <div className='d-flex mb-5'>
              <h5 className='mx-5 mb-5'>การรับชำระ</h5>
              <Dropdown placeholder='เงินสด' className='h-75 w-20 bg-light' />

              <button
                type='button'
                className='btn btn-success text-white h-75 mx-3'
              >
                บันทึก
              </button>
            </div>

            <button
              className='wblue-button-unrounded mb-5 text-center'
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
        <div className='d-flex flex-column'>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setRegisterpage(0)}
            />
            <h2 className='mx-3'>เพิ่มทะเบียนผู้ใช้น้ำ</h2>
          </div>
          <div className='formstep'>
            <Steps
              className='customsteps mt-2 mb-5'
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
    meternowner([data]);

    setaddress(data.baddress);
    setsoi(data.soi);
    setmoo(data.bmoo);
    setroad(data.road);
    setzipcode(data.zipcode);
    setstatusname(data.status_name);
    setprovince_id('71');
    settambon_id('710403');
    setamphoe_id('7104');

    setshowbrand(data.brand);
    setshowmodel(data.model);
    setsizemodel(data.international_size);
    settypemeter(data.metertypename);
    setmatmeter(data.metermaterial);

    setcprovice(data.cprovince_id);
    setcamphoe(data.camphoe_id);
    setcheckpopid('13');
  };

  //หน้าแก้ไขข้อมูลผู้ใช้น้ำ
  if (registerpage === 3) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setRegisterpage(0)}
            />
            <h2 className='mx-3'>แก้ไขทะเบียนผู้ใช้น้ำ</h2>
          </div>
          <div className='customcontainer3 mt-4'>
            {/* <div className="p-input-icon-left mt-5 mx-5">
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
            <h5 className="mt-4 mx-5">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</h5> */}
            <div className='d-flex flex-column'>
              <div className='d-flex mt-5'>
                <div className='d-flex '>
                  <div className='d-flex ml-5 mr-5'>
                    <img
                      src={require('../../assets/images/map_pin_bl.png')}
                      width={30}
                      height={30}
                    ></img>
                    <h5 className='mx-2'>รายละเอียดตำแหน่งมาตรน้ำ</h5>
                  </div>
                  <div className='d-flex w-100'>
                    <div className='d-flex w-100 justify-content-between'>
                      <CForm className='mx-5 '>
                        <CFormInput
                          className='mb-2 w-100'
                          label='บ้านเลขที่'
                          name='baddress'
                          value={formData.baddress}
                          onChange={handleInputChange}
                        />
                        {error6 && (
                          <ErrorContainer>
                            <img
                              src={ErrorIcon}
                              alt='Error Icon'
                              width='16'
                              height='16'
                              style={{ marginTop: -21 }}
                            />
                            <ErrorText>{error6}</ErrorText>
                          </ErrorContainer>
                        )}{' '}
                        <CFormInput
                          className='mt-2 mb-2'
                          label='ซอย'
                          name='bsoi'
                          value={formData.bsoi}
                          onChange={handleInputChange}
                        />
                        {error7 && (
                          <ErrorContainer>
                            <img
                              src={ErrorIcon}
                              alt='Error Icon'
                              width='16'
                              height='16'
                              style={{ marginTop: -21 }}
                            />
                            <ErrorText>{error7}</ErrorText>
                          </ErrorContainer>
                        )}{' '}
                        <CFormSelect
                          className='mt-2 mb-2'
                          label='ตำบล / แขวง'
                          name='tambon_id'
                          value={tambon_id}
                          disabled
                        >
                          <option value='710403'>หนองเป็ด</option>
                        </CFormSelect>
                      </CForm>
                      <CForm className='mx-5'>
                        <CFormInput
                          className='mb-2'
                          label='หมู่'
                          name='bmoo'
                          value={formData.bmoo}
                          onChange={handleInputChange}
                        />
                        {error4 && (
                          <ErrorContainer>
                            <img
                              src={ErrorIcon}
                              alt='Error Icon'
                              width='16'
                              height='16'
                              style={{ marginTop: -21 }}
                            />
                            <ErrorText>{error4}</ErrorText>
                          </ErrorContainer>
                        )}{' '}
                        <CFormSelect
                          className='mt-2 mb-2'
                          label='จังหวัด'
                          name='province_id'
                          value={province_id}
                          disabled
                        >
                          <option value='71'>กาญจนบุรี</option>
                        </CFormSelect>
                        <CFormInput
                          className='mt-2 mb-2'
                          label='รหัสไปรษณีย์'
                          name='zipcode'
                          value={zipcode}
                          disabled
                        />
                      </CForm>
                      <CForm className='mx-5 '>
                        <CFormInput
                          className='mb-2'
                          label='ถนน'
                          name='broad'
                          value={formData.broad}
                          onChange={handleInputChange}
                        />

                        <CFormSelect
                          className='mt-2 mb-2'
                          label='อำเภอ / เขต'
                          name='amphoe_id'
                          value={amphoe_id}
                          disabled
                        >
                          <option value='7104'>ศรีสวัสดิ์</option>{' '}
                        </CFormSelect>
                      </CForm>
                    </div>
                  </div>
                </div>
              </div>

              <div className='d-flex mx-5 mt-5 '>
                <h5 className='w-25'>สถานะผู้ใช้น้ำ</h5>
                <div className='d-flex w-5'></div>

                <CFormSelect
                  className='mt-2 mb-2 w-25'
                  // label='วัสดุมาตรวัดน้ำ'
                  name='paraowner_status_id'
                  value={formData.paraowner_status_id}
                  onChange={handleInputChange}
                >
                  <option value={''}>เลือกสถานะผู้ใช้น้ำ</option>
                  <option value='1'>ปกติ</option>
                  <option value='2'>ระงับการใช้น้ำ</option>
                </CFormSelect>
              </div>
              <div className='d-flex mx-5 mt-5  '>
                <h5 className='w-25'>ข้อมูลผู้ใช้น้ำ</h5>
                <div className='d-flex w-5'></div>

                <div className='customcontainer3 h-20 w-80 d-flex'>
                  <div className='w-15'>
                    <img
                      src={require('../../assets/images/alt_avatar.png')}
                    ></img>
                  </div>
                  <div className='d-flex flex-column px-5 w-75'>
                    {formData.prefix} {formData.fname} {formData.lname}
                  </div>

                  <div className='d-flex w-15 ml-auto'>
                    <button className='buttonpic me-3'>
                      <img
                        src={require('../../assets/images/edit.png')}
                        width={50}
                        height={50}
                        onClick={handlePersonalEdit}
                      />
                    </button>
                    {/* <button className="buttonpic"><img src={require("../../assets/images/remove.png")} width={50} height={50} onClick={alertBro} /></button> */}
                  </div>
                </div>
              </div>
              <div className='d-flex mx-5 mt-5 '>
                <h5 className='w-25'>ข้อมูลเพื่อส่งเสริม</h5>
                <div className='d-flex w-5'></div>

                <CFormSelect
                  placeholder='ช่องข้อมูลเพื่อส่งเสริมหรืออุดหนุน'
                  className='mt-2 mb-2 w-25'
                  name='promotion_id'
                  value={formData.promotion_id}
                  onChange={handleInputChange}
                >
                  <option value={''}>เลือกข้อมูลการส่งเสริม</option>
                  {datapromotionfee.map((item, index) => (
                    <option key={index} value={item.promotion_id}>
                      {item.promotion_name}
                    </option>
                  ))}
                </CFormSelect>
              </div>
              <div className='d-flex mx-5 mt-5 '>
                <h5 className='w-25'>ข้อมูลมาตรวัดน้ำ</h5>
                <div className='d-flex w-75 justify-content-between'>
                  <CForm className='mx-5 w-80 mb-10' style={{ paddingTop: 7 }}>
                    {/* <CFormInput
                      className='mt-2 mb-2'
                      label='เลขที่ประจำมาตรวัดน้ำ'
                      name='meternumber'
                      value={formData.meternumber}
                      onChange={handleInputChange}
                    /> */}
                    <CFormSelect
                      className='setform'
                      aria-label='Small select example'
                      label='เลขที่ประจำมาตรวัดน้ำ'
                      name='meterasset_id'
                      value={formData.meterasset_id}
                      onChange={handleInputChange}
                      style={{ marginBottom: 5 }}
                    >
                      {/* <option value={formData.meterasset_id}>
                        {formData.meternumber}
                      </option> */}
                      {dataxnull.map((item, index) => (
                        <option key={index} value={item.meterasset_id}>
                          {item.meternumber}
                        </option>
                      ))}
                    </CFormSelect>

                    <CFormInput
                      className='mt-2 mb-2'
                      label='ประเภทมาตร'
                      value={typemeter}
                      disabled
                    />
                  </CForm>
                  <CForm className='mx-5 w-50'>
                    <CFormInput
                      className='mt-2 mb-2'
                      label='Brand'
                      value={showbrand}
                      disabled
                    />
                    <CFormInput
                      className='mt-2 mb-2'
                      label='ขนาดมาตร'
                      value={sizemodel}
                      disabled
                    />
                  </CForm>
                  <CForm className='mx-5 w-50'>
                    <CFormInput
                      className='mt-2 mb-2'
                      label='Model'
                      value={showmodel}
                      disabled
                    />

                    <CFormInput
                      className='mt-2 mb-2 '
                      label='ประเภทวัสดุ'
                      value={matmiter}
                      disabled
                    />
                  </CForm>
                </div>
              </div>

              <button
                className='wblue-button-unrounded mt-5 mb-5 w-20 text-center'
                onClick={() => {
                  // setRegisterpage(0);
                  handleEditData();
                  // onSubmit;
                }}
              >
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

  // แก้ไขข้อมูลผู้ใช้น้ำ
  dialog_editpersonal = (
    <>
      <h5 className='text-center mt-5'>แก้ไขข้อมูลส่วนตัวของผู้ใช้น้ำ</h5>
      <div className='d-flex mt-5'>
        <CForm className='mx-5 w-33'>
          <CFormSelect
            aria-label='Default select example'
            className='select'
            label='คำนำหน้าชื่อ'
            name='prefix'
            value={formData.prefix}
            onChange={handleInputChange}
          >
            <option value={''}>เลือกคำนำหน้า</option>
            <option value={'นาย'}>นาย</option>
            <option value={'นาง'}>นาง</option>
            <option value={'นางสาว'}>นางสาว</option>
          </CFormSelect>
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='ชื่อจริง'
            name='fname'
            value={formData.fname}
            onChange={handleInputChange}
          />
          {error && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='นามสกุล'
            name='lname'
            value={formData.lname}
            onChange={handleInputChange}
          />
          {error2 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error2}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
      </div>
      <div className='d-flex mt-3'>
        {/* <CForm className='mx-5 w-33'></CForm> */}
        <CForm className='mx-5 w-25'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='เลขที่บัตรประจำตัวประชาชน'
            name='pop_id'
            value={formData.pop_id}
            onChange={handleInputChange}
          /> */}
          <label>เลขที่บัตรประจำตัวประชาชน</label>
          <NumberFormat
            name='pop_id'
            style={{ marginTop: 8 }}
            value={formData.pop_id}
            onChange={(e) => handlecheck(e)}
            className='form-control'
            onKeyDown={checkminus}
            tabIndex='0'
            maxLength={13}
          />
        </CForm>
        <CForm className='mx-5 w-33'></CForm>
      </div>
      <div className='d-flex mt-3'>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='บ้านเลขที่'
            name='caddress'
            value={formData.caddress}
            onChange={handleInputChange}
          />
          {error3 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error3}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='หมู่'
            name='cmoo'
            value={formData.cmoo}
            onChange={handleInputChange}
          />
          {error4 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error4}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='ซอย'
            name='soi'
            value={formData.soi}
            onChange={handleInputChange}
          />
          {error5 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error5}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
      </div>
      <div className='d-flex mt-3 mb-3'>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='ถนน'
            name='road'
            value={formData.road}
            onChange={handleInputChange}
          />
        </CForm>
        <CForm className='mx-5 w-33'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='ตำบล/แขวง'
            name='ctambon_name'
            value={formData.ctambon_name}
            onChange={handleInputChange}
          /> */}
          <CFormSelect
            label='จังหวัด'
            aria-label='Default select example'
            className='select'
            value={formData.cprovince_id}
            onChange={handleInputChange}
            name='cprovince_id'
          >
            <option value={''}>เลือกจังหวัด</option>
            {dataprovince.map((item, index) => (
              <option key={index} value={item.province_id}>
                {item.province_name}
              </option>
            ))}
          </CFormSelect>
        </CForm>
        <CForm className='mx-5 w-33'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='อำเภอ/เขต'
            name='camphoe_name'
            value={formData.camphoe_name}
            onChange={handleInputChange}
          /> */}
          <CFormSelect
            label='อำเภอ/เขต'
            aria-label='Default select example'
            className='select'
            value={formData.camphoe_id}
            onChange={handleInputChange}
            name='camphoe_id'
          >
            <option value={''}>เลือกอำเภอ</option>
            {dataamphoe.map((item, index) => (
              <option key={index} value={item.amphoe_id}>
                {item.amphoe_name}
              </option>
            ))}
          </CFormSelect>
        </CForm>
      </div>
      <div className='d-flex mt-3 mb-3'>
        <CForm className='mx-5 w-33'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='จังหวัด'
            name='cprovince_name'
            value={formData.cprovince_name}
            onChange={handleInputChange}
          /> */}
          <CFormSelect
            label='ตำบล/แขวง'
            aria-label='Default select example'
            className='select'
            onChange={handleInputChange}
            value={formData.ctambon_id}
            name='ctambon_id'
          >
            <option value={''}>เลือกตำบล</option>
            {datatambon.map((item, index) => (
              <option key={index} value={item.tambon_id}>
                {item.tambon_name}
              </option>
            ))}
          </CFormSelect>
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='รหัสไปรษณีย์'
            name='zipcode'
            value={formData.zipcode}
            onChange={handleInputChange}
            disabled
          />
        </CForm>
        <CForm className='mx-5 w-33'></CForm>
      </div>

      <button
        className='wblue-button-unrounded mt-5 mb-3 w-10 text-center'
        onClick={handlePersonalEditExit}
      >
        บันทึก
      </button>
    </>
  );

  //หน้าเพิ่มข้อมูลผู้ใช้น้ำ
  dialog_newpersonal = (
    <>
      <h5 className='text-center mt-5'>เพิ่มข้อมูลส่วนตัวของผู้ใช้น้ำ</h5>
      <div className='d-flex mt-5'>
        <CForm className='mx-5 w-15'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='คำนำหน้าชื่อ'
            name='prefix'
            value={prefix}
            // onChange={handleNewInputChange}
            onChange={(e) => setprefix(e.target.value)}
          /> */}
          <CFormSelect
            label='คำนำหน้าชื่อ'
            aria-label='Default select example'
            className='select'
            onChange={(e) => setprefix(e.target.value)}
            value={prefix}
            name='prefix'
          >
            <option value={''}>เลือกคำนำหน้า</option>
            <option value={'นาย'}>นาย</option>
            <option value={'นาง'}>นาง</option>
            <option value={'นางสาว'}>นางสาว</option>
          </CFormSelect>
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='ชื่อจริง'
            name='fname'
            value={fname}
            // onChange={handleNewInputChange}
            // onChange={(e) => setfname(e.target.value)}
            onChange={handleInputChange2}
          />
          {error && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='นามสกุล'
            name='lname'
            value={lname}
            // onChange={handleNewInputChange}
            // onChange={(e) => setlname(e.target.value)}
            onChange={handleInputChange2}
          />
          {error2 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error2}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
      </div>
      <div className='d-flex mt-3'>
        <CForm className='mx-5 w-33'>
          <label>เลขที่บัตรประจำตัวประชาชน</label>
          <NumberFormat
            style={{ marginTop: 8 }}
            value={pop_id}
            onChange={(e) => handlecheck(e)}
            className='form-control'
            onKeyDown={checkminus}
            tabIndex='0'
            maxLength={13}
          />
        </CForm>
      </div>
      <div className='d-flex mt-3'>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='บ้านเลขที่'
            name='caddress'
            value={caddress}
            onChange={handleInputChange2}
          />
          {error3 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error3}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='หมู่'
            name='cmoo'
            value={cmoo}
            onChange={handleInputChange2}
          />
          {error4 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error4}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='ซอย'
            name='csoi'
            value={csoi}
            onChange={handleInputChange2}
          />
          {error5 && (
            <ErrorContainer>
              <img
                src={ErrorIcon}
                alt='Error Icon'
                width='16'
                height='16'
                style={{ marginTop: -21 }}
              />
              <ErrorText>{error5}</ErrorText>
            </ErrorContainer>
          )}{' '}
        </CForm>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='ถนน'
            name='croad'
            value={croad}
            onChange={(e) => setcroad(e.target.value)}
          />
        </CForm>
      </div>
      <div className='d-flex mt-3 mb-3'>
        <CForm className='mx-5 w-33'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='จังหวัด'
            name='cprovince_name'
            value={addNewData.cprovince_name}
            onChange={handleNewInputChange}
          /> */}
          <CFormSelect
            label='จังหวัด'
            aria-label='Default select example'
            className='select'
            onChange={(e) => setcprovice(e.target.value)}
            value={cprovince}
            name='cprovince_name'
          >
            <option value={''}>เลือกจังหวัด</option>
            {dataprovince.map((item, index) => (
              <option key={index} value={item.province_id}>
                {item.province_name}
              </option>
            ))}
          </CFormSelect>
        </CForm>

        <CForm className='mx-5 w-33'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='อำเภอ/เขต'
            name='camphoe_name'
            value={addNewData.camphoe_name}
            onChange={handleNewInputChange}
          /> */}
          <CFormSelect
            label='อำเภอ/เขต'
            aria-label='Default select example'
            className='select'
            onChange={(e) => setcamphoe(e.target.value)}
            value={camphoe}
            name='camphoe_name'
          >
            <option value={''}>เลือกอำเภอ</option>
            {dataamphoe.map((item, index) => (
              <option key={index} value={item.amphoe_id}>
                {item.amphoe_name}
              </option>
            ))}
          </CFormSelect>
        </CForm>

        <CForm className='mx-5 w-33'>
          {/* <CFormInput
            className='mt-2 mb-2'
            label='ตำบล/แขวง'
            name='ctambon_name'
            value={addNewData.ctambon_name}
            onChange={handleNewInputChange}
          /> */}
          <CFormSelect
            label='ตำบล/แขวง'
            aria-label='Default select example'
            className='select'
            onChange={handletambon}
            value={ctambon}
            name='ctambon_name'
          >
            <option value={''}>เลือกตำบล</option>
            {datatambon.map((item, index) => (
              <option key={index} value={item.tambon_id}>
                {item.tambon_name}
              </option>
            ))}
          </CFormSelect>
        </CForm>
      </div>
      <div className='d-flex mt-3 mb-3'>
        <CForm className='mx-5 w-33'>
          <CFormInput
            className='mt-2 mb-2'
            label='รหัสไปรษณีย์'
            name='zipcode'
            value={datazipcode}
            disabled
            // onChange={handleNewInputChange}
          />
        </CForm>
      </div>

      <button
        className='wblue-button-unrounded mt-5 mb-3 w-10 text-center'
        onClick={handlePersonalNewExit}
      >
        บันทึก
      </button>
    </>
  );

  //ใบชำระเงิน
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
      <div className='d-flex flex-column'>
        <h5 className='text-left mt-3'>สรุปยอดค้างชำระ</h5>
        <div className='mt-4'>ชื่อ-นามสกุล:</div>
        เลขที่ประจำมาตรวัดน้ำ:
        <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์:
        <div className='customcontainer2'>
          <div className='d-flex'>
            <img
              className='mt-4'
              src={require('../../assets/images/suspendicon.png')}
              width={45}
              height={45}
            />
            <div className='d-flex flex-column mx-3'>
              <div className='text-danger'>สถานะ:</div>
              ยอดค้างชำระ:
              <br></br>ค่าปรับ:
              <br></br>รวมยอดที่ต้องชำระ:
            </div>
          </div>
        </div>
      </div>
      <div className='text-center mb-3'>
        <button className='wblue-button-unrounded mt-4 w-100'>
          พิมพ์ใบชำระเงิน
        </button>
      </div>
      <b>การรับชำระ</b>
      <div className='container mt-2 mb-2 '>
        <div className='row'>
          <div className='col'>
            <Dropdown
              placeholder='เงินสด'
              className='pb-1 h-75 w-100 bg-light'
            />
          </div>
          <div className='col-md-auto'>
            <button type='button' className='btn btn-success text-white'>
              บันทึก
            </button>
          </div>
        </div>
      </div>
      <div className='mt-auto text-center'>
        <button className='wblue-button-unrounded mt-2 w-100'>
          พิมพ์ใบเสร็จ
        </button>
      </div>
    </>
  );

  //บันทึกการระงับน้ำ
  dialogcontent2 = (
    <>
      <div className='d-flex align-items-center justify-content-center'>
        <img
          className='mt-4'
          src={require('../../assets/images/suspendicon.png')}
          width={60}
          height={60}
        />
      </div>
      <div className='d-flex flex-column mb-3'>
        <h5 className='text-left mt-3'>บันทึกการระงับน้ำชั่วคราว</h5>
        <div className='mt-4'>ชื่อ-นามสกุล:</div>
        เลขที่ประจำมาตรวัดน้ำ:
        <br></br>ที่ติดตั้งมาตร:
        <br></br>โทรศัพท์:
        <div className='customcontainer2'>
          <div className='d-flex'>
            <img
              className='mt-4'
              src={require('../../assets/images/suspendicon.png')}
              width={45}
              height={45}
            />
            <div className='d-flex flex-column mx-3'>
              <div className='text-danger'>สถานะ:</div>
              ยอดค้างชำระ:
              <br></br>ค่าปรับ:
              <br></br>รวมยอดที่ต้องชำระ:
            </div>
          </div>
        </div>
      </div>

      <div className='mt-auto text-center'>
        <button className='wred-button ' onClick={handleSuspendModalExit}>
          ยกเลิก
        </button>
        <button className='wred-button '>ระงับการใช้น้ำ</button>
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
        style={{ width: '22rem', height: 'auto' }}
        showHeader={false}
      >
        {dialogcontent2}
      </Dialog>

      <Dialog
        visible={paymentvisible}
        onHide={() => setPaymentvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: '25rem', height: 'auto' }}
        showHeader={false}
      >
        {dialogcontent1}
      </Dialog>

      <Dialog
        visible={newpersonalvisible}
        onHide={() => setNewpersonalvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: '75rem', height: 'auto' }}
        showHeader={false}
      >
        {dialog_newpersonal}
      </Dialog>

      <Dialog
        visible={editpersonalvisible}
        onHide={() => setEditpersonalvisible(false)}
        draggable={false}
        dismissableMask
        style={{ width: '75rem', height: 'auto' }}
        showHeader={false}
      >
        {dialog_editpersonal}
      </Dialog>
    </>
  );
};

export default WaterRegister;
