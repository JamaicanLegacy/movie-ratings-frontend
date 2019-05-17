import React from "react";
import { connect } from "react-redux";
import * as genreActions from "../../redux/actions/genreActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import GenreList from "./GenreList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class GenresPage extends React.Component {
  state = { redirectToAddGenrePage: false };

  //need to add genres
  componentDidMount() {
    const { genres, actions } = this.props;
    if (genres.length === 0) {
      actions.loadGenres().catch(error => {
        alert("Loading genres failed" + error);
      });
    }
  }

  handleDeleteGenre = async genre => {
    var result = confirm("Are you sure you want to delete " + genre.name + "?");
    if (result) {
      toast.success("Genre deleted");
      try {
        await this.props.actions.deleteGenre(genre);
      } catch (error) {
        toast.error("Delete Failed. " + error.message, { autoClose: false });
      }
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddGenrePage && <Redirect to="/genre" />}
        <h2>Genres</h2>
        {this.props.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-genre"
              onClick={() => this.setState({ redirectToAddGenrePage: true })}
            >
              Add Genre
            </button>
            <GenreList
              onDeleteClick={this.handleDeleteGenre}
              genres={this.props.genres}
            />
          </>
        )}
      </>
    );
  }
}

GenresPage.propTypes = {
  // need to add genres
  genres: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    genres: state.genres.map(genre => {
      return { ...genre };
    }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadGenres: bindActionCreators(genreActions.loadGenres, dispatch),
      deleteGenre: bindActionCreators(genreActions.deleteGenre, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GenresPage);
