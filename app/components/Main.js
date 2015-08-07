var React = require('react');
import { RouteHandler, Link } from 'react-router';

var mStyle = {
	li: {
		display: 'inline',
		padding: '10px'
	},
	ul: {
		display: 'inline'
	}
};


var Main = React.createClass({
  render: function(){
    return (
      <div style={mStyle.div}>
        <span> Main Menu</span>
        <ul>
        <li style={mStyle.li}><Link to="/home">home</Link></li>
        <li style={mStyle.li}><Link to="/yard">yard</Link></li>
        <li style={mStyle.li}><Link to="/but">but</Link></li>
        </ul>
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    )
  }
});

module.exports = Main;