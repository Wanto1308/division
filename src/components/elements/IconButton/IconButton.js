import React from 'react';
import PropTypes from 'prop-types';
import { autoPx } from '../../../utils/unit';
import styles from './styles.scoped.css';

export default function IconButton(props) {
  const { className, children, disabled, icon, onClick, size } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');
  const newSize = autoPx(size);
  const style = { height: newSize, width: newSize };

  return (
    <button className={classes} disabled={disabled} onClick={onClick} style={style} type="button">
      {icon ? <img alt={icon} src={`/assets/ic-${icon}.svg`} /> : children}
    </button>
  );
}

IconButton.defaultProps = {
  children: null,
  className: '',
  disabled: false,
  icon: '',
  onClick: () => { },
  size: 24,
};

IconButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
};
