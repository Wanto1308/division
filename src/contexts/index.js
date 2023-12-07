import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserData } from '../utils/storage';

export const AppContext = createContext({});

export default function AppContextProvider({ children }) {
  const [modal, setModal] = useState(null);
  const [onCloseModal, setOnCloseModal] = useState(() => () => { });
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = !!getUserData();
  const value = {
    setModal,
    setOnCloseModal
  };

  const closeModal = e => {
    e.target === e.currentTarget && onCloseModal();
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    modal ? body.classList.add('modal-open') : body.classList.remove('modal-open');
  }, [!!modal]);

  useEffect(() => {
    document.getElementsByTagName('html')[0].scrollTo(0, 0);
    setModal(null);
  }, [pathname]);

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="modal" onClick={closeModal}>{modal}</div>
    </AppContext.Provider>
  );
}

AppContextProvider.defaultProps = {
  children: null,
};

AppContextProvider.propTypes = {
  children: PropTypes.node,
};
