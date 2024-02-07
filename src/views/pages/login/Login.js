import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
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

const Login = () => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [database, setdatabase] = useState('');

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    // alert("Pass");
    // if (Username == '123456' && Password == '123456') {
    //   // Swal.fire('Login Success!', 'Welcome to Water X Project', 'success');
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'succesfull',
    //     preConfirm: () => {
    //       return (window.location.href = '/water-register');
    //     },
    //   });
    //   setUsername('');
    //   setPassword('');
    // } else {
    //   Swal.fire('Sorry!', "Can't login, please try again", 'error');
    //   setUsername('');
    //   setPassword('');
    // }

    console.log(event);

    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === Username);

    // Compare user info
    if (userData) {
      if (userData.pass !== Password) {
        // Invalid password
        setErrorMessages({ name: 'pass', message: errors.pass });
      } else {
        setIsSubmitted(true);
        return Swal.fire({
          icon: 'success',
          title: 'succesfull',
          preConfirm: () => {
            return (window.location.href = '/water-register');
          },
        });
      }
    } else {
      // Username not found
      return Swal.fire({
        icon: 'error',
        title: 'succesfull',
        preConfirm: () => {
          // return (window.location.href = '/water-register');
        },
      });
      setErrorMessages({ name: 'uname', message: errors.uname });
    }
  };

  console.log('isSubmitted', isSubmitted);
  console.log('errorMessages', errorMessages);

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
