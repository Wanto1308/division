import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function PageBase(props) {
  const { children } = props;
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

PageBase.defaultProps = {
  children: null
};

PageBase.propTypes = {
  children: PropTypes.node
};
