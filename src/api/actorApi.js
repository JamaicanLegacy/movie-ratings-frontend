import { handleResponse, handleError, createSlug } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/actors/";

export function getActors() {
  return fetch(baseUrl)
    .then(handleResponse)
    .then(data => {
      return data.map(item => {
        let actor = {
          actorId: item.actorId,
          firstName: item.firstName,
          lastName: item.lastName,
          industryStartDate: item.industryStartDate,
          retirementDate: item.retirementDate,
          active: item.active,
          gender: item.gender
        };
        actor.slug = createSlug(actor.firstName + actor.lastName);
        return actor;
      });
    })
    .catch(handleError);
}

export function saveActor(actor) {
  return fetch(baseUrl + (actor.actorId || ""), {
    method: actor.actorId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(actor),
    mode: "cors"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteActor(actorid) {
  return fetch(baseUrl + actorid, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
