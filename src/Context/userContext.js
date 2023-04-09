import { useReducer } from "react";
import React from "react";
import { Api } from "../api";

const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";

const intialState = { userInfo: null, loading: false, err: null };

const UserContext = React.createContext(intialState);

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, userInfo: action.payload };
    case REMOVE_USER:
      return { ...state, userInfo: action.payload };
    default:
      return { ...state };
  }
};

const addUser = (dispatch) => {
  return async () => {
    try {
      const response = await Api.get("/user/me");
      console.log("from adduser action--->", response.data);
      dispatch({ type: ADD_USER, payload: response.data });
    } catch (err) {
    } finally {
    }
  };
};

const actions = { addUser };

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const boundedActions = {};
  console.log("FRom context--->", typeof actions.addUser);

  Object.keys(actions).forEach((action) => {
    // console.log("From context-->", actions[action]);
    boundedActions[action] = actions[action](dispatch);
  });
  console.log(boundedActions);

  return (
    <UserContext.Provider value={{ state, ...boundedActions }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
