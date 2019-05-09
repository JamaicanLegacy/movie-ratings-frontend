import { handleResponse, handleError, createSlug } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/genres/";

export function getGenres() {
  return fetch(baseUrl)
    .then(handleResponse)
    .then(data => {
      return data.map(item => {
        let genre = {
          genreId: item.genreId,
          name: item.name,
          description: item.description
        };
        genre.slug = createSlug(genre.name);
        return genre;
      });
    })
    .catch(handleError);
}

export function saveGenre(genre) {
  return fetch(baseUrl + (genre.genreId || ""), {
    method: genre.genreId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(genre),
    mode: "cors"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteGenre(genreid) {
  return fetch(baseUrl + genreid, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
