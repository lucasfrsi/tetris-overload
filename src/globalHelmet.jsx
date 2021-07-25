import React from 'react';
import Helmet from 'react-helmet';

import favicon from 'assets/favicon.png';

const GlobalHelmet = () => (
  <Helmet>
    <meta name="author" content="Lucas Ferraresi Simoni" />
    <meta name="description" content="A Tetris based game, made with React." />
    <link rel="icon" href={favicon} />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" />
  </Helmet>
);

export default GlobalHelmet;
