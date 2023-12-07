import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function Division(props) {
  const { handleSubmit, invalid } = props;
  const { isLoading } = useSelector(s => s.home);

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field
        component={TextField}
        inputProps={{
          label: 'Nama',
          placeholder: 'Masukan Nama',
          type: 'text',
        }}
        name="name"
      />
      <Button
        disabled={invalid}
        fixed
        isLoading={isLoading.submit}
        type="submit"
      >Submit</Button>
    </form>
  );
}

Division.defaultProps = {
  handleSubmit: () => { },
  invalid: true,
};

Division.propTypes = {
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};
