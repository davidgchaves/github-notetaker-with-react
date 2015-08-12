var React = require('react');
var Router = require('react-router');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var helpers = require('../utils/helpers');

var Profile = React.createClass({
  mixins: [
    Router.State,
    ReactFireMixin
  ],
  getInitialState: function () {
    return {
      notes: [],
      bio: {},
      repos: []
    }
  },
  initFirebase: function () {
    var firebaseRefChild = this.firebaseRef.child(this.getParams().username);
    this.bindAsArray(firebaseRefChild, 'notes');
  },
  initGithubInfo: function () {
    helpers
      .getGithubInfoFor(this.getParams().username)
      .then(function (githubData) {
        this.setState({
          repos: githubData.repos,
          bio: githubData.bio
        });
      }.bind(this));
  },
  componentDidMount: function () {
    this.firebaseRef = new Firebase('https://blazing-heat-9744.firebaseio.com');
    this.initFirebase();
    this.initGithubInfo();
  },
  componentWillUnmount: function () {
    this.unbind('notes');
  },
  componentWillReceiveProps: function () {
    this.unbind('notes');
    this.initFirebase();
    this.initGithubInfo();
  },
  handleAddNote: function (newNote) {
    this.firebaseRef.child(this.getParams().username).set(this.state.notes.concat([newNote]));
  },
  render: function () {
    var username = this.getParams().username;
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile
            username={username}
            bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos
            username={username}
            repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;
