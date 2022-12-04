import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  console.log(Layout);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
