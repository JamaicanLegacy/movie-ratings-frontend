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
          actors: item.movieActors,
          directors: item.movieDirectors,
          genres: item.movieGenres,
          mediaHouses: item.movieMediaHouses
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

export function deleteMovie(movieId) {
  return fetch(baseUrl + movieId, { method: "DELETE" })
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
  let movieActors = {
    actors: [...movie.actors]
  };
  return fetch(baseUrl + movie.movieId + "/actor", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieActors),
    mode: "cors"
  });
}

export function deleteMovieActor(movieActor) {
  return fetch(baseUrl + movieActor.movieId + "/actor", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieActor),
    mode: "cors"
  });
}

export function saveMovieDirector(movie) {
  let movieDirectors = {
    directors: [...movie.directors]
  };
  return fetch(baseUrl + movie.movieId + "/director", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieDirectors),
    mode: "cors"
  });
}

export function deleteMovieDirector(movieDirector) {
  return fetch(baseUrl + movieDirector.movieId + "/director", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieDirector),
    mode: "cors"
  });
}

export function saveMovieGenre(movie) {
  let movieGenres = {
    genres: [...movie.genres]
  };
  return fetch(baseUrl + movie.movieId + "/genre", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieGenres),
    mode: "cors"
  });
}

export function deleteMovieGenre(movieGenre) {
  return fetch(baseUrl + movieGenre.movieId + "/genre", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieGenre),
    mode: "cors"
  });
}

export function saveMovieMediaHouse(movie) {
  let movieMediaHouse = {
    mediaHouses: [...movie.mediaHouses]
  };
  return fetch(baseUrl + movie.movieId + "/mediaHouse", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieMediaHouse),
    mode: "cors"
  });
}

export function deleteMovieMediaHouse(movieMediaHouse) {
  return fetch(baseUrl + movieMediaHouse.movieId + "/mediaHouse", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(movieMediaHouse),
    mode: "cors"
  });
}
