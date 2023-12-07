import { reduxForm } from 'redux-form';
import Component from './Division';
import validate from './validate';

export default reduxForm({
  form: 'division',
  initialValues: {
    name: '',
  },
  validate,
})(Component);
