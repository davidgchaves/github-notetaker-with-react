var React = require('react');
var Router = require('react-router');

var Main = require('../components/Main');

module.exports = (
  <Router.Route name="app" path="/" handler={Main}>
  </Router.Route>
);
