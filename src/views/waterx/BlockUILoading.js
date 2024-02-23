import { CButton } from '@coreui/react';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import axios from 'axios';

const BlockUILoading1 = () => {
  const styles = {
    margin: '0',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: document.documentElement.scrollHeight + 'px',
    opacity: '.5',
    backgroundColor: '#000',
    zIndex: '10000',
    overflow: 'auto',
  };

  const styles2 = {
    borderRadius: '0.475rem',
    boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
    backgroundColor: '#fff',
    color: 'rgb(24 28 50 / 72%)',
    fontWeight: '500',
    margin: '0',
    width: 'auto',
    padding: '1rem 2rem',
    top: 'calc(308% - 2rem)',
    left: 'calc(50% - 4rem)',
    zIndex: '10001',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const styles3 = {
    width: '30%',
    left: '61%',
    position: 'sticky',
    // transform: 'translate(-50%, -50%)',
  };

  localStorage.setItem('month', JSON.stringify(null));
  localStorage.setItem('loading', JSON.stringify(null));
  localStorage.setItem('success', JSON.stringify(null));

  const updatestatuspransection = async () => {
    // alert('เข้า');
    //เรียก api  update สถานะ
    // var status = 200;

    let resultsL = await axios
      .post(process.env.REACT_APP_API + '/updateprapwner')
      .then(
        (res) => {
          if (res.status === 200) {
            let precycle_month = 2;
            localStorage.setItem('month', JSON.stringify(precycle_month));
            localStorage.setItem('loading', JSON.stringify(false));
            localStorage.setItem('success', JSON.stringify(true));
          }
          // console.log(res);
          // Swal.fire({
          //   icon: 'success',
          //   title: 'succesfull',
          //   preConfirm: () => {
          //     return window.location.reload();
          //   },
          // });
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

    // let precycle_month = moment().tz('Asia/Bangkok').format('M');
  };

  return (
    <>
      <div style={{ ...styles, position: 'fixed', textAlign: 'center' }}></div>
      <div
        className='d-grid gap-2 col-6 mx-auto'
        style={{ ...styles2, position: 'absolute', textAlign: 'top' }}
      >
        <p>
          กรุณากดเพื่อเปลี่ยนสถานะการจดของผู้ใช้น้ำ
          เพื่อทำการจดค่าน้ำของเดือนใหม่
        </p>
        <CButton
          color='primary'
          style={{ ...styles3 }}
          onClick={updatestatuspransection}
        >
          ตกลง
        </CButton>
      </div>
    </>
  );
};
export { BlockUILoading1 };
