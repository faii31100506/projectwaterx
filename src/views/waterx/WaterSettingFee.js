import React from 'react'
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

const WaterSettingFee = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  let content;
  if(selectedCity==='Rome')
  {
    content=(
      <>meow</>
    )
  }


    return (
    <>
    <h4 className="mt-4 mx-4">การจัดการอัตราใบอนุญาตและค่าธรรมเนียมการใช้น้ำประปา</h4>
    <div className="customcontainer3 mt-5">
      <div className="d-flex flex-column">
        <div className="d-flex">
          <div className="me-2"></div>
        </div>
        {content}
      </div>
    </div>
    </>
  )
}

export default WaterSettingFee