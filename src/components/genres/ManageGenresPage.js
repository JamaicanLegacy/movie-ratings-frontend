import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadGenres, saveGenre } from "../../redux/actions/genreActions";
import PropTypes from "prop-types";
import GenreForm from "./GenreForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { createSlug } from "../../api/apiUtils";

function ManageGenrePage({ genres, loadGenres, saveGenre, history, ...props }) {
  const [genre, setGenre] = useState({ ...props.genre });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // let state = {
  //   genre: useState({...props.genre})
  // }
  useEffect(() => {
    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading genres failed" + error);
      });
    } else {
      setGenre(genre);
    }
  }, [genre]);

  function handleChange(event) {
    const { name, value } = event.target;
    setGenre(prevGenre => ({
      ...prevGenre,
      [name]: value
    }));
  }
  function formIsValid() {
    const { name, description } = genre;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!description) errors.description = "Description is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveGenre(genre)
      .then(() => {
        toast.success("Genre saved.");
        loadGenres().catch(error => {
          alert("Loadling genres failed" + error);
        });
        history.push("/genres");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }
  return genres.length === 0 ? (
    <Spinner />
  ) : (
    <GenreForm
      genre={genre}
      errors={errors}
      //genres={genres}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}
//directors/genre/r needed
ManageGenrePage.propTypes = {
  genre: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  loadGenres: PropTypes.func.isRequired,
  saveGenre: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getGenreBySlug(genres, slug) {
  return genres.find(genre => genre.slug === slug) || null;
}

//move
const newGenre = {
  name: "",
  description: ""
};
//need to add genres
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const genre =
    slug && state.genres.length > 0
      ? getGenreBySlug(state.genres, slug)
      : newGenre;
  return { genre, genres: state.genres };
}

const mapDispatchToProps = {
  loadGenres,
  saveGenre
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageGenrePage);
