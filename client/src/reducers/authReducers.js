import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  available_classes: [],
  classes_taken: [],
  requested_classes: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      console.log(action);
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        available_classes: action.available_classes,
        classes_taken: action.classes_taken,
        requested_classes: action.requested_classes,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
