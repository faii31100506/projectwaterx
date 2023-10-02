import React, { useEffect } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from 'react';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./waterx.css"
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import { Steps } from 'primereact/steps';
import  axios   from 'axios';
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
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cilSearch,
  cilChevronLeft,
} from '@coreui/icons'
import { Row } from 'primereact/row';


const WaterRegData31 = () => {
 const [data,setData] = useState([])
 useEffect(()=> {
  axios.get('http://localhost:4034/api/nahra/listowner')
  .then(res => setData(res.data.data))
  .catch(err => console.log(err));
}, [])
    return (
      <>
      <h4 className="mt-4 mx-4">รายงานทะเบียนคุมสมุดจดมาตรวัดน้ำ (ป.31)</h4>
        {
          data.map((user,index) => {
            return <tr key={index}>
              <td>{user.prapaowner_id}</td>
              <td>{user.census_id}</td>
              <td>{user.address}</td>
              <td>{user.lname}</td>
            </tr>
          })
        }
      </>
  )
}

export default WaterRegData31