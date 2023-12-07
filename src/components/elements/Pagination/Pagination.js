import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'querystring';
import styles from './styles.scoped.css';

export default function Pagination(props) {
  const { className, meta, location } = props;
  const { current_page, last_page, total } = meta;
  const classes = [styles.root, className].filter(Boolean).join(' ');
  const toPrevPage = { page: current_page ? (current_page - 1) : 1 };
  const toNextPage = { page: current_page ? (current_page + 1) : 2 };

  if (!Object.keys(meta).length || !total) {
    return null;
  }

  return (
    <section className={classes}>
      <IconArrow
        disabled={current_page <= 1}
        icon="../../../assets/ic-arrow-left.svg"
        location={location}
        title="Prev Page"
        to={toPrevPage}
      />
      <PageNumber location={location} meta={meta} />
      <IconArrow
        disabled={current_page >= last_page}
        icon="../../../assets/ic-arrow-right.svg"
        location={location}
        title="Next Page"
        to={toNextPage}
      />
    </section>
  );
}

Pagination.defaultProps = {
  className: '',
  location: {},
  meta: {},
};

Pagination.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object,
  meta: PropTypes.object,
};

export function IconArrow({ disabled, title, icon, to, location }) {
  return (
    <Link className={styles.icon} disabled={disabled} to={getLink(to, location)}>
      <img alt={title} src={icon} title={title} />
    </Link>
  );
}

IconArrow.defaultProps = {
  disabled: false,
  icon: '',
  location: {},
  title: '',
  to: {},
};

IconArrow.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  location: PropTypes.object,
  title: PropTypes.string,
  to: PropTypes.object,
};

export function PageNumber({ meta, location }) {
  const { current_page, last_page } = meta;
  const length = last_page > 7 ? 7 : last_page;
  const mainPages = [...Array.from({ length }).keys()].map(i => {
    if (last_page <= 7 || current_page === 1) {
      return i + 1;
    }
    if (current_page === last_page || current_page >= last_page - 6) {
      return last_page - (6 - i);
    }
    return current_page + i - 1;
  });
  const leftPages = last_page > 7 && mainPages[0] - 1 > 1 ? [1, '...'] : [];
  const rightPages = last_page > 7 && last_page - mainPages[6] > 1 ? ['...', last_page] : [];
  const pages = leftPages.concat(mainPages, rightPages);
  return (
    pages.map((item, key) => {
      const activePage = current_page === item && styles.active;
      const pageClasses = [styles['page-number'], activePage].filter(Boolean).join(' ');
      const disabled = typeof item !== 'number';
      const params = { page: item, };

      return (
        <Link className={pageClasses} disabled={disabled} key={key} to={getLink(params, location)}>
          {item}
        </Link>
      );
    })
  );
}

PageNumber.defaultProps = {
  location: {},
  meta: {}
};

PageNumber.propTypes = {
  location: PropTypes.object,
  meta: PropTypes.object
};

export function getLink(params, location) {
  const parsedQuery = queryString.parse(location.search.replace('?', ''));

  return {
    pathname: location.pathname,
    search: `?${queryString.stringify({ ...parsedQuery, ...params })}`
  };
}
