import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../../components/forms/Login';
import { fetchLogin } from './actions';
import styles from './styles.scoped.css';

export default function Login() {
  const dispatch = useDispatch();

  return (
    <main className={styles.root}>
      <section>
        <LoginForm onSubmit={values => dispatch(fetchLogin(values))} />
      </section>
    </main>
  );
}
