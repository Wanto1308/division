import { LOADING } from './constants';

const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, isLoading } = action;

  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
}
