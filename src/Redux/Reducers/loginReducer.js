const INITIAL_STATE = {
  email: '',
};

export const login = (state = INITIAL_STATE, action) => ({
  ...state,
  email: action.payload,
});
