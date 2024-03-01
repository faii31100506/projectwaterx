import React, { useEffect, useState, useContext } from 'react';
import { Navigate, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react';
import Swal from 'sweetalert2';
// import "src/views/pages/login/Login.css";
import '../../../views/pages/login/Login.css';
import axios from 'axios';
import WaterRegister from '../../../views/waterx/WaterRegister';
import { useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';
// import { setData } from './UserContext';
const Login = () => {
  // const { setUserId } = useContext(useUser);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [database, setdatabase] = useState('');
  const [OpenEdit, setOpenEdit] = useState(false);
  const [data, setData] = useState('');

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // const [setUserId] = useUser('');

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + '/usernamepass')
      .then((res) => {
        setdatabase(res.data.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const errors = {
    uname: 'invalid username',
    pass: 'invalid password',
  };

  const handleLogin = (event) => {
    if (Username == '') {
      return Swal.fire({
        text: 'กรุณากรอก Username',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    if (Password == '') {
      return Swal.fire({
        text: 'กรุณากรอก Password',
        icon: 'warning',
        buttonsStyling: false,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'btn fw-bold btn-primary',
        },
      });
    }

    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.filter((user) => user.username === Username);
    console.log(userData);
    console.log('userData', userData[0].pass);
    console.log('password', Password);

    // Compare user info
    if (userData) {
      if (userData[0].pass !== Password) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
        return Swal.fire({
          text: 'เข้าสู่ระบบไม่สำเร็จ',
          icon: 'error',
          buttonsStyling: false,
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'btn fw-bold btn-primary',
          },
        });
      } else {
        setIsSubmitted(true);

        const userId = userData[0].nameuser;
        const myObject = { id: userData.officer_id, name: userData.nameuser };

        localStorage.setItem('myObject111', JSON.stringify(userId));

        navigate(`/water-register`);

        console.log(localStorage);
        console.log(localStorage.myObject111);
      }
    } else {
      // Username not found
      return Swal.fire({
        icon: 'error',
        title: 'เข้าสู่ระบบไม่สำเร็จ',
        preConfirm: () => {
          navigate(`/`);
        },
      });
    }
  };

  return (
    <div className='background'>
      <CContainer className='CardGroup'>
        <CRow className='justify-content-center'>
          <CCol md={8}>
            <CCardGroup>
              <CCard className='Card'>
                <CCardBody>
                  <CForm>
                    <div className='Loghead'>
                      <h1 className='Loghead' style={{ marginBottom: '0rem' }}>
                        Log in
                      </h1>
                    </div>

                    <p className='welcometext'>ยินดีต้อนรับสู่ Water X</p>

                    <CInputGroup className='mb-3'>
                      <CFormInput
                        className='textInput'
                        placeholder='Username'
                        autoComplete='username'
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className='mb-4'>
                      <CFormInput
                        style={{ marginBottom: '10px' }}
                        className='textInput'
                        type='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol>
                        <CButton className='px-4' onClick={handleLogin}>
                          LOGIN
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
