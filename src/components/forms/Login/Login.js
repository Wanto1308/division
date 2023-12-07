import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function Login(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const fieldProps = [
    {
      name: 'username',
      label: 'Username',
      placeholder: 'Masukkan Username',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Masukkan Password',
      icon: showPassword ? 'password-hide' : 'password-show',
      type: showPassword ? 'text' : 'password',
      onClickIcon: () => setShowPassword(!showPassword),
    },
  ];

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      {fieldProps.map((item, key) => (
        <Field
          component={TextField}
          inputProps={{
            icon: item.icon,
            label: item.label,
            placeholder: item.placeholder,
            type: item.type,
          }}
          key={key}
          name={item.name}
          onClickIcon={item.onClickIcon}
        />
      ))
      }
      <Button
        disabled={invalid}
        fixed
        isLoading={isLoading}
        type="submit"
      >Masuk</Button>
    </form>
  );
}

Login.defaultProps = {
  className: '',
  handleSubmit: () => { },
  invalid: true,
};

Login.propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
