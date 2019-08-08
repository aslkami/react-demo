import { apiUrl } from "../config/config";
import http from "./http";

let url = apiUrl + "/genres";
export function getGenres() {
  return http.get(url);
}
