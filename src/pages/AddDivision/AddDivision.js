import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DivisionForm from '../../components/forms/Division';
import { fetchSubmitDivision, fetchUpdateDivision } from '../Home/actions';
import styles from './styles.scoped.css';

export default function Home() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { message } = useSelector(s => s.home);

  const submit = (v) => {
    dispatch(id ? fetchUpdateDivision(v, id) : fetchSubmitDivision(v));
  };

  return (
    <section className={styles.root}>
      <DivisionForm onSubmit={submit} />
      <small>{message}</small>
    </section>
  );
}
