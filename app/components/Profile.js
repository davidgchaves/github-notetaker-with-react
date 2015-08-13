import React from 'react';
import Rebase from 're-base';

import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import helpers from '../utils/helpers';

var base = Rebase.createClass('https://blazing-heat-9744.firebaseio.com');

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
    this.refBase = base.bindToState(this.router.getCurrentParams().username, {
      context: this,
      asArray: true,
      state: 'notes'
    });
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
    this.initFirebase();
    this.initGithubInfo();
  }
  componentWillUnmount () {
    base.removeBinding(this.refBase);
  }
  componentWillReceiveProps () {
    base.removeBinding(this.refBase);
    this.initFirebase();
    this.initGithubInfo();
  }
  handleAddNote (newNote) {
    base.post(this.router.getCurrentParams().username, {
      data: this.state.notes.concat([newNote])
    });
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
            addNote={this.handleAddNote.bind(this)} />
        </div>
      </div>
    )
  }
};

Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;
