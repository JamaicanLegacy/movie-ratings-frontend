import React from "react";
import Proptypes from "prop-types";
import TextInput from "../common/TextInput";

const GenreForm = ({
  genre,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{genre.genreId ? "Edit" : "Add"} Genre</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={genre.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="description"
        label="Description"
        value={genre.description}
        onChange={onChange}
        error={errors.description}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

GenreForm.propTypes = {
  genre: Proptypes.object.isRequired,
  errors: Proptypes.object,
  onSave: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  saving: Proptypes.bool
};

export default GenreForm;
