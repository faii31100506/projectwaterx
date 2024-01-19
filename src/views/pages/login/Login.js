import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "@coreui/react";
import Swal from "sweetalert2";
// import "src/views/pages/login/Login.css";
import "../../../views/pages/login/Login.css";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const handleLogin = () => {
    // alert("Pass");
    if (Username == "LnwZa" && Password == "007x") {
      Swal.fire("Login Success!", "Welcome to Water X Project", "success");
      setUsername("");
      setPassword("");
    } else {
      Swal.fire("Sorry!", "Can't login, please try again", "error");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="background">
      <CContainer className="CardGroup">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="Card">
                <CCardBody>
                  <CForm>
                    <div className="Loghead">
                      <h1
                        className="Loghead"
                        style={{ marginBottom: "0rem" }}
                      >
                        Log in
                      </h1>
                    </div>

                    <p className="welcometext">ยินดีต้อนรับสู่ Water X</p>

                    <CInputGroup className="mb-3">
                      <CFormInput
                        className="textInput"
                        placeholder="Username"
                        autoComplete="username"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CFormInput
                        style={{ marginBottom: "10px" }}
                        className="textInput"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol>
                        <CButton className="px-4" onClick={handleLogin}>
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
