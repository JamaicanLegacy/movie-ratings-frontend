import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadActors, saveActor } from "../../redux/actions/actorActions";
import PropTypes from "prop-types";
import ActorForm from "./ActorForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { createSlug } from "../../api/apiUtils";

function ManageActorPage({ actors, loadActors, saveActor, history, ...props }) {
  const [actor, setActor] = useState({ ...props.actor });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // let state = {
  //   actor: useState({...props.actor})
  // }
  useEffect(() => {
    if (actors.length === 0) {
      loadActors().catch(error => {
        alert("Loading actors failed" + error);
      });
    } else {
      setActor(actor);
    }
  }, [actor]);

  function handleChange(event) {
    const { name, value } = event.target;
    setActor(prevActor => ({
      ...prevActor,
      [name]: value
    }));
  }
  function formIsValid() {
    const { firstName, lastName, industryStartDate, active, gender } = actor;
    const errors = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!industryStartDate)
      errors.industryStartDate = "Industry Start Date is required";
    if (!active) errors.active = "Active is required";
    if (!gender) errors.gender = "Gender is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveActor(actor)
      .then(() => {
        toast.success("Actor saved.");
        loadActors().catch(error => {
          alert("Loading actors failed" + error);
        });
        history.push("/actors");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return actors.length === 0 ? (
    <Spinner />
  ) : (
    <ActorForm
      actor={actor}
      errors={errors}
      //actors={actors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}
//directors/genre/r needed
ManageActorPage.propTypes = {
  actor: PropTypes.object, //.isRequired,
  actors: PropTypes.array, //.isRequired,
  loadActors: PropTypes.func.isRequired,
  saveActor: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getActorBySlug(actors, slug) {
  return actors.find(actor => actor.slug === slug) || null;
}

//move
const newActor = {
  firstName: "",
  lastName: "",
  industryStartDate: "",
  retirementDate: "",
  active: "",
  gender: ""
};
//need to add actors
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const actor =
    slug && state.actors.length > 0
      ? getActorBySlug(state.actors, slug)
      : newActor;
  return { actor, actors: state.actors };
}

const mapDispatchToProps = {
  loadActors,
  saveActor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageActorPage);
