import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadMediaHouses,
  saveMediaHouse
} from "../../redux/actions/mediaHouseActions";
import PropTypes from "prop-types";
import MediaHouseForm from "./MediaHouseForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { createSlug } from "../../api/apiUtils";

function ManageMediaHousePage({
  mediaHouses,
  loadMediaHouses,
  saveMediaHouse,
  history,
  ...props
}) {
  const [mediaHouse, setMediaHouse] = useState({ ...props.mediaHouse });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // let state = {
  //   mediaHouse: useState({...props.mediaHouse})
  // }
  useEffect(() => {
    if (mediaHouses.length === 0) {
      loadMediaHouses().catch(error => {
        alert("Loading mediaHouses failed" + error);
      });
    } else {
      setMediaHouse(mediaHouse);
    }
  }, [mediaHouse]);

  function handleChange(event) {
    const { name, value } = event.target;
    setMediaHouse(prevMediaHouse => ({
      ...prevMediaHouse,
      [name]: value
    }));
  }
  function formIsValid() {
    const { name } = mediaHouse;
    const errors = {};

    if (!name) errors.name = "Name is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveMediaHouse(mediaHouse)
      .then(() => {
        toast.success("mediaHouse saved.");
        loadMediaHouses().catch(error => {
          alert("Loadling mediaHouses failed" + error);
        });
        history.push("/mediaHouses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return mediaHouses.length === 0 ? (
    <Spinner />
  ) : (
    <MediaHouseForm
      mediaHouse={mediaHouse}
      errors={errors}
      //mediaHouses={mediaHouses}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}
//directors/mediaHouse/r needed
ManageMediaHousePage.propTypes = {
  mediaHouse: PropTypes.object.isRequired,
  mediaHouses: PropTypes.array.isRequired,
  loadMediaHouses: PropTypes.func.isRequired,
  saveMediaHouse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getMediaHouseBySlug(mediaHouses, slug) {
  return mediaHouses.find(mediaHouse => mediaHouse.slug === slug) || null;
}

//move
const newMediaHouse = {
  name: "",
  description: ""
};
//need to add mediaHouses
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const mediaHouse =
    slug && state.mediaHouses.length > 0
      ? getMediaHouseBySlug(state.mediaHouses, slug)
      : newMediaHouse;
  return { mediaHouse, mediaHouses: state.mediaHouses };
}

const mapDispatchToProps = {
  loadMediaHouses,
  saveMediaHouse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMediaHousePage);
