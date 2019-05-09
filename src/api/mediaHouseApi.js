import { handleResponse, handleError, createSlug } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/mediahouses/";

export function getMediaHouses() {
  return fetch(baseUrl)
    .then(handleResponse)
    .then(data => {
      return data.map(item => {
        let mediaHouse = {
          mediaHouseId: item.mediaHouseId,
          name: item.name
        };
        mediaHouse.slug = createSlug(mediaHouse.name);
        return mediaHouse;
      });
    })
    .catch(handleError);
}

export function saveMediaHouse(mediaHouse) {
  return fetch(baseUrl + (mediaHouse.mediaHouseId || ""), {
    method: mediaHouse.mediaHouseId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(mediaHouse),
    mode: "cors"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMediaHouse(mediaHouseid) {
  return fetch(baseUrl + mediaHouseid, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
