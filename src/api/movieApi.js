import { handleResponse, handleError, createSlug } from "./apiUtils";
const baseUrl = process.env.API_URL + "/api/movies/";

export function getMovies() {
  return fetch(baseUrl)
    .then(handleResponse)
    .then(data => {
      return data.map(item => {
        let movie = {
          movieId: item.movieId,
          title: item.title,
          description: item.description,
          price: item.price,
          imgThumbnailUrl: item.imgThumbnailUrl,
          releaseDate: item.releaseDate,
          actors: []
        };
        movie.slug = createSlug(movie.title);
        return movie;
      });
    })
    .catch(handleError);
}
export function saveMovie(movie) {
  return fetch(baseUrl + (movie.movieId || ""), {
    method: movie.movieId ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movie),
    mode: "cors"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteMovie(movie) {
  return fetch(baseUrl + movie.movieId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}

export function getMovieActor(movie) {
  return fetch(baseUrl + movie.movieId + "/actor")
    .then(handleResponse)
    .then(data => {
      return data.map(item => {
        let movieActor = {
          movieId: item.movieId,
          actorId: item.actorId
        };
        return movieActor;
      });
    })
    .catch(handleError);
}

export function saveMovieActor(movie) {
  return fetch(baseUrl + movie.movieId + "/actor", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movie.actors),
    mode: "cors"
  });
}

export function saveMovieDirectors(movie, director) {
  let movieDirector = { movieId: movie.movieId, directorId: director.actorId };
  return fetch(baseUrl + movieDirector.movieId + "/director", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieDirector),
    mode: "cors"
  });
}

export function savemovieGenre(movie, genre) {
  let movieGenre = { movieId: movie.movieId, genreId: genre.actorId };
  return fetch(baseUrl + movieGenre.movieId + "/gerne", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieGenre),
    mode: "cors"
  });
}

export function saveMovieMediaHouse(movie, mediaHouse) {
  let movieMediaHouse = {
    movieId: movie.movieId,
    mediaHouseId: mediaHouse.actorId
  };
  return fetch(baseUrl + movieMediaHouse.movieId + "/mediaHouse", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieMediaHouse),
    mode: "cors"
  });
}
