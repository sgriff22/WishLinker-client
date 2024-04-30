import { getToken } from "../../utils";
import { fetchWithResponse } from "./fetcher";

export function getCurrentUserProfile() {
  return fetchWithResponse("profile", {
    headers: {
      Authorization: getToken(),
    },
  });
}
