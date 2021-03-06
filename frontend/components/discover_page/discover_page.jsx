var React = require("react");
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var PageHeader = require("react-bootstrap").PageHeader;
var SessionStore = require("../../stores/session_store");
var DiscoverStore = require("../../stores/discover_store");
var DiscoverActions = require("../../actions/discover_actions");
var DiscoverTrack = require("./discover_track");
var PlaylistModal = require("../playlist_modal/playlist_modal");

module.exports = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      tracks: DiscoverStore.all(),
      clientUsername: SessionStore.getClientUsername(),
      isLoggedIn: SessionStore.isLoggedIn()
    };
  },

  componentDidMount: function () {
    this.discoverListener = DiscoverStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);

    DiscoverActions.fetchTracks();
  },

  componentWillUnmount: function () {
    this.discoverListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _setTrackToAdd: function (track) {
    this.setState({ trackToAdd: track });
  },

  discoverRows: function () {
    var tracks = this.state.tracks;
    var rows = [];
    var row;

    for (var i = 0; i < tracks.length; i += 4) {
      row = (
        <Row key={ "discover-row-" + i }>
          <DiscoverTrack key={ i }
            track={ tracks[i] }
            isLoggedIn={ this.state.isLoggedIn }
            setTrackToAdd={ this._setTrackToAdd } />

          <DiscoverTrack key={ i + 1 }
            track={ tracks[i + 1] }
            isLoggedIn={ this.state.isLoggedIn }
            setTrackToAdd={ this._setTrackToAdd } />

          <DiscoverTrack key={ i + 2 }
            track={ tracks[i + 2] }
            isLoggedIn={ this.state.isLoggedIn }
            setTrackToAdd={ this._setTrackToAdd } />

          <DiscoverTrack key={ i + 3 }
            track={ tracks[i + 3] }
            isLoggedIn={ this.state.isLoggedIn }
            setTrackToAdd={ this._setTrackToAdd } />
        </Row>
      );

      rows.push(row);
    };

    return rows;
  },

  render: function () {
    return (
      <main>
        <Grid>
          <PageHeader>Discover new chimes</PageHeader>

          <p className="lead">
            See what's trending. Play it now, queue it up, or add to your own playlist.
          </p>

          <ReactCSSTransitionGroup transitionName="fade"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 300 }>

            { this.discoverRows() }
          </ReactCSSTransitionGroup>

          <PlaylistModal track={ this.state.trackToAdd }
            clientUsername={ this.state.clientUsername } />
        </Grid>
      </main>
    );
  }
});
