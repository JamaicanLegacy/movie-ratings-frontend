import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MovieHome from "./MovieHome";
import { Redirect } from "react-router-dom";
import * as movieActions from "../../redux/actions/movieActions";
import Spinner from "../common/Spinner";

class HomePage extends React.Component {
  componentWillMount() {
    const { movies, actions } = this.props;

    if (movies.length === 0) {
      actions.loadMovies().catch(error => {
        alert("Loading movies failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        <div className="text-center col-lg-12 col-md-12 col-sm-12">
          <h1 className="display-4">Welcome</h1>
        </div>
        {this.props.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <MovieHome movies={this.props.movies} />
          </>
        )}
      </>
    );
  }
}

HomePage.propTypes = {
  movies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    movies: state.movies.map(movie => {
      return { ...movie };
    }),
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadMovies: bindActionCreators(movieActions.loadMovies, dispatch)
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
