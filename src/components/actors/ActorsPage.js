import React from "react";
import { connect } from "react-redux";
import * as actorActions from "../../redux/actions/actorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ActorList from "./ActorList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ActorsPage extends React.Component {
  state = { redirectToAddActorPage: false };

  //need to add actors
  componentDidMount() {
    const { actors, actions } = this.props;
    if (actors.length === 0) {
      actions.loadActors().catch(error => {
        alert("Loading actors failed" + error);
      });
    }
  }

  handleDeleteActor = async actor => {
    toast.success("Actor deleted");
    try {
      await this.props.actions.deleteActor(actor);
    } catch (error) {
      toast.error("Delete Failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddActorPage && <Redirect to="/actor" />}
        <h2>Actors</h2>
        {this.props.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-actor"
              onClick={() => this.setState({ redirectToAddActorPage: true })}
            >
              Add Actor
            </button>
            <ActorList
              onDeleteClick={this.handleDeleteActor}
              actors={this.props.actors}
            />
          </>
        )}
      </>
    );
  }
}

ActorsPage.propTypes = {
  // need to add actors
  actors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    actors: state.actors.map(actor => {
      return { ...actor };
    }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadActors: bindActionCreators(actorActions.loadActors, dispatch),
      deleteActor: bindActionCreators(actorActions.deleteActor, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActorsPage);
