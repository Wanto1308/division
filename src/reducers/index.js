import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import login from '../pages/Login/reducer';
import home from '../pages/Home/reducer'

const rootReducer = combineReducers({
  form: formReducer,
  home,
  login,
  routing: routerReducer,
});

export default rootReducer;
