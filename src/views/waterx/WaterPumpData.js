import React from 'react'
import "./waterx.css"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from 'react';
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import CIcon from '@coreui/icons-react'
import {
  cilSearch,
} from '@coreui/icons'
import { CForm, CFormInput, CFormSelect } from '@coreui/react';

const WaterPumpData = () => {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const data = [
    {
      pumpid: "WT-2111045",
      guage: "56/2 หมู่ 4 ต.จรเข้เผือก",
      status: "ปกติ",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
    {
      pumpid: "WT-2311045",
      guage: "xxxxxxx xxxxxxxxx",
      status: "ปกติ",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
    {
      pumpid: "WT-2891045",
      guage: "xxxxxxx xxxxxxxxx",
      status: "ปกติ",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
    {
      pumpid: "WT-2850045",
      guage: "xxxxxxx xxxxxxxxx",
      status: "ปกติ",
      moreinfo: "ข้อมูลเพิ่มเติม"

    },
  ]
  const [pumppage, setPumppage] = useState('0')
  const alertBro = () => {
    alert("ทดสอบ")
  }
  const EditIcon = () => {
    return (
      <button className="buttonpic"><img src={require("../../assets/images/edit.png")} width={30} height={30} onClick={alertBro} /></button>
    )

  }
  const RemoveIcon = () => {
    return (
      <button className='buttonpic'><img src={require("../../assets/images/remove.png")} width={30} height={30} onClick={alertBro} /></button>
    )



  }
  const MoreInfo = () => {
    return (
      <button className="info-button" onClick={() => setPumppage('2')}>ข้อมูลเพิ่มเติม</button>
    )



  }

  let content;
  if (pumppage === '0') {
    content = (
      <>
        <div className="d-flex justify-content-between mt-4 ms-4">
          <h4 className="mt-1">ข้อมูลเครื่องปั้มน้ำ</h4>
          <button className="wblue-button " onClick={() => setPumppage('1')}>+ เพิ่มข้อมูลเครื่องปั้มน้ำ</button>
        </div>
        <DataTable value={data} header="รายการเครื่องปั้มน้ำ"
          paginator
          rows={8}
          paginatorTemplate="CurrentPageReport PageLinks PrevPageLink NextPageLink"
          currentPageReportTemplate="หน้า {currentPage} จาก {totalPages}"
        >

          <Column field="pumpid" header="รหัสเครื่องปั้มน้ำ"></Column>
          <Column field="guage" header="ตำแหน่งที่ตั้ง"></Column>
          <Column field="status" header="สถานะ"></Column>
          <Column field="moreinfo" body={MoreInfo} header=""></Column>
          <Column field="agent" body={EditIcon} header=""></Column>
          <Column field="agent" body={RemoveIcon} header=""></Column>
        </DataTable>
      </>
    )
  }
  if (pumppage === '1') {
    content = (
      <>

        <div className="d-flex mt-4">
          <img className="mt-1" src={require("../../assets/images/backbutton.png")} width={30} height={30} onClick={() => setPumppage('0')} />
          <h2 className="ms-2">เพิ่มข้อมูลเครื่องปั้มน้ำ</h2>

        </div>
        <div className="customcontainer5 mt-4">
          <div className="p-input-icon-left mt-5 mx-5">
            <CIcon icon={cilSearch}></CIcon>
            <InputText className="p-inputtext-sm rounded-pill" placeholder='ค้นหาตำแหน่ง'
              onInput={(e) =>
                setFilters({
                  global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
                })
              }
            />
          </div>
          <h5 className="mt-4 mx-5">หรือ ปักหมุดตำแหน่งของที่ตั้งมาตรวัด</h5>
          <div className="d-flex flex-column">
            <div className="d-flex mt-5">
              <div className="d-flex w-65">
                <div className="customcontainer4 ml-5 mr-5">

                </div>
              </div>
              <div className="d-flex flex-column w-35">
                <div className="d-flex ml-5 mr-5">
                  <img src={require("../../assets/images/map_pin_bl.png")} width={30} height={30}></img>
                  <h5 className="mx-2">รายละเอียดตำแหน่ง</h5>
                </div>
                <div className="d-flex mt-3 ml-5 mr-5">
                  <CForm className="w-50">
                    <CFormInput className="w-90" label="บ้านเลขที่ติดตั้ง" />
                  </CForm>
                  <CForm className="w-50">
                    <CFormInput className="w-90" label="หมู่" />
                  </CForm>
                </div>
                <div className="d-flex mt-3 ml-5 mr-5">
                  <CForm className="w-50">
                    <CFormInput className="w-90" label="ตำบล" />
                  </CForm>
                  <CForm className="w-50">
                    <CFormInput className="w-90" label="อำเภอ" />
                  </CForm>
                </div>
                <div className="d-flex mt-3 ml-5 mr-5">
                  <CForm className="w-50">
                    <CFormInput className="w-90" label="จังหวัด" />
                  </CForm>
                </div>

              </div>
            </div>
            <div className="d-flex mt-5">
              <div className="w-25">
                <h5 className="mx-5">สเปคเครื่องปั้มน้ำ</h5>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormSelect className="w-90" label="ประเภทสินค้า">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="แบรนด์" />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormSelect className="w-90" label="กำลังมอเตอร์ (วัตต์)">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>

            </div>
            <div className="d-flex mt-5">
              <div className="w-25">
                <h5 className="mx-5"></h5>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormSelect className="w-90" label="รุ่น">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormSelect className="w-90" label="ขนาดท่อดูด (มม./นิ้ว)">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormSelect className="w-90" label="ขนาดท่อส่ง (มม./นิ้ว)">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>

            </div>
            <div className="d-flex mt-5">
              <div className="w-25">
                <h5 className="mx-5"></h5>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="ระยะดูดต่ำสุด-สูงสุด (เมตร)" />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="แรงดันน้ำต่ำสุด-สูงสุด (บาร์)" />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="ปริมาณน้ำสูงสุด (ลิตร/นาที)" />
                </CForm>
              </div>

            </div>
            <div className="d-flex mt-5">
              <div className="w-25">
                <h5 className="mx-5"></h5>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="สี" />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="รับประกันมอเตอร์ (ปี)" />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="รับประกันสินค้า (ปี)" />
                </CForm>
              </div>

            </div>
            <div className="d-flex mt-5">
              <div className="w-25">
                <h5 className="mx-5"></h5>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="ขนาดสินค้า (กxลxส) ซม." />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormInput className="w-90" label="น้ำหนัก (กก.)" />
                </CForm>
              </div>
              <div className="w-25">
                <CForm className="w-60">
                  <CFormSelect className="w-90" label="สถานะของปั้มน้ำ">
                    <option></option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>Three</option>
                  </CFormSelect>
                </CForm>
              </div>

            </div>
            <div className="d-flex mt-5 mb-5">
              <div className="w-25"></div>
              <div className="piccontainer h-40 w-30"></div>
            </div>
            <button className="wblue-button-unrounded mt-auto mb-5 w-15 text-center" >บันทึกข้อมูล</button>
          </div>

        </div>
      </>
    )
  }
  if (pumppage === '2') {
    content = (
      <>

        <div className="d-flex flex-column mt-4 ms-4">
          <div className="d-flex justify-content-between">
            <h4 className="mt-1">ข้อมูลเครื่องปั้มน้ำ</h4>
            <button className="wblue-button " onClick={() => setPumppage('1')}>+ เพิ่มข้อมูลเครื่องปั้มน้ำ</button>
          </div>
          <div className="mapcontainer h-60">

          </div>
          <div className="customcontainer5 flex-column d-flex">
            <div className="d-flex mx-5 mb-5 mt-5">
              <div className="piccontainer h-40 w-30">

              </div>
              <div className="d-flex flex-column mx-5 mt-2 w-70">
                <h4>รายละเอียดข้อมูลเครื่องปั้มน้ำ</h4>
                <div className="mt-5">รหัสเครื่องปั้มน้ำ:</div>
                <div className="mt-5">สถานะ:</div>
                <div className="mt-5">เจ้าของ:</div>
                <div className="mt-5">ตำแหน่งที่ตั้ง:</div>
              </div>

            </div>
            <div className="d-flex mx-5 mb-5">
              <div className="customcontainer4 w-30 mb-5 h-49">
                <h4 className="text-center mt-5">
                  ประวัติการเปลี่ยนปั้มน้ำ
                </h4>
              </div>


              <div className="customcontainer4 mx-5 w-70 mb-5 d-flex flex-column">
                <h4 className="text-center mt-5">
                  สเปกเครื่องปั้มน้ำ
                </h4>
                <div className="d-flex">
                  <div className="d-flex flex-column w-50 ml-10">
                    <div className="mb-3 mt-3">ประเภทสินค้า</div>
                    <div className="mb-3">แบรนด์</div>
                    <div className="mb-3">กำลังมอเตอร์ (วัตต์)</div>
                    <div className="mb-3">รุ่น</div>
                    <div className="mb-3">ขนาดท่อดูด (มม./นิ้ว)</div>
                    <div className="mb-3">ขนาดท่อส่ง (มม./นื้ว)</div>
                    <div className="mb-3">ระยะดูดต่ำสุด-สูงสุด (เมตร)</div>
                    <div className="mb-3">แรงดันน้ำต่ำสุด-สูงสุด (บาร์)</div>
                    <div className="mb-3">ปริมาณน้ำสูงสุด (ลิตร/นาที)</div>
                    <div className="mb-3">สี</div>
                    <div className="mb-3">รับประกันมอเตอร์ (ปี)</div>
                    <div className="mb-3">รับประกันสินค้า (ปี)</div>
                    <div className="mb-3">ขนาดสินค้า (กxลxส) ซม.</div>
                    <div className="mb-3">น้ำหนัก (กก.)</div>
                  </div>
                  <div className="d-flex flex-column w-50 ml-10">
                    <div className="mb-3 mt-3">a</div>
                    <div className="mb-3">b</div>
                    <div className="mb-3">c</div>
                    <div className="mb-3">d</div>
                    <div className="mb-3">e</div>
                    <div className="mb-3">a</div>
                    <div className="mb-3">b</div>
                    <div className="mb-3">c</div>
                    <div className="mb-3">d</div>
                    <div className="mb-3">e</div>
                    <div className="mb-3">a</div>
                    <div className="mb-3">b</div>
                    <div className="mb-3">c</div>
                    <div className="mb-3">d</div>
                  </div>
                </div>
              </div>

            </div>
          </div>



        </div>
      </>
    )
  }
  return (
    <>
      {content}
    </>
  )
}
export default WaterPumpData
