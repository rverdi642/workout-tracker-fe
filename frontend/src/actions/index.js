import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGIN_START = "LOGIN_START";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL";
export const SIGNUP_START = "SIGNUP_START";

export const FETCHING = 'FETCHING'
export const FETCHING_SUCCESS = 'FETCHING_SUCCESS'
export const FETCHING_FAILED = 'FETCHING_FAILED'

export const FETCHING_ROUTINES = 'FETCHING_ROUTINES'
export const FETCHING_ROUTINES_SUCCESS = 'FETCHING_ROUTINES_SUCCESS'
export const FETCHING_ROUTINES_FAILED = 'FETCHING_ROUTINES_FAILED'

export const getUser = () => dispatch => {
    dispatch({ type: FETCHING })
    axios
      .get('https://firstrep.herokuapp.com/api/members')
      .then(response => {
        dispatch({ type: FETCHING_SUCCESS, payload: response.data})
      })
      .catch(err => {
        dispatch({ type: FETCHING_FAILED, payload: err.response })
      })
}

export const getRoutines = () => dispatch => {
  dispatch({ type: FETCHING_ROUTINES })
  axios
    .get('https://firstrep.herokuapp.com/api/routines')
    .then(response => {
      dispatch({ type: FETCHING_ROUTINES_SUCCESS, payload: response.data})
    })
    .catch(err => {
      dispatch({ type: FETCHING_ROUTINES_FAILED, payload: err.response })
    })
}

export const signUp = input => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axios
    .post(`https://firstrep.herokuapp.com/api/members`, input)
    .then(res => {
      console.log("User successfully added to database");
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    })
    .catch(err => {
      if (err.status === "Error") {
        localStorage.removeItem("token");
      }
      dispatch({ type: SIGNUP_FAIL, payload: err.message });
    });
};

export const login = input => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post(`https://firstrep.herokuapp.com/api/members/login`, input)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(err => {
      if (err.status === "Error") {
        localStorage.removeItem("token");
      }
      dispatch({ type: LOGIN_FAIL, payload: err.message });
    });
};
