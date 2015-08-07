var React = require('react');
var RadioGroup = require('react-radio-group');
var But = require('../components/But');

var url = '50.177.97.139';
var port = '8088'

var Pond = new React.createClass({
	
	turnwhat: function(){
		var state = this.props.spot.state;
		console.log('state is :'+state)
		if (state=='off'){
			var message = 'turn ON for: '+ this.state.value + ' min';
			//return{message: message, img: "img/Waterfall_off.gif"}
			this.pime = {message: message, img: "img/Waterfall_off.gif"}
			return this.pime
		} else if (state=='timer'){
			var message = this.props.spot.tleft + 1 + ' togo click Off'
			//return{message: message, img: "img/Waterfall_on.gif"}
			this.pime = {message: message, img: "img/Waterfall_on.gif"}
			return this.pime;
		} else if (state=='waiting'){
			this.pime = {message: 'waiting', img: "img/waiting.gif"}
			return this.pime;

		}

	},
	getInitialState: function() {
		return {value: 10, pime: {message: 'cat', img:"img/waiting.gif"}};
	},
	componentDidMount: function() {
		return {value: this.props.spot.tleft};
	},
	handleChange: function(event) {
		this.setState({value: event.target.value});
		//console.log(this.state.value)
	},
	handleClick: function(){
		var state = this.props.spot.state;
		if(state=='off'){
			//console.log('turning on');
			this.props.onUserInput({spot: this.props.spot.spot, til: this.state.value, state: 'timer'});
		} else {
			//console.log('turning off');
			this.props.onUserInput({spot: this.props.spot.spot, til: -1, state: 'off'});
		}
	},
	render: function() {

		return (
			<div> 
				<h4 style={{color: "yellow"}}>pond</h4>
				<div className="on-button">
					<div className="button-big">
						<a className="button-boost" onClick={this.handleClick}> <img id="ima" src={this.turnwhat().img} title="click to start waterfall"/>
							<span>{this.turnwhat().message}</span>	
						</a>
					</div>
				</div>
				<br/>
				<input  type="range" min="0" max="120" step="1" value={this.state.value} onChange={this.handleChange}></input><br/>
			</div>
		);
	}

});


var Spot = new React.createClass({
	waitSlide: false,
	tval: -1,
	getInitialState: function() {
		return {value: 10, selectedValue: 'timed', img: 'img/loading60.gif', tval:6};
	},
	componentDidMount: function() {
		//console.log(this.props.spot.tleft);
		return {value: this.props.spot.tleft};
	},
	handleRangeChange: function(event) {
		this.waitSlide = true;
		this.setState({value: event.target.value});
		//console.log(event.target.value)
		this.tval= event.target.value;
		console.log(this.tval)
	},
	handleRadio: function(value){
		//console.log(value)
		var ima;
		if (value=='on'){
			this.props.onUserInput({spot: this.props.spot.spot, til: -1, state: 'on'});
			this.waitSlide=false;
			// this.rbut = value;
		} else if(value=='off'){
			this.props.onUserInput({spot: this.props.spot.spot, til: -1, state: 'off'});	
			this.waitSlide=false;	
			// this.rbut = value;
		} else {
			this.dealWithTimed()
		}
		this.setState({
	      selectedValue: value, img: ima
	    });
		
	},
	dealWithTimed: function(){
		this.rbut='timed';
		this.waitSlide='true'
		console.log(this.props.spot.tleft)
		this.props.onUserInput({spot: this.props.spot.spot, til: 1, state: 'timer'});
		console.log('dealin  w timed')
		this.ima = 'img/loadno60.gif';
	},	
	radioLand: function(){ //fires whenever state changes
		var state = this.props.spot.state;
		var til = this.props.spot.tleft;
		var ima, tleft;
		if (this.waitSlide){
			tleft=til;
		} else if (state=='on'){
			this.rbut='on'
			tleft='';
			this.ima= 'img/on100.gif'
		} else if (state=='off'){
			tleft='';
			this.rbut='off';
			this.ima= 'img/off100.gif'
		} else if (state=='timer'){
			console.log('state is time '+til)
			tleft=til;
			this.rbut='timed';
			this.tval = til;
			this.ima= 'img/loading60.gif'
		} else if (state=='waiting'){
			console.log('radioland is waiting')
			tleft='til';
			this.ima = 'img/waiting.gif';
		}
		this.waitSlde = false;
		return{
			ima: this.ima, tleft: tleft, rbut:this.rbut
		}
	},

	handleTimerButClick: function(){
		console.log('handle TimerBut clicked');
		this.waitSlide=false;
		var til = this.props.spot.tleft;
		console.log('dog')
		if (this.radioLand().rbut=='timed'){
			console.log('image is timer')
			this.props.onUserInput({spot: this.props.spot.spot, til: this.state.value, state: 'timer'});
		}		
	},
	render: function() {

		return (
			<div> 
				<h4 style={{color: "yellow"}}>{this.props.spot.spot}</h4>
				<div className="radio-group">
			        <RadioGroup
			        	ref="rg"
			          	name={this.props.spot.spot}
			          	selectedValue={this.radioLand().rbut}
			          	onChange={this.handleRadio}>
						{Radio => (
						<div>
						  <label><Radio value="on" />On</label>
						  <label><Radio value="timed" />Timed</label>
						  <label><Radio value="off" />Off</label>
						</div>
						)}
			        </RadioGroup>
		        </div>
		        <But img={this.radioLand().ima} tleft={this.tval} onButClick={this.handleTimerButClick}/>
				<div>
					<br/><br/>
					<input  type="range" min="0" max="120" step="1" value={this.state.value} onChange={this.handleRangeChange}></input>
				</div>
				<br/>
			</div>
		);
	}
})



