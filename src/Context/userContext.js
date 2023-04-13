import { useReducer } from "react";
import React from "react";
import { Api } from "../api";
import Cookies from "js-cookie";

const ADD_USER = "ADD_USER";
const REMOVE_USER = "REMOVE_USER";
const ADD_TOKEN = "ADD_TOKEN";
const REMOVE_TOKEN = "REMOVE_TOKEN";

const intialState = {
  userInfo: null,
  loading: false,
  err: null,
  token: Cookies.get("admin-token"),
};

const UserContext = React.createContext(intialState);

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, userInfo: action.payload };
    case REMOVE_USER:
      return { ...state, userInfo: action.payload };
    case ADD_TOKEN:
      console.log("From add token reducer--->", action.payload);
      return { ...state, token: action.payload };
    case REMOVE_TOKEN:
      return { ...state, token: undefined };
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

const addToken = (dispatch) => {
  return (token) => {
    console.log("token from context--->", token);
    dispatch({ type: ADD_TOKEN, payload: Cookies.get("admin-token") });
  };
};

const removeToken = (dispatch) => {
  return () => {
    dispatch({ type: REMOVE_TOKEN });
  };
};

const actions = { addUser, addToken, removeToken };

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
