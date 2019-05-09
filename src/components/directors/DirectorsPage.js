import React from "react";
import { connect } from "react-redux";
import * as directorActions from "../../redux/actions/directorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import DirectorList from "./DirectorList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class directorsPage extends React.Component {
  state = { redirectToAddDirectorPage: false };

  //need to add directors
  componentDidMount() {
    const { directors, actions } = this.props;

    if (directors.length === 0) {
      actions.loaddirectors().catch(error => {
        alert("Loading directors failed" + error);
      });
    }
  }

  handleDeleteDirector = async director => {
    toast.success("director deleted");
    try {
      await this.props.actions.deleteDirector(director);
    } catch (error) {
      toast.error("Delete Failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddDirectorPage && <Redirect to="/director" />}
        <h2>Directors</h2>
        {this.props.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-director"
              onClick={() => this.setState({ redirectToAddDirectorPage: true })}
            >
              Add Director
            </button>
            <DirectorList
              onDeleteClick={this.handleDeleteDirector}
              directors={this.props.directors}
            />
          </>
        )}
      </>
    );
  }
}

directorsPage.propTypes = {
  // need to add directors
  directors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    directors:
      // need to add directors
      state.directors.map(director => {
        return { ...director };
      }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loaddirectors: bindActionCreators(
        directorActions.loadDirectors,
        dispatch
      ),
      deleteDirector: bindActionCreators(
        directorActions.deleteDirector,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(directorsPage);
