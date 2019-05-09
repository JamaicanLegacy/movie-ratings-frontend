import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadDirectors,
  saveDirector
} from "../../redux/actions/directorActions";
import PropTypes from "prop-types";
import DirectorForm from "./DirectorForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageDirectorPage({
  directors,
  loadDirectors,
  saveDirector,
  history,
  ...props
}) {
  const [director, setDirector] = useState({ ...props.director });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (directors.length === 0) {
      loadDirectors().catch(error => {
        alert("Loading directors failed" + error);
      });
    } else {
      setDirector(director);
    }
  }, [director]);

  function handleChange(event) {
    const { name, value } = event.target;
    setDirector(prevDirector => ({
      ...prevDirector,
      [name]: value
    }));
  }
  function formIsValid() {
    const {
      firstName,
      lastName,
      industryStartDate,
      retirementDate,
      active,
      gender
    } = director;
    const errors = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!industryStartDate)
      errors.industryStartDate = "Industry Start Date is required";
    // if (!retirementDate) errors.retirementDate = "Retirement date is required";
    if (!active) errors.active = "Active is required";
    if (!gender) errors.gender = "Gender is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveDirector(director)
      .then(() => {
        toast.success("Director saved.");
        loadDirectors().catch(error => {
          alert("Loading directors failed" + error);
        });
        history.push("/directors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return directors.length === 0 ? (
    <Spinner />
  ) : (
    <DirectorForm
      director={director}
      errors={errors}
      directors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}
//directors/genre/r needed
ManageDirectorPage.propTypes = {
  director: PropTypes.object, //.isRequired,
  directors: PropTypes.array, //.isRequired,
  loadDirectors: PropTypes.func.isRequired,
  saveDirector: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getDirectorBySlug(directors, slug) {
  return directors.find(director => director.slug === slug) || null;
}

//move
const newDirector = {
  firstName: "",
  lastName: "",
  industryStartDate: "",
  retirementDate: "",
  active: "",
  gender: ""
};
//need to add directors
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const director =
    slug && state.directors.length > 0
      ? getDirectorBySlug(state.directors, slug)
      : newDirector;
  return { director, directors: state.directors };
}

const mapDispatchToProps = {
  loadDirectors,
  saveDirector
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDirectorPage);
