import { getToken } from "../../utils";
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher";

export function createPin(pin) {
  return fetchWithResponse("pins", {
    method: "POST",
    headers: {
      Authorization: getToken(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pin),
  });
}

export function deletePin(pinId) {
  return fetchWithoutResponse(`pins/${pinId}`, {
    method: "DELETE",
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getUsersPins() {
  return fetchWithResponse(`pins`, {
    headers: {
      Authorization: getToken(),
    },
  });
}
