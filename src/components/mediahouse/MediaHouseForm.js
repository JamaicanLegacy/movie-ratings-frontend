import React from "react";
import Proptypes from "prop-types";
import TextInput from "../common/TextInput";

const MediaHouseForm = ({
  mediaHouse,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{mediaHouse.mediaHouseId ? "Edit" : "Add"} Media House</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={mediaHouse.name}
        onChange={onChange}
        error={errors.name}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

MediaHouseForm.propTypes = {
  mediaHouse: Proptypes.object.isRequired,
  errors: Proptypes.object,
  onSave: Proptypes.func.isRequired,
  onChange: Proptypes.func.isRequired,
  saving: Proptypes.bool
};

export default MediaHouseForm;
