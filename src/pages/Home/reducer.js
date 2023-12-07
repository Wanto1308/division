import { DATA_FETCHED, FAILED, LOADING } from './constants';

const initialState = {
  message: '',
  isLoading: {
    data: true,
    submit: false,
  },
  data: [],
  meta: {},
};

export default function reducer(state = initialState, action = {}) {
  const { data, isLoading, key, message, meta, type } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, [key]: isLoading },
      };
    case DATA_FETCHED:
      return {
        ...state,
        data,
        meta,
        isLoading: { ...state.isLoading, data: false },
      };
    case FAILED:
      return {
        ...state,
        message,
        isLoading: { ...state.isLoading, submit: false  },
      };
    default:
      return state;
  }
}
