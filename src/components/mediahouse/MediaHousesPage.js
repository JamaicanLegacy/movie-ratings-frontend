import React from "react";
import { connect } from "react-redux";
import * as mediaHouseActions from "../../redux/actions/mediaHouseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import MediaHouseList from "./MediaHouseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class MediaHousesPage extends React.Component {
  state = { redirectToAddMediaHousePage: false };

  //need to add mediaHouses
  componentDidMount() {
    const { mediaHouses, actions } = this.props;
    if (mediaHouses.length === 0) {
      actions.loadMediaHouses().catch(error => {
        alert("Loading mediaHouses failed" + error);
      });
    }
  }

  handleDeleteMediaHouse = async mediaHouse => {
    toast.success("MediaHouse deleted");
    try {
      await this.props.actions.deleteMediaHouse(mediaHouse);
    } catch (error) {
      toast.error("Delete Failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddMediaHousePage && (
          <Redirect to="/mediaHouse" />
        )}
        <h2>Media Houses</h2>
        {this.props.loading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-mediaHouse"
              onClick={() =>
                this.setState({ redirectToAddMediaHousePage: true })
              }
            >
              Add Media House
            </button>
            <MediaHouseList
              onDeleteClick={this.handleDeleteMediaHouse}
              mediaHouses={this.props.mediaHouses}
            />
          </>
        )}
      </>
    );
  }
}

MediaHousesPage.propTypes = {
  // need to add mediaHouses
  mediaHouses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    mediaHouses: state.mediaHouses.map(mediaHouse => {
      return { ...mediaHouse };
    }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMediaHouses: bindActionCreators(
        mediaHouseActions.loadMediaHouses,
        dispatch
      ),
      deleteMediaHouse: bindActionCreators(
        mediaHouseActions.deleteMediaHouse,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaHousesPage);
