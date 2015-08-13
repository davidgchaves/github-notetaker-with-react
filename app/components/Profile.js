import React from 'react';
//var ReactFireMixin = require('reactfire');
//var Firebase = require('firebase');

import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import helpers from '../utils/helpers';

//mixins: [
//  ReactFireMixin
//]

class Profile extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }
  initFirebase () {
    //var firebaseRefChild = this.firebaseRef.child(this.router.getCurrentParams().username);
    //this.bindAsArray(firebaseRefChild, 'notes');
  }
  initGithubInfo () {
    helpers
      .getGithubInfoFor(this.router.getCurrentParams().username)
      .then((githubData) => {
        this.setState({
          repos: githubData.repos,
          bio: githubData.bio
        });
      });
  }
  componentWillMount () {
    this.router = this.context.router;
  }
  componentDidMount () {
    //this.firebaseRef = new Firebase('https://blazing-heat-9744.firebaseio.com');
    this.initFirebase();
    this.initGithubInfo();
  }
  componentWillUnmount () {
    //this.unbind('notes');
  }
  componentWillReceiveProps () {
    //this.unbind('notes');
    this.initFirebase();
    this.initGithubInfo();
  }
  handleAddNote (newNote) {
    // this.firebaseRef.child(this.router.getCurrentParams().username).set(this.state.notes.concat([newNote]));
  }
  render () {
    var username = this.router.getCurrentParams().username;
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
};

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
