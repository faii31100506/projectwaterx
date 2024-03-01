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
import { InputSwitch } from 'primereact/inputswitch';
import { Steps } from 'primereact/steps';
import { CFormSwitch } from '@coreui/react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
} from '@coreui/react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilChevronLeft } from '@coreui/icons';
import { Row } from 'primereact/row';
import styled from 'styled-components';
import ErrorIcon from '../../assets/images/warning.png';

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-style: italic;
  margin-left: 5px;
  font-size: 14px;
`;

const WaterUserRole = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [addrolevisible, setAddrolevisible] = useState(false);
  // const [checked1, setChecked1] = useState(false);
  // const [checked2, setChecked2] = useState(false);
  // const [checked3, setChecked3] = useState(false);
  // const [checked4, setChecked4] = useState(false);
  // const [checked5, setChecked5] = useState(false);
  // const [checked6, setChecked6] = useState(false);
  const [datax, setDatax] = useState([]);
  const [registerpage, setRegisterpage] = useState(1);
  const [editData, setEditData] = useState([]);
  const [search, setSearch] = useState([]);
  const OFFICER_API = process.env.REACT_APP_OFFICER_API;

  // เพิ่มข้อมูล
  const [name, setname] = useState('');
  const [lastname, setlastname] = useState('');
  const [pos_name, setposname] = useState('');
  const [org_name, setorgname] = useState('');
  const [username, setusername] = useState('');
  const [pass, setpass] = useState('');
  const [checkname, setcheckname] = useState('');
  const [checklastname, setchecklastname] = useState('');
  const [checkusername, setcheckusername] = useState('');

  const [error, setError] = useState('');
  const [error2, setError2] = useState('');

  //ดึงข้อมูล
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/officer')
      .then((res) => setDatax(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(datax);

  // บันทึกข้อมูล
  const handlepost = async (event) => {
    if (
      (name !== '' || name !== null) &&
      (lastname !== '' || lastname !== null)
    ) {
      var Activity = datax.filter((res) => res.name == name);
      var Activity2 = datax.filter((res) => res.lastname == lastname);

      if (Activity.length !== 0 && Activity2.length !== 0) {
        return Swal.fire({
          text: 'ชื่อและนามสกุลมีอยู่แล้วในระบบ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      }
    }

    if (name === '' || name === null) {
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

    if (lastname == '' || lastname == null) {
      return Swal.fire({
        text: 'โปรดกรอกนานสกุล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (pos_name == '' || pos_name == null) {
      return Swal.fire({
        text: 'โปรดเลือกตำแหน่ง',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (org_name == '' || org_name == null) {
      return Swal.fire({
        text: 'โปรดเลือกองค์กร',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (username !== '' || username !== null) {
      var Activity = datax.filter((res) => res.username == username);

      if (Activity.length !== 0) {
        return Swal.fire({
          text: 'Username ซ้ำ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      }
    } else if (username === '') {
      return Swal.fire({
        text: 'โปรดกรอก Username',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (pass == '' || pass == null) {
      return Swal.fire({
        text: 'โปรดกรอก Password',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    var data = {
      name: name,
      lastname: lastname,
      pos_name: pos_name,
      org_name: org_name,
      username: username,
      pass: pass,
    };
    console.log(data);
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
          .post(process.env.REACT_APP_API + '/modelofficer', data)
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

  // แก้ไข
  const handleput = async (event) => {
    if (
      (addNewData.name !== '' || addNewData.name !== null) &&
      (addNewData.lastname !== '' || addNewData.lastname !== null)
    ) {
      var Activity = datax.filter((res) => res.name == addNewData.name);
      var Activity2 = datax.filter(
        (res) => res.lastname == addNewData.lastname
      );

      if (
        addNewData.name !== checkname &&
        addNewData.lastname !== checklastname &&
        Activity.length !== 0 &&
        Activity2 !== 0
      ) {
        return Swal.fire({
          text: 'ชื่อและนามสกุลมีอยู่แล้วในระบบ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      }
    }

    if (addNewData.name === '' || addNewData.name === null) {
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

    if (addNewData.lastname == '' || addNewData.lastname == null) {
      return Swal.fire({
        text: 'โปรดกรอกนานสกุล',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (addNewData.pos_name == '' || addNewData.pos_name == null) {
      return Swal.fire({
        text: 'โปรดเลือกตำแหน่ง',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (addNewData.org_name == '' || addNewData.org_name == null) {
      return Swal.fire({
        text: 'โปรดเลือกองค์กร',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (addNewData.username !== '' || addNewData.username !== null) {
      var Activity = datax.filter((res) => res.username == addNewData.username);

      if (addNewData.username !== checkusername && Activity.length !== 0) {
        return Swal.fire({
          text: 'Username ซ้ำ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      }
    } else if (addNewData.username === '') {
      return Swal.fire({
        text: 'โปรดกรอก Username',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (addNewData.pass == '' || addNewData.pass == null) {
      return Swal.fire({
        text: 'โปรดกรอก Password',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }
    var data = {
      name: addNewData.name,
      lastname: addNewData.lastname,
      pos_name: addNewData.pos_name,
      org_name: addNewData.org_name,
      username: addNewData.username,
      pass: addNewData.pass,
    };

    Swal.fire({
      text: 'คุณต้องการแก้ไขข้อมูลหรือไม่ ?',
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
            process.env.REACT_APP_API + '/officer/' + addNewData.officer_id,
            data
          )
          .then(
            (res) => {
              if (res.status === 200) {
                // alert("succesfull");
              }
              console.log(res);
              Swal.fire({
                text: 'บันทึกข้อมูลสำเร็จ.',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'ตกลง',
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
                text: 'บันทึกข้อมูลไม่สำเร็จ.',
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'ตกลง',
                customClass: {
                  confirmButton: 'btn fw-bold btn-primary',
                },
              });
            }
          );
      }
    });
  };

  const handleDel = (officer_id) => {
    var data = {
      officer_id: officer_id,
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
            process.env.REACT_APP_API + '/officerdel/' + data.officer_id,
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
  //ปุ่มแกไข
  const EditIcon = (data) => {
    return (
      <button className='buttonpic'>
        <img
          src={require('../../assets/images/edit.png')}
          width={30}
          height={30}
          onClick={() => {
            setRegisterpage(2);
            handleEdit(data);
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
    officer_id: '',
    name: '',
    lastname: '',
    pos_name: '',
    org_name: '',
    username: '',
    pass: '',
  });

  // แก้ไข
  useEffect(() => {
    setAddNewData({
      officer_id: editData.officer_id || '',
      name: editData.name || '',
      lastname: editData.lastname || '',
      pos_name: editData.pos_name || '',
      org_name: editData.org_name || '',
      username: editData.username,
      pass: editData.pass,
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

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    const namee = name;
    const inputValue = e.target.value;
    // ตรวจสอบรูปแบบของข้อมูล
    if (namee == 'name') {
      if (
        inputValue === '' ||
        (/^[A-Za-z\sก-๙]+$/u.test(inputValue) &&
          !/[\u0E50-\u0E59]/.test(inputValue))
      ) {
        setname(inputValue);
        setError('');
      } else {
        setError('โปรดกรอกภาษาไทยหรือภาษาอังกฤษเท่านั้น');
      }
    }

    if (namee == 'lastname') {
      if (
        inputValue === '' ||
        (/^[A-Za-z\sก-๙]+$/u.test(inputValue) &&
          !/[\u0E50-\u0E59]/.test(inputValue))
      ) {
        setlastname(inputValue);
        setError2('');
      } else {
        setError2('โปรดกรอกภาษาไทยหรือภาษาอังกฤษเท่านั้น');
      }
    }
  };

  let content;

  // หน้าแสดงหลัก
  if (registerpage === 1) {
    content = (
      <>
        <div className='d-flex flex-column  mb-5 ml-5 mr-5'>
          <div className='d-flex mt-5 justify-content-between'>
            <h4 className='mx-5'>รายชื่อพนักงาน</h4>
            <div className='p-input-icon-left mx-5 mr-10'>
              <CIcon icon={cilSearch}></CIcon>
              <InputText
                className='p-inputtext-sm rounded-pill mr-2'
                placeholder='ค้นหารายชื่อพนักงาน'
                onInput={(e) =>
                  setFilters({
                    global: {
                      value: e.target.value,
                      matchMode: FilterMatchMode.CONTAINS,
                    },
                  })
                }
                // onChange={(e) => handleSeach(e)}
              />
              <CButton
                color='info'
                className='buttoninsert'
                onClick={() => {
                  setRegisterpage(3);
                }}
              >
                เพิ่มข้อมูล
              </CButton>
            </div>
          </div>
          <DataTable
            filters={filters}
            value={datax}
            header='รายชื่อทั้งหมด'
            paginator
            rows={8}
            paginatorTemplate='CurrentPageReport PageLinks PrevPageLink NextPageLink'
            currentPageReportTemplate='หน้า {currentPage} จาก {totalPages}'
          >
            <Column
              header='ชื่อ นามสกุล'
              // body={(rowData) => (
              //   <span>
              //     {rowData.name}&nbsp;&nbsp;
              //     {rowData.lastname}
              //   </span>
              // )}
              field='fullname'
            ></Column>
            <Column
              header='ตำแหน่ง'
              // body={(rowData) => <span>{rowData.pos_name}</span>}
              field='pos_name'
            ></Column>
            <Column
              header='องค์กร'
              // body={(rowData) => <span>{rowData.org_name}</span>}
              field='org_name'
            ></Column>
            <Column
              field='editstat'
              body={(rowData) => EditIcon(rowData)}
              header=''
            ></Column>
            <Column
              body={(rowData) => RemoveIcon(rowData.officer_id)}
              header=''
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }

  // แก้ไขข้อมูล
  const handleEdit = (data) => {
    setEditData(data);
    setcheckname(data.name);
    setchecklastname(data.lastname);
    setcheckusername(data.username);
    console.log(editData);
    console.log(OFFICER_API);
  };

  console.log(editData);

  // แก้ไข
  if (registerpage === 2) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <h2 className='mx-3'>แก้ไขข้อมูลพนักงาน</h2>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setRegisterpage(1)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <CForm className='row g-3'>
              <CForm className='w-50'>
                <CFormInput
                  label='ชื่อ'
                  name='name'
                  value={addNewData.name}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-50'>
                <CFormInput
                  label='นามสกุล'
                  name='lastname'
                  value={addNewData.lastname}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-50'>
                <CFormSelect
                  className='mb-3'
                  aria-label='Small select example'
                  label='ตำแหน่ง'
                  name='pos_name'
                  value={addNewData.pos_name}
                  onChange={handleNewInputChange}
                >
                  <option>เลือกตำแหน่ง</option>
                  <option value='พนักงานทั่วไป'>พนักงานทั่วไป</option>
                  <option value='พนักงานภาคสนาม'>พนักงานภาคสนาม</option>
                </CFormSelect>
              </CForm>
              <CForm className='w-50'>
                <CFormInput
                  label='องค์กร'
                  name='org_name'
                  value={addNewData.org_name}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-40'>
                <CFormInput
                  label='Username'
                  name='username'
                  value={addNewData.username}
                  onChange={handleNewInputChange}
                />
              </CForm>
              <CForm className='w-40'>
                <CFormInput
                  label='Password'
                  name='pass'
                  value={addNewData.pass}
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
                style={{ float: 'right' }}
              >
                บันทึก
              </button>
            </CCol>
          </div>
        </div>
      </>
    );
  }

  //เพิ่มข้อมูล
  if (registerpage === 3) {
    content = (
      <>
        <div className='d-flex flex-column'>
          <h2 className='mx-3'>เพิ่มข้อมูลพนักงาน</h2>
          <div className='d-flex mt-4'>
            <img
              className='mt-1'
              src={require('../../assets/images/backbutton.png')}
              width={30}
              height={30}
              onClick={() => setRegisterpage(1)}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <CForm className='row g-3'>
              <CForm className='w-40'>
                <CFormInput
                  label='ชื่อ'
                  name='name'
                  // onChange={(e) => setname(e.target.value)}
                  value={name}
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
              <CForm className='w-40'>
                <CFormInput
                  label='นามสกุล'
                  name='lastname'
                  // onChange={(e) => setlastname(e.target.value)}
                  value={lastname}
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
              <CForm className='w-40'>
                <CFormSelect
                  // size="sm"
                  className='mb-3'
                  aria-label='Small select example'
                  label='ตำแหน่ง'
                  onChange={(e) => setposname(e.target.value)}
                >
                  <option>เลือกตำแหน่ง</option>
                  <option value='พนักงานทั่วไป'>พนักงานทั่วไป</option>
                  <option value='พนักงานภาคสนาม'>พนักงานภาคสนาม</option>
                </CFormSelect>
              </CForm>
              <CForm className='w-40'>
                <CFormSelect
                  // size="sm"
                  className='mb-3'
                  aria-label='Small select example'
                  label='องค์กร'
                  onChange={(e) => setorgname(e.target.value)}
                >
                  <option>เลือกองค์กร</option>
                  <option value='หนองเป็ด'>หนองเป็ด</option>
                </CFormSelect>
              </CForm>
              <CForm className='w-40'>
                <CFormInput
                  label='Username'
                  name='user'
                  onChange={(e) => setusername(e.target.value)}
                />
              </CForm>
              <CForm className='w-40'>
                <CFormInput
                  label='Password'
                  name='pass'
                  onChange={(e) => setpass(e.target.value)}
                />
              </CForm>
            </CForm>
          </div>
          <div className='d-flex mt-4'>
            <CCol className='align-items-center'>
              <button
                type='button'
                class='btn btn-primary '
                onClick={handlepost}
                style={{ float: 'right' }}
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
      <div className='customcontainer3 mt-5'>
        <div className='d-flex flex-column'>{content}</div>
      </div>
    </>
  );
};

export default WaterUserRole;
