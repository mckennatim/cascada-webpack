

var SpotState = new React.createClass({
	render: function() {
		return (
			<table>
			<tr> 
				<td>{this.props.spot.spot}</td>
				<td>timeleft: {this.props.spot.tleft}</td>
				<td>state: {this.props.spot.state}</td>
			</tr>
			</table>
		);
	}
});

var SpotSet = new React.createClass({
	getInitialState: function() {
		return {value: 0};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
		console.log(this.state.value)
	},	
	render: function() {	
		return (
			<div> 
			<span>{this.state.value}</span>
				<input type="range" min="0" max="120" step="1" value={this.state.value} onChange={this.handleChange}></input>


			</div>
		);
	}
})

var Spot = React.createClass({

	render: function() {
		console.log(this.props.spot)
		var x = this.props.spot
		console.log(x.tleft)
		return (
			<div>
				<SpotState spot={this.props.spot} />
				<SpotSet/>
			</div>
		);
	}
});

var Spots = React.createClass({
	render: function() {
		//console.log(this.props.spots)

		return (
			<div> 
			   Cascad
   				<Spot spot={this.props.spots.pond} />
   				<Spot spot={this.props.spots.bridge} />
				<Spot spot={this.props.spots.center} />
			</div>
		);
	}
});

var Yard = React.createClass({
	getInitialState: function() {
		return {spots: {"pond": {"spot": "pond", "tleft": -99, "state": "on"}, "center": {"spot": "center", "tleft": -99, "state": "on"}, "bridge": {"spot": "bridge", "tleft": -99, "state": "on"}}};

	},	
	componentDidMount: function() {
		
		var namespace = '/test'; 
		var socket = io.connect('http://10.0.1.154:8087' + namespace);
		socket.on('connect', function() {
			socket.emit('my event', {data: 'I\'m connected!'});
		});
		socket.on('my response', function(msg) {
			$('#log').append('<br>Received #' + msg.count + ': ' + msg.data);
			var dtao = JSON.parse(msg.data)
			this.setState({spots: dtao})
			//console.log(dtao)
			$('#tdisp').html(dtao.pond.tleft)
		}.bind(this));
	},	
	render: function(){
		return (
			<div>hello react {this.state.spots} <br/>
			<Spots spots={this.state.spots} />
			</div>
			)
	}
})
React.render(
	<Yard />,
	document.getElementById("content")
	)