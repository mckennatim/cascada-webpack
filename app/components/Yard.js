var React = require('react');
var Navigation = require('react-router').Navigation;
var Spots = require('../components/Spots');
import Auth from '../services/AuthService';

var url = '73.249.62.27';
//var url = '10.0.1.155';
var port = '8088'

var socket, sse;

var Yard = React.createClass({
	mixins: [Navigation],
	getInitialState: function() {
		return {spots: {"pond": {"spot": "pond", "tleft": -99, "state": "waiting"}, "center": {"spot": "center", "tleft": -99, "state": "waiting"}, "bridge": {"spot": "bridge", "tleft": -99, "state": "waiting"}}, authorized:false};

	},
	handleUserInput: function(timerSet){
		console.log('handling user input ' )
		console.log(timerSet)
		if (this.state.authorized){
			var geturl = 'http://'+url+':'+port+'/ctrlWater/'
			$.get( geturl, timerSet, function(data){
				console.log(data.status)
				this.setState({spots: data.status})
			}.bind(this));			
		} else {
			console.log('yo not authorized')
		}

	},	
	componentDidMount: function() {
		console.log('yard mounted')
		Auth.esbuenToken(this.tokenCallback);
		var that = this;
		$.get('http://'+url+':'+port+'/report/', function(data){
			this.setState({spots: data.spots})
		}.bind(this));
      	sse = new EventSource('http://'+url+':'+port+'/my_event_source');
        sse.onmessage = function(message) {
        	//console.log('message fron sse')
        	var sseData = JSON.parse(message.data).data
            //console.log(sseData);
            this.setState({spots: sseData})
        }.bind(this)		
	},

	tokenCallback: function(tf){
		this.setState({authorized: tf})
		console.log(tf)
	},

	componentWillUnmount: function(){
		console.log('yard unmountd')
		sse.close();
	},
	
	render: function(){
		return (
			<div> 
				<Spots spots={this.state.spots} relayUserInput={this.handleUserInput} auth={this.state.authorized}/>
			</div>
			)
	}
})

module.exports = Yard;