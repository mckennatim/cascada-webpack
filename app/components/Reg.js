var React = require('react');
var But = require('../components/But');
var Butt = require('../components/Butt');

var Reg = React.createClass({
	componentDidMount: function() {	
	},
	imginfo: {img:'img/Waterfall_on.gif', clickable:true, sz:100},
	message: {txt:'hello', txtColor:'white'},
	handleTimerButClick: function(){
		console.log('handled in reg')
	},
	render: function(){
		return (
			<div>
			Reg
			<Butt kind="primary" imginfo={this.imginfo} message={this.messaage}>Radium Button</Butt>
			<But imginfo={this.imginfo} message={this.message} onButClick={this.handleTimerButClick}/>
			</div>
			)
	}
});

module.exports = Reg;