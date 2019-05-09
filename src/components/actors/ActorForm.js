import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const ActorForm = ({
  actor,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  if (actor.retirementDate === null) {
    actor.retirementDate = "";
  }
  return (
    <form onSubmit={onSave}>
      <h2>{actor.actorId ? "Edit" : "Add"} Actor </h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="firstName"
        label="First Name"
        value={actor.firstName}
        onChange={onChange}
        error={errors.firstName}
      />
      <TextInput
        name="lastName"
        label="Last Name"
        value={actor.lastName}
        onChange={onChange}
        error={errors.lastName}
      />
      <div className="form-group">
        <label>Industry Start Date </label>
        <div className="field">
          <input
            type="date"
            name="industryStartDate"
            label="Industry Start Date"
            value={actor.industryStartDate}
            onChange={onChange}
            error={errors.industryStartDate}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Industry Start Date </label>
        <div className="field">
          <input
            type="date"
            name="retirementDate"
            label="Retirement Date"
            value={actor.retirementDate}
            onChange={onChange}
            error={errors.retirementDate}
          />
        </div>
      </div>
      <TextInput
        name="active"
        label="Active (True/False)"
        value={String(actor.active)}
        onChange={onChange}
        error={errors.active}
      />
      <TextInput
        name="gender"
        label="Gender (Male/Female)"
        value={actor.gender}
        placeholder="Male"
        onChange={onChange}
        error={errors.gender}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

ActorForm.propTypes = {
  actor: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default ActorForm;
