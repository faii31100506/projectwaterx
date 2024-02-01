import React from 'react';
import './waterx.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import CIcon from '@coreui/icons-react';
import { cilSearch } from '@coreui/icons';
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
  CAlert,
  CDropdown,
  CDropdownItem,
  CDropdownToggle,
  CDropdownMenu,
} from '@coreui/react';
import { SlideMenu } from 'primereact/slidemenu';
import Swal from 'sweetalert2';
// import { DatePickerValue } from './Datepicker';
import styled from 'styled-components';
import ErrorIcon from '../../assets/images/warning.png';
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
`;

const ErrorText = styled.p`
  color: red;
  font-style: italic;
  margin-left: 5px;
  font-size: 14px;
`;
const WaterMeterData = () => {
  const [meterpage, setMeterpage] = useState(0);
  const [datax, setDatax] = useState([]);
  const [dataxuse, setDataxuse] = useState([]);
  const [dataxnull, setDataxnull] = useState([]);
  const [datametersize, setmetersize] = useState([]);
  const [datametertype, setmetertype] = useState([]);
  const [datametermat, setmetermat] = useState([]);
  const [datalistmeter, setlistmeter] = useState([]);
  const [editData, setEditData] = useState([]);
  const NHARA_API = process.env.REACT_APP_NHARA_API;

  const [metersize_id, setmetersize_id] = useState('');
  const [metermaterial_id, setmetermaterial_id] = useState('');
  const [metertype_id, setmetertype_id] = useState('');
  const [brand, setbrand] = useState('');
  const [model, setmodel] = useState('');

  const [showbrand, setshowbrand] = useState('');
  const [showmodel, setshowmodel] = useState('');
  const [sizemodel, setsizemodel] = useState('');
  const [typemeter, settypemeter] = useState('');
  const [matmiter, setmatmeter] = useState('');

  const [metermaster_id, setmetermaster_id] = useState('');
  const [meter_status, setmeter_status] = useState('');
  const [meternumber, setmeternumber] = useState('');
  const [meterasset_id, setmeterasset_id] = useState('');
  const [checkmeternumber, setcheckmeternumber] = useState('');
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const [error, setError] = useState('');
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    const namee = name;
    const inputValue = e.target.value;
    // ตรวจสอบรูปแบบของข้อมูล
    if (namee == 'meternumber') {
      if (inputValue === '' || /^[0-9-]*$/.test(inputValue)) {
        setmeternumber(inputValue);
        setError('');
      } else {
        setError('กรอกแค่0-9และ "-" เท่านั้น');
      }
    }
  };

  // ดึงข้อมูลมิเตอร์ทั้งหมด
  useEffect(() => {
    axios
      .get(NHARA_API)
      .then((res) => setDatax(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ดึงข้อมูลมิเตอร์ที่ใช้แล้ว
  useEffect(() => {
    axios
      .get('http://localhost:4034/api/nahra/listmeteruse')
      .then((res) => setDataxuse(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ดึงข้อมูลมิเตอร์ที่ยังไม่ได้ใช้
  useEffect(() => {
    axios
      .get('http://localhost:4034/api/nahra/nullmeter')
      .then((res) => setDataxnull(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ดึงข้อมูลประเภทมาตรน้ำ
  useEffect(() => {
    axios
      .get('http://localhost:4034/api/nahra/metertype')
      .then((res) => setmetertype(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ดึงข้อมูลขนาดมาตรน้ำ
  useEffect(() => {
    axios
      .get('http://localhost:4034/api/nahra/metersize')
      .then((res) => setmetersize(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ดึงข้อมูลวัสดุมาตรน้ำ
  useEffect(() => {
    axios
      .get('http://localhost:4034/api/nahra/metermaterial')
      .then((res) => setmetermat(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // ดึงข้อมูลลักษณะมาตรน้ำ
  useEffect(() => {
    axios
      .get('http://localhost:4034/api/nahra/listmeter')
      .then((res) => {
        setlistmeter(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // บันทึกแก้ไขลักษณะมาตรน้ำ
  const handleput = (event) => {
    event.preventDefault();
    var data = {
      metermaterial_id: addNewData.metermaterial_id,
      metersize_id: addNewData.metersize_id,
      metertype_id: addNewData.metertype_id,
      brand: addNewData.brand,
      model: addNewData.model,
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
        let resultsL = await axios
          .put(
            'http://localhost:4034/api/nahra/meter/' +
              addNewData.metermaster_id,
            data
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

  // บันทึกแก้ไขครุภัณฑ์ที่ยังไม่ได้ใช้งาน
  const handleputmeterasset = (event) => {
    if (meternumber !== '') {
      var Activity = dataxnull.filter((res) => res.meternumber == meternumber);

      if (meternumber == checkmeternumber) {
        // ผ่าน
      }

      if (meternumber !== checkmeternumber && Activity.length !== 0) {
        Swal.fire({
          text: 'เลขมาตรวัดน้ำซ้ำ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      } else {
        //ผ่าน
      }

      console.log('checkmeternumber', checkmeternumber);
      console.log('meternumber', meternumber);
      console.log('Activity', Activity);
    } else {
      Swal.fire({
        text: 'โปรดกรอกเลขมาตรน้ำ',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง.',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    event.preventDefault();
    var data = {
      meternumber: meternumber,
      meter_status: meter_status,
      metermaster_id: metermaster_id,
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
        let resultsL = await axios
          .put(
            'http://localhost:4034/api/nahra/meterasset/' + meterasset_id,
            data
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

  // ลบลักษณะมาตรน้ำ
  const handleDel = (metermaster_id) => {
    var data = {
      metermaster_id: metermaster_id,
    };
    Swal.fire({
      text: 'คุณต้องการลบข้อมูลหรือไม่ ?',
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
          .delete(
            'http://localhost:4034/api/nahra/meter/' + data.metermaster_id,
            {}
          )
          .then(
            (res) => {
              if (res.status === 200) {
                // alert("succesfull");
              }
              console.log(res);
              Swal.fire({
                text: 'ลบสำเร็จ.',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'ตกลง.',
                customClass: {
                  confirmButton: 'btn fw-bold btn-primary',
                },
                preConfirm: () => {
                  return window.location.reload();
                },
              });
              // await RefreshData();
            },
            async (error) => {
              Swal.fire({
                text: 'ลบข้อมูลไม่สำเร็จ.',
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

  // ปุ่มแก้ไขข้อมูลมาตรน้ำที่ยังไม่ถูกใช้งาน (
  const EditIcon = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/edit.png')}
          width={30}
          height={30}
          onClick={() => {
            setMeterpage(8);
            handleEditnull(data);
          }}
        />
      </button>
    );
  };

  //ปุ่มแก้ไขข้อมูลมาตรน้ำที่ถูกใช้แล้ว
  const EditIcon2 = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/edit.png')}
          width={30}
          height={30}
          onClick={() => {
            setMeterpage(9);
            handleEditnull(data);
          }}
        />
      </button>
    );
  };

  const EditIconfirst = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/edit.png')}
          width={30}
          height={30}
          onClick={() => {
            setMeterpage(8);
            handleEditnull(data);
          }}
        />
      </button>
    );
  };

  //ปุ่มแก้ไขข้อมูลลักษณะมาตรน้ำ
  const EditMSIcon = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/edit.png')}
          width={30}
          height={30}
          onClick={() => {
            setMeterpage(5);
            handleEditMS(data);
          }}
        />
      </button>
    );
  };

  // ปุ่มลบ
  const RemoveIcon = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/remove.png')}
          width={30}
          height={30}
          onClick={() => {
            handleDel(data);
          }}
        />
      </button>
    );
  };

  // แก้ไข
  const [addNewData, setAddNewData] = useState({
    meterasset_id: '',
    metermaster_id: '',
    meternumber: '',
    metertypename: '',
    international_size: '',
    metersize_id: '',
    metermaterial: '',
    meter_status: '',
    brand: '',
    model: '',
    metermaterial_id: '',
    metertype_id: '',
  });

  // แก้ไข
  useEffect(() => {
    setAddNewData({
      meterasset_id: editData.meterasset_id || '',
      meternumber: editData.meternumber || '',
      metertypename: editData.metertypename || '',
      international_size: editData.international_size || '',
      metermaterial: editData.metermaterial || '',
      meter_status: editData.meter_status || '',
      metermaster_id: editData.metermaster_id || '',
      brand: editData.brand || '',
      model: editData.model || '',
      metersize_id: editData.metersize_id || '',
      metermaterial_id: editData.metermaterial_id || '',
      metertype_id: editData.metertype_id || '',
    });
  }, [editData]);

  // แก้ไข
  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    // Update the form data as the user types
    setAddNewData({
      ...addNewData,
      [name]: value,
    });
    console.log(addNewData);
  };

  //บันทึกข้อมูลลักษณะมาตรวัดน้ำ
  const handlepost = (event) => {
    if (brand == '' || brand == null) {
      return Swal.fire({
        text: 'โปรดกรอก Brand',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (model == '' || model == null) {
      return Swal.fire({
        text: 'โปรดกรอก Model',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (metertype_id == '' || metertype_id == null) {
      return Swal.fire({
        text: 'โปรดเลือกประเภทมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (metersize_id == '' || metersize_id == null) {
      return Swal.fire({
        text: 'โปรดเลือกขนาดมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (metermaterial_id == '' || metermaterial_id == null) {
      return Swal.fire({
        text: 'โปรดเลือกประเภทวัสดุมาตรน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    var data = {
      metersize_id: metersize_id,
      metermaterial_id: metermaterial_id,
      metertype_id: metertype_id,
      brand: brand,
      model: model,
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
        let resultsL = await axios
          .post('http://localhost:4034/api/nahra/modelmeter', data)
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

  //บันทึกข้อมูลครุภัณฑ์มาตรน้ำ
  const handlepostasset = (event) => {
    if (meternumber !== '') {
      var Activity = dataxnull.filter((res) => res.meternumber == meternumber);

      if (meternumber == checkmeternumber) {
        // ผ่าน
      }

      if (meternumber !== checkmeternumber && Activity.length !== 0) {
        Swal.fire({
          text: 'เลขมาตรวัดน้ำซ้ำ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      } else {
        //ผ่าน
      }
      console.log('checkmeternumber', checkmeternumber);
      console.log('meternumber', meternumber);
      console.log('Activity', Activity);
    } else {
      Swal.fire({
        text: 'โปรดกรอกเลขมาตรน้ำ',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง.',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (meter_status == '' || meter_status == null) {
      return Swal.fire({
        text: 'โปรดเลือกสถานะมาตรวัดน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (metermaster_id == '' || metermaster_id == null) {
      return Swal.fire({
        text: 'โปรดเลือกรหัสลักษณะมาตรวัดน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (metermaster_id == '' || metermaster_id == null) {
      return Swal.fire({
        text: 'โปรดเลือกรหัสลักษณะมาตรวัดน้ำ',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    var data = {
      metermaster_id: metermaster_id,
      meter_status: meter_status,
      meternumber: meternumber,
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
        let resultsL = await axios
          .post('http://localhost:4034/api/nahra/modelmeterasset', data)
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

    // fetch('http://localhost:4034/api/nahra/modelmeterasset', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/form-data',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // }).then((res) => {
    //   console.log(res);
    //   if (res.status == 200) {
    //     // alert("succesfull");
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'succesfull',
    //       preConfirm: () => {
    //         return window.location.reload();
    //       },
    //     });
    //   }
    // });
  };

  const handleSelect = (e) => {
    var value = e.target.value;
    var Activity = datalistmeter.filter((res) => res.metermaster_id == value);
    if (Activity.length !== 0) {
      setshowbrand(Activity[0].brand);
      setshowmodel(Activity[0].model);
      setsizemodel(Activity[0].international_size);
      settypemeter(Activity[0].metertypename);
      setmatmeter(Activity[0].metermaterial);
    }
    setmetermaster_id(e.target.value);
  };

  const handleSelect2 = (value) => {
    setmetermaster_id(value);
    var Activity = datalistmeter.filter((res) => res.metermaster_id == value);
    if (Activity.length !== 0) {
      setshowbrand(Activity[0].brand);
      setshowmodel(Activity[0].model);
      setsizemodel(Activity[0].international_size);
      settypemeter(Activity[0].metertypename);
      setmatmeter(Activity[0].metermaterial);
    }
  };

  // หน้าแสดงข้อมูลหลัก
  let content;
  if (meterpage === 0) {
    content = (
      <>
        <h2 className='mt-4 ms-4'>ข้อมูลมิเตอร์</h2>
        <div className='d-flex justify-content-between mt-4 ms-4'>
          <div className='p-input-icon-left'>
            <CIcon icon={cilSearch}></CIcon>
            <InputText
              className='custom-input-search'
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

          {/* <button className="wblue-button me-5" onClick={() => setMeterpage(1)}>
            เพิ่มข้อมูลมาตรวัดน้ำ
          </button>
          <button className="wblue-button me-5" onClick={() => setMeterpage(6)}>
            เพิ่มครุภัณฑ์มาตรวัดน้ำ
          </button> */}
        </div>
        <div className='d-flex justify-content-left mt-2 ms-4'>
          <button
            className='wblue-button'
            onClick={() => {
              setMeterpage(2);
            }}
          >
            รายการครุภัณฑ์ทั้งหมด
          </button>
          <button
            className='wblue-button'
            onClick={() => {
              setMeterpage(3);
            }}
          >
            รายการครุภัณฑ์ที่ถูกใช้แล้ว
          </button>
          <button
            className='wblue-button'
            onClick={() => {
              setMeterpage(4);
            }}
          >
            รายการครุภัณฑ์ที่ยังไม่ถูกใช้
          </button>
          <button
            className='wblue-button'
            onClick={() => {
              setMeterpage(7);
            }}
          >
            รายการลักษณะมาตรน้ำ
          </button>
        </div>

        <DataTable
          value={datax}
          header='รายชื่อ'
          filters={filters}
          paginator
          rows={8}
          paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
          currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
        >
          <Column
            header='เลขที่ประจำมาตรวัดน้ำ'
            // body={(rowData) => <span>{rowData.meternumber}</span>}
            field='meternumber'
          ></Column>
          <Column
            header='ประเภทมิเตอร์'
            // body={(rowData) => <span>{rowData.metertypename}</span>}
            field='metertypename'
          ></Column>
          <Column
            header='ขนาดมิเตอร์'
            // body={(rowData) => <span>{rowData.international_size}</span>}
            field='international_size'
          ></Column>
          <Column
            header='วัสดุมิเตอร์'
            // body={(rowData) => <span>{rowData.metermaterial}</span>}
            field='metermaterial'
          ></Column>
          <Column
            header='สถานะ'
            // body={(rowData) => <span>{rowData.meter_status}</span>}
            field='meter_status'
          ></Column>
          <Column
            header='เจ้าของมาตรวัดน้ำ'
            // body={(rowData) => (
            //   <span>
            //     {rowData.prefix} {rowData.fname} {rowData.lname}
            //   </span>
            // )}
            field='fullname'
          />
          <Column body={(rowData) => EditIconfirst(rowData)}></Column>
        </DataTable>
      </>
    );
  }

  // หน้าเพิ่มข้อมูลลักษณะมาตรน้ำ
  if (meterpage === 1) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setMeterpage(4)}
            />
            <h2 className='ms-2'>เพิ่มข้อมูลมิเตอร์</h2>
          </div>

          <div className='customcontainer2 d-flex flex-column'>
            <div className='d-flex mt-4'>
              <CForm className='row g-3'>
                {/* brand */}
                <CForm className='w-40'>
                  <CFormInput
                    label='Brand'
                    name='brand'
                    value={brand}
                    onChange={(e) => setbrand(e.target.value)}
                    // onChange={handleInputChange2}
                  />
                </CForm>
                {/* model */}
                <CForm className='w-40'>
                  <CFormInput
                    label='Model'
                    onChange={(e) => setmodel(e.target.value)}
                  />
                </CForm>

                {/* ประเภทมาตรน้ำ */}
                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='ประเภทมาตรน้ำ'
                    onChange={(e) => setmetertype_id(e.target.value)}
                  >
                    <option value={''}>เลือกประเภทมาตรน้ำ</option>
                    {datametertype.map((item, index) => (
                      <option key={index} value={item.metertype_id}>
                        {item.metertypename}
                      </option>
                    ))}
                  </CFormSelect>
                </CForm>

                {/*ขนาดมาตรน้ำ  */}
                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='ขนาดมาตรน้ำ'
                    onChange={(e) => setmetersize_id(e.target.value)}
                  >
                    <option value={''}>เลือกขนาดมาตรน้ำ</option>
                    {datametersize.map((item, index) => (
                      <option key={index} value={item.metersize_id}>
                        {item.international_size}
                      </option>
                    ))}
                  </CFormSelect>
                </CForm>

                {/* ประเภทวัสดุ */}
                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='ประเภทวัสดุ'
                    onChange={(e) => setmetermaterial_id(e.target.value)}
                  >
                    <option value={''}>เลือกประเภทวัสดุ</option>
                    {datametermat.map((item, index) => (
                      <option key={index} value={item.metermaterial_id}>
                        {item.metermaterial}
                      </option>
                    ))}
                  </CFormSelect>
                </CForm>
              </CForm>
            </div>
            <CCol className='align-items-center'>
              <button
                type='button'
                class='btn btn-primary '
                onClick={handlepost}
                style={{ float: 'right', marginLeft: -61 }}
              >
                บันทึก
              </button>
            </CCol>
          </div>
        </div>
      </>
    );
  }

  // หน้ารายการมิเตอร์ทั้งหมด
  if (meterpage === 2) {
    content = (
      <>
        <h2 className='mt-4 ms-4'>รายการมิเตอร์ทั้งหมด</h2>
        <div className='d-flex justify-content-left mt-2 ms-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setMeterpage(0)}
          />
        </div>
        <DataTable
          value={datax}
          header='รายชื่อ'
          filters={filters}
          paginator
          rows={8}
          paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
          currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
        >
          <Column
            header='เลขที่ประจำมาตรวัดน้ำ'
            body={(rowData) => <span>{rowData.meternumber}</span>}
          ></Column>
          <Column
            header='ประเภทมิเตอร์'
            body={(rowData) => <span>{rowData.metertypename}</span>}
          ></Column>
          <Column
            header='ขนาดมิเตอร์'
            body={(rowData) => <span>{rowData.international_size}</span>}
          ></Column>
          <Column
            header='วัสดุมิเตอร์'
            body={(rowData) => <span>{rowData.metermaterial}</span>}
          ></Column>

          <Column
            header='เจ้าของมาตรวัดน้ำ'
            body={(rowData) => (
              <span>
                {rowData.prefix} {rowData.fname} {rowData.lname}
              </span>
            )}
          />
          <Column body={(rowData) => EditIcon2(rowData)}></Column>
        </DataTable>
      </>
    );
  }

  // หน้ารายการมิเตอร์ที่ถูกใช้แล้ว
  if (meterpage === 3) {
    console.log(dataxuse);
    content = (
      <>
        <h2 className='mt-4 ms-4'>รายการมิเตอร์ที่ถูกใช้</h2>
        <div className='d-flex justify-content-left mt-2 ms-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setMeterpage(0)}
          />
        </div>
        <DataTable
          value={dataxuse}
          header='รายชื่อ'
          filters={filters}
          paginator
          rows={8}
          paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
          currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
        >
          <Column
            header='เลขประจำมาตรน้ำ'
            body={(rowData) => <span>{rowData.meternumber}</span>}
          ></Column>
          <Column
            header='ประเภทมาตรน้ำ'
            body={(rowData) => <span>{rowData.metermaterial}</span>}
          ></Column>
          <Column
            header='ขนาดมาตรน้ำ'
            body={(rowData) => <span>{rowData.international_size} นิ้ว</span>}
          ></Column>
          <Column
            header='วัสดุมาตรน้ำ'
            body={(rowData) => <span>{rowData.metermaterial} </span>}
          ></Column>
          <Column
            header='สถานะมาตรน้ำ'
            body={(rowData) => <span>{rowData.meter_status} </span>}
          ></Column>
          <Column
            header='เจ้าของมาตรวัดน้ำ'
            body={(rowData) => (
              <span>
                {rowData.prefix} {rowData.fname} {rowData.lname}
              </span>
            )}
          />
          <Column body={(rowData) => EditIcon2(rowData)}></Column>
        </DataTable>
      </>
    );
  }

  // หน้ารายการมิเตอร์ที่ยังไม่ถูกใช้งาน
  if (meterpage === 4) {
    content = (
      <>
        <h2 className='mt-4 ms-4'>รายการมาตรน้ำที่ยังไม่ถูกใช้</h2>
        <div className='d-flex justify-content-left mt-2 ms-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setMeterpage(0)}
          />
        </div>
        <div
          className='d-flex justify-content-right mt-2 '
          style={{ marginLeft: 50 }}
        >
          <button
            className='wblue-button'
            onClick={() => {
              setMeterpage(6);
            }}
          >
            {' '}
            เพิ่มมาตรน้ำ
          </button>
        </div>
        <DataTable
          value={dataxnull}
          header='รายชื่อ'
          filters={filters}
          paginator
          rows={8}
          paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
          currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
        >
          <Column
            header='เลขมาตรน้ำ'
            body={(rowData) => <span>{rowData.meternumber}</span>}
          ></Column>
          <Column
            header='ประเภทมาตรน้ำ'
            body={(rowData) => <span>{rowData.metertypename}</span>}
          ></Column>
          <Column
            header='ขนาดมาตรน้ำ'
            body={(rowData) => <span>{rowData.international_size} นิ้ว</span>}
          ></Column>
          <Column
            header='วัสดุมาตรน้ำ'
            body={(rowData) => <span>{rowData.metermaterial} </span>}
          ></Column>
          <Column
            header='สถานะมาตรน้ำ'
            body={(rowData) => <span>{rowData.meter_status} </span>}
          ></Column>
          <Column body={(rowData) => EditIcon(rowData)}></Column>
        </DataTable>
      </>
    );
  }

  // หน้าแก้ไขมาตรน้ำ
  const handleEdit = (data) => {
    setEditData(data);
  };

  if (meterpage === 5) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <h2 className='mx-3'>แก้ไขข้อมูลมาตรน้ำ</h2>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setMeterpage(0)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <CForm className='row g-3'>
              <CForm className='w-30'>
                <CFormInput
                  label='เลขที่ประจำมาตรน้ำ'
                  name='meternumber'
                  value={addNewData.meternumber}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-30'>
                <CFormInput
                  label='ประเภทมาตรน้ำ'
                  name='metertypename'
                  value={addNewData.metertypename}
                  onChange={handleNewInputChange}
                />
              </CForm>

              <CForm className='w-30'>
                <CFormInput
                  label='ขนาดมาตรน้ำ'
                  name='international_size'
                  value={addNewData.international_size}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-40'>
                <CFormInput
                  label='วัสดุมาตรน้ำ'
                  name='metermaterial'
                  value={addNewData.metermaterial}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-40'>
                <CFormInput
                  label='สถานะ'
                  name='meter_status'
                  value={addNewData.meter_status}
                  onChange={handleNewInputChange}
                />
              </CForm>
            </CForm>
          </div>
          <div className='d-flex mt-4'>
            <CCol className='align-items-center'>
              <button
                type='button'
                class='btn btn-primary '
                onClick={handleput}
                style={{ float: 'left', marginLeft: 55 }}
              >
                บันทึก
              </button>
            </CCol>
          </div>
        </div>
      </>
    );
  }

  // หน้าเพิ่มครุภัณฑ์มาตรน้ำ
  if (meterpage === 6) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setMeterpage(4)}
            />
            <h2 className='ms-2'>เพิ่มข้อมูลครุภัณฑ์มาตรวัดน้ำ</h2>
          </div>

          <div className='customcontainer2 d-flex flex-column'>
            <div className='d-flex mt-4'>
              <CForm className='row g-3'>
                {/* เลขครุภัณฑ์ */}
                <CForm className='w-40'>
                  <CFormInput
                    label='เลขประจำมาตรวัดน้ำ'
                    name='meternumber'
                    value={meternumber}
                    // onChange={(e) => setmeternumber(e.target.value)}
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
                  )}
                </CForm>
                {/* สถานะ */}
                <CForm className='w-25'>
                  {/* <CFormInput
                    label='สถานะมาตรวัดน้ำ'
                    onChange={(e) => setmeter_status(e.target.value)}
                  /> */}
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='สถานะมาตรวัดน้ำ'
                    // onChange={(e) => setmetertype_id(e.target.value)}
                    onChange={(e) => setmeter_status(e.target.value)}
                  >
                    <option value={''}>เลือกสถานะมาตรน้ำ</option>
                    <option value={'ปกติ'}>ปกติ</option>
                    <option value={'ระงับใช้'}>ระงับใช้</option>
                    <option value={'ซ่อมแซม'}>ซ่อมแซม</option>
                  </CFormSelect>
                </CForm>

                {/* รหัสลักษณะมาตรวัดน้ำ */}
                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='รหัสลักษณะมาตรวัดน้ำ'
                    // onChange={(e) => setmetertype_id(e.target.value)}
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value={''}>เลือกรหัสลักษณะมาตรวัดน้ำ</option>
                    {datalistmeter.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.metermaster_id}
                      </option>
                    ))}
                  </CFormSelect>
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='Brand' value={showbrand} disabled />
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='Model' value={showmodel} disabled />
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='ขนาดมาตรน้ำ' value={sizemodel} disabled />
                </CForm>
              </CForm>
            </div>
            <div className='d-flex mt-4'>
              <CForm className='row g-3'>
                <CForm className='w-50'>
                  <CFormInput
                    label='ประเภทมาตรน้ำ'
                    value={typemeter}
                    disabled
                  />
                </CForm>
                <CForm className='w-50'>
                  <CFormInput
                    label='ประเภทวัสดุมาตรน้ำ'
                    value={matmiter}
                    disabled
                  />
                </CForm>
              </CForm>
            </div>
            <CCol className='align-items-center'>
              <button
                type='button'
                class='btn btn-primary '
                onClick={handlepostasset}
                style={{ float: 'right', marginLeft: -61 }}
              >
                บันทึก
              </button>
            </CCol>
          </div>
        </div>
      </>
    );
  }

  // หน้าแสดงลักษณะมาตรน้ำ
  if (meterpage === 7) {
    console.log(datalistmeter);
    content = (
      <>
        <h2 className='mt-4 ms-4'>รายการลักษณะมาตรน้ำ</h2>
        <div className='d-flex justify-content-left mt-2 ms-4'>
          <img
            className='mt-1'
            src={require('../../assets/images/backbutton.png')}
            width={30}
            height={30}
            onClick={() => setMeterpage(0)}
          />
        </div>
        <div
          className='d-flex justify-content-right mt-2 '
          style={{ marginLeft: 50 }}
        >
          <button
            className='wblue-button'
            onClick={() => {
              setMeterpage(1);
            }}
          >
            {' '}
            เพิ่มข้อมูลลักษณะมาตรน้ำ
          </button>
        </div>

        <DataTable
          value={datalistmeter}
          header='รายการ'
          filters={filters}
          paginator
          rows={8}
          paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
          currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
        >
          <Column
            header='รหัสลักษณะมาตรวัดน้ำ'
            body={(rowData) => <span>{rowData.metermaster_id}</span>}
          ></Column>
          <Column
            header='วัสดุมาตรวัดน้ำ'
            body={(rowData) => <span>{rowData.metermaterial}</span>}
          ></Column>
          <Column
            header='ขนาดมาตรวัดน้ำ'
            body={(rowData) => <span>{rowData.international_size} นิ้ว</span>}
          ></Column>
          <Column
            header='ประเภทมาตรวัดน้ำ'
            body={(rowData) => <span>{rowData.metertypename} </span>}
          ></Column>
          <Column
            header='Brand'
            body={(rowData) => <span>{rowData.brand} </span>}
          ></Column>
          <Column
            header='Model'
            body={(rowData) => <span>{rowData.model} </span>}
          ></Column>
          <Column body={(rowData) => EditMSIcon(rowData)}></Column>
          <Column
            body={(rowData) => RemoveIcon(rowData.metermaster_id)}
            header=''
          ></Column>
        </DataTable>
      </>
    );
  }

  // หน้าแก้ไขลักษณะมาตรน้ำ
  const handleEditMS = (data) => {
    setEditData(data);
  };

  if (meterpage === 5) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <h2 className='mx-3'>แก้ไขข้อมูลลักษณะมาตรน้ำ</h2>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setMeterpage(0)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <CForm className='row g-3'>
              <CForm className='w-25'>
                <CFormInput
                  label='รหัสลักษณะมาตรวัดน้ำ'
                  name='metermaster_id'
                  value={addNewData.metermaster_id}
                  onChange={handleNewInputChange}
                  disabled
                />
              </CForm>
              <CForm className='w-40'>
                <CFormSelect
                  className='mb-3'
                  aria-label='Small select example'
                  label='ประเภทมาตรน้ำ'
                  name='metertype_id'
                  value={addNewData.metertype_id}
                  onChange={handleNewInputChange}
                >
                  {datametertype.map((item, index) => (
                    <option key={index} value={item.metertype_id}>
                      {item.metertypename}
                    </option>
                  ))}
                </CFormSelect>
              </CForm>
              <CForm className='w-30'>
                <CFormSelect
                  className='mb-3'
                  aria-label='Small select example'
                  label='ขนาดมาตรน้ำ'
                  name='metersize_id'
                  value={addNewData.metersize_id}
                  onChange={handleNewInputChange}
                >
                  <option value='1'>1/2</option>
                  <option value='2'>3/4</option>
                  <option value='3'>1</option>
                  <option value='4'>2</option>
                  <option value='5'>3</option>
                </CFormSelect>
              </CForm>
              <CForm className='w-30'>
                <CFormSelect
                  className='mb-3'
                  aria-label='Small select example'
                  label='วัสดุมาตรน้ำ'
                  name='metermaterial_id'
                  value={addNewData.metermaterial_id}
                  onChange={handleNewInputChange}
                >
                  <option value='1'>ทองเหลือง</option>
                  <option value='2'>เหล็ก</option>
                </CFormSelect>
              </CForm>

              <CForm className='w-30'>
                <CFormInput
                  label='Brand'
                  name='brand'
                  value={addNewData.brand}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-30'>
                <CFormInput
                  label='Model'
                  name='model'
                  value={addNewData.model}
                  onChange={handleNewInputChange}
                />
              </CForm>
            </CForm>
          </div>
          <div className='d-flex mt-4'>
            <CCol className='align-items-center'>
              <button
                type='button'
                class='btn btn-primary '
                onClick={handleput}
                style={{ float: 'left', marginLeft: 55 }}
              >
                บันทึก
              </button>
            </CCol>
          </div>
        </div>
      </>
    );
  }

  // set หน้าแก้ไขครุที่ยังไม่ได้ใช้งาน
  const handleEditnull = (data) => {
    console.log(data);
    setmeternumber(data.meternumber);
    setmeter_status(data.meter_status);
    setmetermaster_id(data.metermaster_id);
    setmeterasset_id(data.meterasset_id);
    setcheckmeternumber(data.meternumber);

    var value = data.metermaster_id;
    var Activity = datalistmeter.filter((res) => res.metermaster_id == value);
    if (Activity.length !== 0) {
      setshowbrand(Activity[0].brand);
      setshowmodel(Activity[0].model);
      setsizemodel(Activity[0].international_size);
      settypemeter(Activity[0].metertypename);
      setmatmeter(Activity[0].metermaterial);
    }
  };

  //แก้ไขมาตรน้ำที่ยังไม่ได้ใช้งาน
  if (meterpage === 8) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setMeterpage(4)}
            />
            <h2 className='mx-3'>แก้ไขข้อมูลครุภัณฑ์มาตรน้ำ</h2>
          </div>
          <div className='customcontainer2 d-flex flex-column'>
            <div className='d-flex mt-4'>
              <CForm className='row g-3'>
                <CForm className='w-25'>
                  <CFormInput
                    label='เลขมาตรน้ำ'
                    name='meternumber'
                    value={meternumber}
                    // onChange={(e) => setmeternumber(e.target.value)}
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
                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='สถานะมาตรวัดน้ำ'
                    name='meter_status'
                    value={meter_status}
                    // onChange={(e) => setmetertype_id(e.target.value)}
                    onChange={(e) => setmeter_status(e.target.value)}
                  >
                    <option value={''}>เลือกสถานะมาตรน้ำ</option>
                    <option value={'ปกติ'}>ปกติ</option>
                    <option value={'ระงับใช้'}>ระงับใช้</option>
                    <option value={'ซ่อมแซม'}>ซ่อมแซม</option>
                  </CFormSelect>
                </CForm>

                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='รหัสลักษณะมาตรวัดน้ำ'
                    name='metermaster_id'
                    value={metermaster_id}
                    // onChange={handleSelect2}
                    onChange={(e) => handleSelect2(e.target.value)}
                  >
                    <option value={''}>เลือกรหัสลักษณะมาตรน้ำ</option>
                    {datalistmeter.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.metermaster_id}
                      </option>
                    ))}
                  </CFormSelect>
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='Brand' value={showbrand} disabled />
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='Model' value={showmodel} disabled />
                </CForm>
                <CForm className='w-15'>
                  <CFormInput label='ขนาดมาตรน้ำ' value={sizemodel} disabled />
                </CForm>
                <CForm className='w-30'>
                  <CFormInput
                    label='ประเภทมาตรน้ำ'
                    value={typemeter}
                    disabled
                  />
                </CForm>
                <CForm className='w-30'>
                  <CFormInput
                    label='ประเภทวัสดุมาตรน้ำ'
                    value={matmiter}
                    disabled
                  />
                </CForm>
              </CForm>
            </div>

            <div className='d-flex mt-4'>
              <CCol className='align-items-center'>
                <button
                  type='button'
                  class='btn btn-primary '
                  onClick={handleputmeterasset}
                  style={{ float: 'left' }}
                >
                  บันทึก
                </button>
              </CCol>
            </div>
          </div>
        </div>
      </>
    );
  }

  //แก้ไขมาตรน้ำที่ถูกใช้
  if (meterpage === 9) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setMeterpage(2)}
            />
            <h2 className='mx-3'>แก้ไขข้อมูลครุภัณฑ์มาตรน้ำที่ถูกใช้งานแล้ว</h2>
          </div>
          <div className='customcontainer2 d-flex flex-column'>
            <div className='d-flex mt-4'>
              <CForm className='row g-3'>
                <CForm className='w-25'>
                  <CFormInput
                    label='เลขมาตรน้ำ'
                    name='meternumber'
                    value={meternumber}
                    onChange={(e) => setmeternumber(e.target.value)}
                  />
                </CForm>
                <CForm className='w-25'>
                  <CFormInput
                    label='สถานะมาตรน้ำ'
                    name='meter_status'
                    value={meter_status}
                    onChange={(e) => setmeter_status(e.target.value)}
                  />
                </CForm>

                <CForm className='w-25'>
                  <CFormSelect
                    className='mb-3'
                    aria-label='Small select example'
                    label='รหัสลักษณะมาตรวัดน้ำ'
                    name='metermaster_id'
                    value={metermaster_id}
                    // onChange={handleSelect2}
                    onChange={(e) => handleSelect2(e.target.value)}
                  >
                    <option value={''}>เลือกรหัสลักษณะมาตรน้ำ</option>
                    {datalistmeter.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.metermaster_id}
                      </option>
                    ))}
                  </CFormSelect>
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='Brand' value={showbrand} disabled />
                </CForm>
                <CForm className='w-25'>
                  <CFormInput label='Model' value={showmodel} disabled />
                </CForm>
                <CForm className='w-15'>
                  <CFormInput label='ขนาดมาตรน้ำ' value={sizemodel} disabled />
                </CForm>
                <CForm className='w-30'>
                  <CFormInput
                    label='ประเภทมาตรน้ำ'
                    value={typemeter}
                    disabled
                  />
                </CForm>
                <CForm className='w-30'>
                  <CFormInput
                    label='ประเภทวัสดุมาตรน้ำ'
                    value={matmiter}
                    disabled
                  />
                </CForm>
              </CForm>
            </div>

            <div className='d-flex mt-4'>
              <CCol className='align-items-center'>
                <button
                  type='button'
                  class='btn btn-primary '
                  onClick={handleputmeterasset}
                  style={{ float: 'left' }}
                >
                  บันทึก
                </button>
              </CCol>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <>{content}</>;
};

export default WaterMeterData;
