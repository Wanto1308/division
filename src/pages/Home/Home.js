import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Button from '../../components/elements/Button';
import DataTable from '../../components/elements/DataTable';
import Pagination from '../../components/elements/Pagination';
import { fetchAllDivision, fetchDeleteDivision } from './actions';
import styles from './styles.scoped.css';

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, data, meta } = useSelector(s => s.home);
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams);
  useEffect(() => {
    dispatch(fetchAllDivision({ page: params.page || 1 }));
  }, [params.page]);

  const button = (id) => (
    <section className={styles.button}>
      <Button size="small" to={`/add-division/${id}`} variant="outline">Ubah</Button>
      <Button color="red" onClick={() => dispatch(fetchDeleteDivision(id))} size="small">Hapus</Button>
    </section>
  );

  const column = [
    { heading: 'Nama', value: 'name' },
    { heading: 'Keterangan', value: 'deskripsi' },
    { heading: 'Action', value: ({ id }) => button(id) },
  ];
  return (
    <section className={styles.root}>
      <div>
        <h4>Division</h4>
        <Button isLoading={isLoading.submit} size="small" to={'/add-division'}>Tambah data</Button>
      </div>
      <DataTable column={column} data={data} />
      <Pagination location={location} meta={meta} />
    </section>
  );
}
