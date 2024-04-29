import { apiUrl } from "../../utils";

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

const checkErrorJson = (res) => {
  if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
    throw Error(res.status);
  }
  return res.json();
};

const catchError = (err) => {
  if (err.message === "401") {
    window.location.href = "/login";
  }
  if (err.message === "404") {
    throw Error(err.message);
  }
};

export const fetchWithResponse = (resource, options) =>
  fetch(`${apiUrl}/${resource}`, options)
    .then(checkErrorJson)
    .catch(catchError);

export const fetchWithoutResponse = (resource, options) =>
  fetch(`${apiUrl}/${resource}`, options).then(checkError).catch(catchError);
