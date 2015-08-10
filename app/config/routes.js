var React = require('react');
var Router = require('react-router');

var Main = require('../components/Main');
var Home = require('../components/Home');
var Profile = require('../components/Profile');

module.exports = (
  <Router.Route name="app" path="/" handler={Main}>
    <Router.Route name="profile" path="profile/:username" handler={Profile} />
    <Router.DefaultRoute handler={Home} />
  </Router.Route>
);
