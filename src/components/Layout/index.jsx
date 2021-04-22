import React from 'react';
import PropTypes from 'prop-types';

import * as styles from './style';

const Layout = ({ children }) => (
  <div css={styles.layout}>
    {children}
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
