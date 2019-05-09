import React, { useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

const MovieForm = ({
  movie,
  actors,
  onSave,
  onChange,
  saving = false,
  onUpdateActors,
  errors = {}
}) => {
  // const { selectedMovie, setState } = useState(props.movie);
  // console.log("selectedmovie", selectedMovie);

  let addMovieActor = actor => {
    // let movieActor = { movieId: movie.movieId, actorId: movieActorId };
    //  movie.actors.push({ actorId: "" });
    // setSelectedMovie({
    //   ...selectedMovie,
    //   actors: [...selectedMovie.actors, { ...actor }]
    // });
    // let length = state.selectedMovie.actors.length;
    //  > 0
    //   ? state.selectedMovie.actors.length -1
    //   : state.selectedMovie.actors.length
    // console.log(length);
    onUpdateActors(actor);
    // addDummyActors(actor);
    // state.selectedMovie.actors.push(actor);
  };
  const state = window.store.getState();
  return (
    <form onSubmit={onSave}>
      <h2>{movie.movieId ? "Edit" : "Add"} Movie</h2>
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
      <TextInput
        name="imgThumbnailUrl"
        label="Image"
        value={movie.imgThumbnailUrl}
        onChange={onChange}
        error={errors.imgThumbnailUrl}
      />

      {state.selectedMovie.movieId ? (
        <>
          <button
            type="button"
            onClick={() => addMovieActor({ actorId: 0 })}
            className="small"
          >
            Add Actor
          </button>
          {state.selectedMovie.actors.map((item, index) => {
            return (
              <div key={index}>
                <SelectInput
                  name="actorId"
                  label="Actor"
                  key={index}
                  defaultOption="Select Actor"
                  options={actors.map(actor => ({
                    value: actor.actorId,
                    text: actor.firstName + " " + actor.lastName
                  }))}
                  // value={item.actorId}
                  onChange={event => onChange(event, index)}
                  error={errors.actor}
                />
              </div>
            );
          })}
        </>
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
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdateActors: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default MovieForm;
