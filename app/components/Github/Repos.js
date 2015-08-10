var React = require('react');

var Repos = React.createClass({
  render: function () {
    return (
      <div>
        Inside the Repos Component<br />
        Username: {this.props.username}<br />
        Repos: {this.props.repos}
      </div>
    );
  }
});

module.exports = Repos;
