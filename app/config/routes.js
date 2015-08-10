var React = require('react');
var Router = require('react-router');

var Main = require('../components/Main');
var Home = require('../components/Home');

module.exports = (
  <Router.Route name="app" path="/" handler={Main}>
    <Router.DefaultRoute handler={Home} />
  </Router.Route>
);
