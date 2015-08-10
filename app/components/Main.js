var React = require('react');

var Main = React.createClass({
  render: function () {
    return (
      <div>
        Testing Main Component
      </div>
    );
  }
});

React.render(<Main />, document.getElementById('app'));
