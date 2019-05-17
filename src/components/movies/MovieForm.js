import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const MovieForm = ({
  movie,
  actors,
  directors,
  genres,
  mediaHouses,
  onSave,
  onChange,
  saving = false,
  onUpdateActors,
  onUpdateDirectors,
  onUpdateGenres,
  onUpdateMediaHouses,
  onDeleteDirector,
  onDeleteActor,
  onDeleteGenre,
  onDeleteMediaHouse,
  errors = {}
}) => {
  let addMovieActor = actor => {
    onUpdateActors(actor);
  };
  let addMovieDirector = director => {
    onUpdateDirectors(director);
  };
  let addMovieGenre = genre => {
    onUpdateGenres(genre);
  };
  let addMovieMediaHouse = mediaHouse => {
    onUpdateMediaHouses(mediaHouse);
  };
  let removeMovieGenre = (genre, genreName) => {
    let result = confirm("Are you sure you want to Delete " + genreName + "?");
    if (result) {
      onDeleteGenre(genre);
    }
  };
  let removeMovieActor = (actor, actorName) => {
    let result = confirm("Are you sure you want to Delete " + actorName + "?");
    if (result) {
      onDeleteActor(actor);
    }
  };
  let removeMovieDirector = (director, directorName) => {
    let result = confirm(
      "Are you sure you want to Delete " + directorName + "?"
    );
    if (result) {
      onDeleteDirector(director);
    }
  };
  let removeMovieMediaHouse = (mediaHouse, mediaHouseName) => {
    let result = confirm(
      "Are you sure you want to Delete " + mediaHouseName + "?"
    );
    if (result) {
      onDeleteMediaHouse(mediaHouse);
    }
  };
  const state = window.store.getState();
  return (
    <form onSubmit={onSave}>
      <h2>{state.selectedMovie.movieId ? "Edit" : "Add"} Movie</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        value={movie.title}
        onChange={onChange}
        error={errors.title}
      />
      <div className="form-group">
        <label>Release Date</label>
        <div className="field">
          <input
            type="date"
            name="releaseDate"
            label="Release Date"
            value={movie.releaseDate}
            onChange={onChange}
            error={errors.releaseDate}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Price</label>
        <div className="field">
          <input
            type="number"
            name="price"
            min={0}
            step={0.1}
            precision={2}
            value={movie.price}
            onChange={onChange}
            error={errors.price}
          />
        </div>
      </div>
      <TextInput
        name="description"
        label="Description"
        value={movie.description}
        onChange={onChange}
        error={errors.description}
      />
      {/*need to create and upload for this*/}
      <div>
        <div>
          <img
            src={movie.imgThumbnailUrl}
            style={{ width: "200px", height: "280px" }}
          />
        </div>
        <TextInput
          name="imgThumbnailUrl"
          label="Image"
          value={movie.imgThumbnailUrl}
          onChange={onChange}
          error={errors.imgThumbnailUrl}
        />

        {/* <input
          type="file"
          name="imgThumbnailUrl"
          label="Image"
          accept="image/*"
          //value={movie.imgThumbnailUrl}
          onChange={onChange}
          error={errors.imgThumbnailUrl}
        /> */}
      </div>
      {state.selectedMovie.movieId ? (
        <table className="table">
          <thead>
            <tr>
              <th>
                <div className="input-group">
                  <div>Actors</div>
                  <div style={{ paddingLeft: "20px" }}>
                    <button
                      type="button"
                      onClick={() => addMovieActor({ actorId: 0 })}
                      className="small"
                    >
                      Add a Actor
                    </button>
                  </div>
                </div>
              </th>
              <th>
                <div className="input-group">
                  <div>Directors</div>
                  <div style={{ paddingLeft: "20px" }}>
                    <button
                      type="button"
                      onClick={() => addMovieDirector({ directorId: 0 })}
                      className="small"
                    >
                      Add a Director
                    </button>
                  </div>
                </div>
              </th>
              <th>
                <div className="input-group">
                  <div>Genres</div>
                  <div style={{ paddingLeft: "20px" }}>
                    <button
                      type="button"
                      onClick={() => addMovieGenre({ genreId: 0 })}
                      className="small"
                    >
                      Add a Genre
                    </button>
                  </div>
                </div>
              </th>
              <th>
                <div className="input-group">
                  <div>Media Houses</div>
                  <div style={{ paddingLeft: "20px" }}>
                    <button
                      type="button"
                      onClick={() => addMovieMediaHouse({ mediaHouseId: 0 })}
                      className="small"
                    >
                      Add a Media House
                    </button>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {state.selectedMovie.actors.map((item, index) => {
                  var selectedActor;
                  item.actorId > 0
                    ? actors.map(actor => {
                        if (item.actorId === actor.actorId) {
                          selectedActor =
                            actor.firstName + " " + actor.lastName;
                        }
                      })
                    : (selectedActor = "Select Actor");
                  return item.movieId ? (
                    <div className="input-group" key={index}>
                      <div
                        style={{
                          width: "150px",
                          paddingRight: "5px",
                          paddingBottom: "5px"
                        }}
                      >
                        {selectedActor}
                      </div>
                      <button
                        style={{
                          float: "right",
                          height: "1.5em",
                          lineHeight: "1px",
                          paddingLeft: "10px"
                        }}
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => removeMovieActor(item, selectedActor)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="input-group" key={index}>
                      <SelectInput
                        name="actorId"
                        // label="Actor"
                        key={index}
                        defaultOption={selectedActor}
                        options={actors.map(actor => ({
                          value: actor.actorId,
                          text: actor.firstName + " " + actor.lastName
                        }))}
                        // value={item.actorId}
                        onChange={event => onChange(event, index)}
                        error={errors.actor}
                      />

                      <div style={{ paddingLeft: "40px" }}>
                        <button
                          style={{
                            float: "right",
                            paddingLeft: "10px",
                            height: "1.5em",
                            lineHeight: "1px"
                          }}
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => removeMovieActor(item, selectedActor)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </td>
              <td>
                {state.selectedMovie.directors.map((item, index) => {
                  var selectedDirector;
                  item.directorId > 0
                    ? directors.map(director => {
                        if (item.directorId === director.directorId) {
                          selectedDirector =
                            director.firstName + " " + director.lastName;
                        }
                      })
                    : (selectedDirector = "Select Director");
                  return item.movieId ? (
                    <div className="input-group" key={index}>
                      <div
                        style={{
                          width: "150px",
                          paddingRight: "5px",
                          paddingBottom: "5px"
                        }}
                      >
                        {selectedDirector}
                      </div>
                      <button
                        style={{
                          float: "right",
                          height: "1.5em",
                          lineHeight: "1px",
                          paddingLeft: "10px"
                        }}
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() =>
                          removeMovieDirector(item, selectedDirector)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="input-group" key={index}>
                      <SelectInput
                        name="directorId"
                        // label="Director"
                        key={index}
                        defaultOption={selectedDirector}
                        options={directors.map(director => ({
                          value: director.directorId,
                          text: director.firstName + " " + director.lastName
                        }))}
                        // value={item.actorId}
                        onChange={event => onChange(event, index)}
                        error={errors.director}
                      />
                      <div style={{ paddingLeft: "5px" }}>
                        <button
                          style={{
                            float: "right",
                            paddingLeft: "10px",
                            height: "1.5em",
                            lineHeight: "1px"
                          }}
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() =>
                            removeMovieDirector(item, selectedDirector)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </td>

              <td>
                {state.selectedMovie.genres.map((item, index) => {
                  var selectedGenre;
                  item.genreId > 0
                    ? genres.map(genre => {
                        if (item.genreId === genre.genreId) {
                          selectedGenre = genre.name;
                        }
                      })
                    : (selectedGenre = "Select Genre");
                  return item.movieId ? (
                    <div className="input-group" key={index}>
                      <div
                        style={{
                          width: "150px",
                          paddingRight: "5px",
                          paddingBottom: "5px"
                        }}
                      >
                        {selectedGenre}
                      </div>
                      <button
                        style={{
                          float: "right",
                          height: "1.5em",
                          lineHeight: "1px",
                          paddingLeft: "10px"
                        }}
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => removeMovieGenre(item, selectedGenre)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="input-group" key={index}>
                      <SelectInput
                        name="genreId"
                        // label="Genre"
                        key={index}
                        defaultOption={selectedGenre}
                        options={genres.map(genre => ({
                          value: genre.genreId,
                          text: genre.name
                        }))}
                        // value={item.actorId}
                        onChange={event => onChange(event, index)}
                        error={errors.genre}
                      />
                      <div style={{ paddingLeft: "37px" }}>
                        <button
                          style={{
                            float: "right",
                            paddingLeft: "10px",
                            height: "1.5em",
                            lineHeight: "1px"
                          }}
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => removeMovieGenre(item, selectedGenre)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </td>
              <td>
                {state.selectedMovie.mediaHouses.map((item, index) => {
                  var selectedMediaHouse;
                  item.mediaHouseId > 0
                    ? mediaHouses.map(mediaHouse => {
                        if (item.mediaHouseId === mediaHouse.mediaHouseId) {
                          selectedMediaHouse = mediaHouse.name;
                        }
                      })
                    : (selectedMediaHouse = "Select Media House");
                  return item.movieId ? (
                    <div className="input-group" key={index}>
                      <div
                        style={{
                          width: "205px",
                          paddingRight: "5px",
                          paddingBottom: "5px"
                        }}
                      >
                        {selectedMediaHouse}
                      </div>
                      <button
                        style={{
                          float: "right",
                          height: "1.5em",
                          lineHeight: "1px",
                          paddingLeft: "10px"
                        }}
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() =>
                          removeMovieMediaHouse(item, selectedMediaHouse)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div className="input-group" key={index}>
                      <SelectInput
                        name="mediaHouseId"
                        // label="Media House"
                        key={index}
                        defaultOption={selectedMediaHouse}
                        options={mediaHouses.map(mediaHouse => ({
                          value: mediaHouse.mediaHouseId,
                          text: mediaHouse.name
                        }))}
                        // value={item.actorId}
                        onChange={event => onChange(event, index)}
                        error={errors.mediaHouse}
                      />
                      <div style={{ paddingLeft: "5px" }}>
                        <button
                          style={{
                            float: "right",
                            paddingLeft: "10px",
                            height: "1.5em",
                            lineHeight: "1px"
                          }}
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() =>
                            removeMovieMediaHouse(item, selectedMediaHouse)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      ) : null}
      <div>
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

MovieForm.propTypes = {
  movie: PropTypes.object.isRequired,
  actors: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  directors: PropTypes.array.isRequired,
  mediaHouses: PropTypes.array.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdateActors: PropTypes.func.isRequired,
  onDeleteActor: PropTypes.func.isRequired,
  onUpdateDirectors: PropTypes.func.isRequired,
  onDeleteDirector: PropTypes.func.isRequired,
  onUpdateGenres: PropTypes.func.isRequired,
  onDeleteGenre: PropTypes.func.isRequired,
  onUpdateMediaHouses: PropTypes.func.isRequired,
  onDeleteMediaHouse: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default MovieForm;
