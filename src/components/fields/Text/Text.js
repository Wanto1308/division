import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../elements/IconButton';
import styles from './styles.scoped.css';

export default function Text(props) {
  const { className, input, inputProps, onClickIcon, meta } = props;
  const { active, dirty, error, touched, asyncValidating } = meta;
  const classes = [
    styles.root,
    active && styles.focus,
    inputProps.required && styles.required,
    !!error && (dirty || touched) && styles.error,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <label htmlFor={input.name}>
        {inputProps.label}
        {inputProps.required && <span>*</span>}
      </label>
      <input id={input.name} {...input} {...inputProps} />
      {inputProps.icon && (<IconButton disabled={inputProps.disabled} icon={inputProps.icon}
        onClick={onClickIcon} size={20}/>)}
      {!!error && (dirty || touched) && <small>{error}</small>}
      {asyncValidating && <small>Sedang Mengecek...</small>}
    </div>
  );
}

Text.defaultProps = {
  className: '',
  input: {},
  inputProps: {},
  meta: {},
  onClickIcon: () => {},
};

Text.propTypes = {
  className: PropTypes.string,
  input: PropTypes.object,
  inputProps: PropTypes.object,
  meta: PropTypes.object,
  onClickIcon: PropTypes.func,
};
