import { logout } from '../../../utils/fetch';
import { clearStorages } from '../../../utils/storage';
import { LOADING } from './constants';

export function fetchLogout() {
  return async dispatch => {
    dispatch(loadingAction(true));

    try {
      await logout();
      dispatch(loadingAction(false));
      location.href = '/';
      clearStorages();
    } catch (err) {
      dispatch(loadingAction(false));
    }
  };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
