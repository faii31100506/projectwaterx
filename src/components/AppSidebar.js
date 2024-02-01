import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import '../views/waterx/waterx.css';

import { AppSidebarNav } from './AppSidebarNav';

import { logoNegative } from 'src/assets/brand/logo-negative';
import { sygnet } from 'src/assets/brand/sygnet';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import Logoicon from '../assets/images/waterxicon.png';

// sidebar nav config
import navigation from '../_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [Xlogo, setXlogo] = useState('0');
  const ShowXlogo = () => {
    if (Xlogo === '0') {
      return (
        <h2 className='mt-4'>
          {' '}
          <img
            src={Logoicon}
            alt='Error Icon'
            width='41'
            height='41'
            style={{ marginTop: -11, marginLeft: -24 }}
          />
          Water X
        </h2>
      );
    }
    if (Xlogo === '1') return <h2 className='mt-4'>X</h2>;
  };

  const SetDynamicLogo = () => {
    if (Xlogo === '1') setXlogo('0');
    if (Xlogo === '0') setXlogo('1');
  };

  return (
    <CSidebar
      position='fixed'
      unfoldable={unfoldable}
      // visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarBrand className='d-none d-md-flex border border-bottom-0' to='/'>
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <ShowXlogo></ShowXlogo>
      </CSidebarBrand>
      <CSidebarNav className='border-top-0 border pt-4'>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>

      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {dispatch({ type: 'set', sidebarUnfoldable: !unfoldable });SetDynamicLogo()}}
      /> */}
      {/* <div className="under-nav-container">
    <img className="mx-2 w-15" src={require("../assets/images/agentavatar.png")} width={40} height={40}/>
    <div className="d-flex flex-column mx-2 w-70">
      <b className="blacktext">เจ้าหน้าที่</b>
      นายมานะ ขยันดี
      </div>
      <a href="#/water-user-role" className="mx-2 w-15" ><img src={require("../assets/images/exit.png")} width={40} height={40}/></a>

    </div> */}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
