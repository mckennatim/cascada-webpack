var React = require('react');
var But = require('../components/But');
var Butt = require('../components/Butt');

var Reg = React.createClass({
	componentDidMount: function() {	
	},
	//imginfo: {img:'img/Waterfall_on.gif', clickable:true},
	imginfo: {img:'img/waterfall_on.gif', clickable:true},
	message: {txt:'turn ON for: 10 min'},
	imfo: {
		but:{height:100, width:100, float:'right'}, 
		txt:{left:'3%', top:'3%', color: 'white', fontSize: '1.34em', margin: 6}
	},
	handleTimerButClick: function(){
		console.log('handled in reg')
	},
	render: function(){
		return (
			<div>
			<Butt imginfo={this.imginfo} imfo={this.imfo} onButClick={this.handleTimerButClick}>{this.message.txt} </Butt>
			</div>
			)
	}
});

module.exports = Reg;