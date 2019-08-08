import { apiUrl } from "../config/config";
import http from "./http";

let url = apiUrl + "/movies";
export function getMovies() {
  return http.get(url);
}

export function deleteMovie(movieId) {
  return http.delete(url + "/" + movieId);
}
