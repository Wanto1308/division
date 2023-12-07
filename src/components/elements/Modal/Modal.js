import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../../contexts';
import styles from './styles.scoped.css';

export default function Modal(props) {
  const { setModal, setOnCloseModal } = useContext(AppContext);
  const { open, className, children, onClose } = props;

  useEffect(() => () => setModal(null), []);

  useEffect(() => {
    setModal(open ? <Content children={children} className={className} onClose={onClose} /> : null);
    open && setOnCloseModal(() => onClose);
  }, [open]);

  useEffect(() => {
    open && setOnCloseModal(() => onClose);
  }, [onClose]);

  useEffect(() => {
    open && setModal(<Content children={children} className={className} onClose={onClose} />);
  }, [children, className]);

  return null;
}

Modal.defaultProps = {
  children: null,
  className: '',
  onClose: () => { },
  open: false,
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export function Content({ className, children, onClose }) {
  const customClass = [styles.root, className].filter(Boolean).join(' ');

  return (
    <section className={customClass}>
      <img alt="close" onClick={onClose} src="/assets/ic-close.svg" />
      {children}
    </section>
  );
}

Content.defaultProps = {
  children: null,
  className: '',
  onClose: null,
};

Content.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
};
