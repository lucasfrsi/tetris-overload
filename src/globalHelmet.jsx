import React from 'react';
import Helmet from 'react-helmet';

import favicon from 'assets/favicon.png';

const GlobalHelmet = () => (
  <Helmet>
    {/* Favicon */}
    <link rel="icon" href={favicon} />
    {/* Fonts */}
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" />
  </Helmet>
);

export default GlobalHelmet;
