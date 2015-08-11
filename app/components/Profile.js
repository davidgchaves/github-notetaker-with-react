var React = require('react');
var Router = require('react-router');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');

var Profile = React.createClass({
  mixins: [
    Router.State,
    ReactFireMixin
  ],
  getInitialState: function () {
    return {
      notes: ['dummy1', 'dummy2'],
      bio: { dummy: 'Solyaris' },
      repos: [1, 2]
    }
  },
  initFirebase: function () {
    this.firebase = new Firebase('https://blazing-heat-9744.firebaseio.com/');
    var childFirebase = this.firebase.child(this.getParams().username);
    this.bindAsArray(childFirebase, 'notes');
  },
  componentDidMount: function () {
    this.initFirebase();
  },
  componentWillUnmount: function () {
    this.unbound('notes');
  },
  render: function () {
    var username = this.getParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes username={username} notes={this.state.notes} />
        </div>
      </div>
    );
  }
});

module.exports = Profile;
