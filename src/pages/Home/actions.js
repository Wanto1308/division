import { push } from 'react-router-redux';
import { allDivision, submitDivision, updateDivision, deleteDivision } from '../../utils/fetch';
import { DATA_FETCHED, FAILED, LOADING } from './constants';

export function fetchAllDivision(params) {
  return async dispatch => {
    dispatch(loadingAction(true, 'data'));

    try {
      const { data, meta } = await allDivision(params);
      dispatch(dataFetchedAction(data, meta));
      dispatch(loadingAction(false, 'data'));
    } catch (err) {
      dispatch(loadingAction(false, 'data'));
    }
  };
}

export function fetchSubmitDivision(data) {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));

    try {
      await submitDivision(data);
      dispatch(failedAction(''));
      dispatch(push('/'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchUpdateDivision(data, id) {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));

    try {
      await updateDivision(data, id);
      dispatch(failedAction(''));
      dispatch(push('/'));
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

export function fetchDeleteDivision(id) {
  return async dispatch => {
    dispatch(loadingAction(true, 'submit'));

    try {
      await deleteDivision(id);
      dispatch(failedAction(''));
      dispatch(fetchAllDivision());
    } catch (err) {
      dispatch(failedAction(err.message));
    }
  };
}

function dataFetchedAction(data, meta) {
  return { type: DATA_FETCHED, data, meta };
}

function failedAction(message) {
  return { type: FAILED, message };
}

function loadingAction(isLoading, key) {
  return { type: LOADING, isLoading, key };
}
