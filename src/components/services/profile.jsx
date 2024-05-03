import { getToken } from "../../utils";
import { fetchWithResponse } from "./fetcher";

export function getCurrentUserProfile() {
  return fetchWithResponse("profile", {
    headers: {
      Authorization: getToken(),
    },
  });
}

export function getProfileByUserId(userId) {
  return fetchWithResponse(`profile/${userId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
}
