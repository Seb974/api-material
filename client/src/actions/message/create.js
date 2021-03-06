import { SubmissionError } from 'redux-form';
import { fetch } from '../../utils/dataAccess';

export function error(error) {
  return { type: 'MESSAGE_CREATE_ERROR', error };
}

export function loading(loading) {
  return { type: 'MESSAGE_CREATE_LOADING', loading };
}

export function success(created) {
  return { type: 'MESSAGE_CREATE_SUCCESS', created };
}

export function create(values) {
  return dispatch => {
    dispatch(loading(true));
    return fetch('messages', { method: 'POST', body: JSON.stringify(values) })
      .then(response => {
        dispatch(loading(false));
        document.getElementById('message_name').value = "";
        document.getElementById('message_email').value = "";
        document.getElementById('message_message').value = "";
        return response.json();
      })
      .then(retrieved => dispatch(success(retrieved)))
      .catch(e => {
        dispatch(loading(false));

        if (e instanceof SubmissionError) {
          dispatch(error(e.errors._error));
          throw e;
        }

        dispatch(error(e.message));
      });
  };
}

export function reset() {
  return dispatch => {
    dispatch(loading(false));
    dispatch(error(null));
  };
}