var Spots = React.createClass({
	comingUserInput: function(timerSet){
		var tstr = JSON.stringify(timerSet);
		var tobj = JSON.parse(tstr);
		tobj.state='waiting'
		this.props.spots[tobj.spot].state='waiting';	
		this.props.onUserInput(timerSet);
	},		
	render: function() {
		return (
			<div className="sprklr"> 
			   <h1>Cascada</h1>
   				<Pond onUserInput={this.comingUserInput} spot={this.props.spots.pond} />
   				<Spot onUserInput={this.comingUserInput} spot={this.props.spots.bridge} />
				<Spot onUserInput={this.comingUserInput} spot={this.props.spots.center} />
			</div>
		);
	}
});

var socket, sse;

var Yard = React.createClass({
	mounted: false,
	getInitialState: function() {
		return {spots: {"pond": {"spot": "pond", "tleft": -99, "state": "waiting"}, "center": {"spot": "center", "tleft": -99, "state": "waiting"}, "bridge": {"spot": "bridge", "tleft": -99, "state": "waiting"}}};

	},
	handleWaiting: function(wspots){
		console.log('mounted is '+this.mounted)
		if (this.mounted){
			this.setState({spots: wspots})
		}
	},
	handleUserInput: function(timerSet){
		var that=this;
		var geturl = 'http://'+url+':'+port+'/ctrlWater/'
		$.get( geturl, timerSet, function(data){
			console.log(data.status)
			this.setState({spots: data.status})
		}.bind(this));
	},	
	componentDidMount: function() {
		console.log('yard mounted')
		this.mounted=true;
		var that = this;
		$.get('http://'+url+':'+port+'/report/', function(data){
			this.setState({spots: data.spots})
		}.bind(this));
      	sse = new EventSource('http://10.0.1.154:8088/my_event_source');
        sse.onmessage = function(message) {
        	console.log('message fron sse')
        	var sseData = JSON.parse(message.data).data
            console.log(sseData);
            this.setState({spots: sseData})
        }.bind(this)		

		// var namespace = '/test'; 
		// console.log(url)
		// socket = io.connect('http://'+url+':'+port+namespace, {reconnect: false});
		// socket.on('connect', function() {
		// 	socket.emit('my event', {data: 'I\'m connected!'});
		// });
		// socket.on('my response', function(msg) {
		// 	var dtao = JSON.parse(msg.data)
		// 	this.setState({spots: dtao})
		// 	console.log('called st state')
		// 	//console.log(dtao)
		// }.bind(this));
	},
	componentWillUnmount: function(){
		console.log('yard unmountd')
		sse.close();
	},	
	render: function(){
		return (
			<div id="bkg">hello react {this.state.spots} <br/>
			<Glom spots={this.state.spots.pond}/>

			<Spots onWaiting={this.handleWaiting} spots={this.state.spots} onUserInput={this.handleUserInput}/>
			</div>
			)
	}
})

var Glom = React.createClass({
	render: function(){
		return(
			<div>
			{this.props.spots}
			</div>
			)
	}
})

module.exports = Yard;