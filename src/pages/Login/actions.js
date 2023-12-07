import { setToken, setUserData } from '../../utils/storage';
import { login, userData } from '../../utils/fetch';
import { updateSyncErrors } from '../../utils/redux-form-actions';
import { LOADING } from './constants';

export function fetchLogin(payload) {
  return async dispatch => {
    dispatch(loadingAction(true));

    try {
      const { data } = await login(payload);
      const dataUser = await userData(`Bearer ${data.token}`);
      setToken(data.token);
      setUserData(dataUser);
      location.href = '/';
      dispatch(loadingAction(false));
    } catch (err) {
      const message = err.code >= 400 && err.code < 500 ? err.message : 'Username atau password yang anda masukkan salah';
      dispatch(updateSyncErrors('login', 'email', message));
      dispatch(loadingAction(false));
    }
  };
}

function loadingAction(isLoading) {
  return { type: LOADING, isLoading };
}
