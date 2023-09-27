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


const WaterRegData17 = () => {
  const Data0 = [
    {
      useId: "0001",
      name: "นายทำดี สีสะอาด",
      bill: "960/38",
      curdept: "95",
      stackdept: "50",
      taxes: "5",
      total: "150"
    },
    {
      useId: "0002",
      name: "นางศรีนวล มานะ",
      bill: "960/39",
      curdept: "0",
      stackdept: "95",
      taxes: "5",
      total: "100"
    },
    {
      useId: "0003",
      name: "นายมีสุข ขยันดี",
      bill: "960/40",
      curdept: "50",
      stackdept: "45",
      taxes: "5",
      total: "100"
    },
    {
      useId: "0004",
      name: "นางสาวฤทัย ใจดี",
      bill: "960/41",
      curdept: "50",
      stackdept: "95",
      taxes: "5",
      total: "150"
    },
    {
      useId: "0005",
      name: "นายสะอาด บุญงาม",
      bill: "960/42",
      curdept: "45",
      stackdept: "50",
      taxes: "5",
      total: "100"
    },
    {
      useId: "0006",
      name: "นายธนาคาร หลักแหล",
      bill: "960/43",
      curdept: "45",
      stackdept: "150",
      taxes: "5",
      total: "200"
    },
  ]
  return (
    <>
      <h4 className="mt-4 mx-4">ทะเบียนคุมลูกหนี้รายตัว (รายบุคคล) (ป.17) </h4>

    </>
  )
}

export default WaterRegData17