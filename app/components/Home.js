var React = require('react');

var Home = React.createClass({
	componentDidMount: function() {	
		var namespace = '/test'; 
		var socket = io.connect('http://10.0.1.154:8087' + namespace);
	},
	render: function(){
		return (
			<div>
			Home2
			</div>
			)
	}
});

module.exports = Home;