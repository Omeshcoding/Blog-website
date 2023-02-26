import React from 'react';
import Header from './Header';
import CreatedBy from './CreatedBy';
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <CreatedBy />
    </>
  );
};
export default Layout;
