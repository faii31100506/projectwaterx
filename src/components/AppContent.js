import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import '../views/waterx/waterx.css';
// routes config
import routes from '../routes';
import Login from '../../src/views/pages/login/Login';
// import { useUser } from '../views/pages/login/UserContext';

const AppContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color='primary' />}>
        {/* <useUser> */}
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          {/* <Route
              path='/'
              element={<Navigate to='/water-register/' replace />}
            /> */}
          <Route path='/' element={<Navigate to='/login/' replace />} />
        </Routes>
        {/* </useUser> */}
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
