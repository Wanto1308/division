import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scoped.css';

export default function DataTable(props) {
  const { className, column, data } = props;
  const classes = [
    styles.root,
    !data.length && styles['not-found'],
    className
  ].filter(Boolean).join(' ');

  return (
    <table className={classes}>
      <thead>
        <tr>
          {column.map((item, idx) => <TableHeader item={item} key={idx} />)}
        </tr>
      </thead>
      <tbody>
        {!data.length ? <tr><td colSpan="100%"><EmptyData/></td></tr>
          : data.map((item, idx) => <TableRow column={column} item={item} key={idx} />)}
      </tbody>
    </table>
  );
}

DataTable.defaultProps = {
  className: '',
  column: [],
  data: [],
};

DataTable.propTypes = {
  className: PropTypes.string,
  column: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.node,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  })),
  data: PropTypes.array,
};

export function TableHeader({ item }) {

  return (
    <th className={styles['table-header']}>{item.heading}</th>
  );
}

TableHeader.defaultProps = {
  item: {},
};

TableHeader.propTypes = {
  item: PropTypes.object,
};

export function TableRow({ column, item }) {
  return (
    <tr>
      {column.map((cItem, cIdx) => {
        const { value } = cItem;
        const newValue = typeof value === 'function' ? value(item) : item[value];
        return (
          <td key={cIdx}>
            {newValue || '-'}
          </td>
        );
      })}
    </tr>
  );
}

TableRow.defaultProps = {
  column: [],
  item: {},
};

TableRow.propTypes = {
  column: PropTypes.array,
  item: PropTypes.object,
};

export function EmptyData() {
  return (
    <figure className={styles['empty-data']}>
      <img alt="data-empty" src="assets/empty-data.svg" />
      <p>Belum ada data apapun</p>
      <p>Belum ada data yang dapat ditampilkan dihalaman ini.</p>
    </figure>
  );
}
