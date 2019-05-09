import { handleResponse, handleError, createSlug } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/directors/";

export function getDirectors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .then(data => {
      return data.map(item => {
        let director = {
          directorId: item.directorId,
          firstName: item.firstName,
          lastName: item.lastName,
          industryStartDate: item.industryStartDate,
          retirementDate: item.retirementDate,
          active: item.active,
          gender: item.gender
        };
        director.slug = createSlug(director.firstName + director.lastName);
        return director;
      });
    })
    .catch(handleError);
}

export function saveDirector(director) {
  return fetch(baseUrl + (director.directorId || ""), {
    method: director.directorId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(director)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteDirector(directorId) {
  return fetch(baseUrl + directorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
