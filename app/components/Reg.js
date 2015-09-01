var React = require('react');
var But = require('../components/But');
var Butt = require('../components/Butt');

var Reg = React.createClass({
	componentDidMount: function() {	
	},
	//imginfo: {img:'img/Waterfall_on.gif', clickable:t   rue},
	imginfo: {img:'img/waterfall_on.gif', clickable:true},
	message: {con:'get token', discon: 'delete token'},
	imfo: {
		but:{height:100, width:100, float:'right'}, 
		txt:{left:'3%', top:'3%', color: 'white', fontSize: '1.34em', margin: 6}
	},
	handleTimerButClick: function(){
		var appdata ={apikey: 'Ricuhiqozarulerofekuqepa'}
		var user = 'tim'
		console.log('handled in reg')
		$.post('http://sitebuilt.net:3002/api/authenticate/'+user, appdata, function(data){
			console.log(data);
			if(data.message=='token here'){
				console.log(data.message)
				localStorage.setItem('casc', JSON.stringify({user: user, token: data.token}))
				var ls = JSON.parse(localStorage.casc)
				console.log(ls.user)
			}
		}.bind(this));
	},
	deleteLS: function(){
		console.log('deleting token')
		localStorage.removeItem('casc')
	},
	render: function(){
		return (
			<div>
			<Butt imginfo={this.imginfo} imfo={this.imfo} onButClick={this.handleTimerButClick}>{this.message.con} </Butt>
			<Butt imginfo={this.imginfo} imfo={this.imfo} onButClick={this.deleteLS}>{this.message.discon} </Butt>
			</div>
			)
	}
});

module.exports = Reg;