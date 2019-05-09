import React from "react";
import { connect } from "react-redux";
import * as movieActions from "../../redux/actions/movieActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import MovieList from "./MovieList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class MoviesPage extends React.Component {
  state = { redirectToAddMoviePage: false };

  //need to add actors
  componentDidMount() {
    const { movies, actions } = this.props;
    if (movies.length === 0) {
      actions.loadMovies().catch(error => {
        alert("Loading movies failed" + error);
      });
    } //loadactors
  }
  handleSelectMovie = slug => {
    this.props.actions.selectMovie(slug, this.props.movies || []);
  };
  handleResetSelected = () => {
    this.props.actions.resetSelectedMovie();
  };
  handleDeleteMovie = async movie => {
    toast.success("Movie deleted");
    try {
      await this.props.actions.deleteMovie(movie);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddmoviePage && <Redirect to="/movie" />}
        <h2>Movies</h2>
        {this.props.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-movie"
              onClick={() => {
                this.setState({ redirectToAddmoviePage: true });
                this.handleResetSelected();
              }}
            >
              Add Movie
            </button>
            <MovieList
              onDeleteClick={this.handleDeleteMovie}
              movies={this.props.movies}
              onSelectedMovieClick={this.handleSelectMovie}
            />
          </>
        )}
      </>
    );
  }
}

MoviesPage.propTypes = {
  // need to add actors
  movies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    movies:
      // need to add actors
      state.movies.map(movie => {
        return { ...movie };
      }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMovies: bindActionCreators(movieActions.loadMovies, dispatch),
      deleteMovie: bindActionCreators(movieActions.deleteMovie, dispatch),
      selectMovie: bindActionCreators(movieActions.selectMovie, dispatch),
      resetSelectedMovie: bindActionCreators(
        movieActions.resetSelectedMovie,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviesPage);
