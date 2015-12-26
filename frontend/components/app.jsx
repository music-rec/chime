var React = require("react");
var SessionStore = require("../stores/session_store");
var SessionActions = require("../actions/session_actions");
var Nav = require("./nav/nav");
var Upload = require("./upload/upload");
var Player = require("./player/player");
var Audio = require("./audio");

var App = React.createClass({
  componentWillMount: function () {
    if (SessionStore.isLoggedIn()) {
      var currentUserId = SessionStore.getCurrentUserId();

      SessionActions.fetchCurrentUser(currentUserId);
    }
  },

  render: function () {
    return (
      <div className="app">
        <Nav />

        <Upload />

        <main>
          { this.props.children }
        </main>

        <footer>
          <Player />
        </footer>

        <Audio />
      </div>
    );
  }
});

module.exports = App;
