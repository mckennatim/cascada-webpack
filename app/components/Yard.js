var React = require('react');
var Navigation = require('react-router').Navigation;
var RadioGroup = require('react-radio-group');
var Butt = require('../components/Butt');
//var Butt = require('../components/Butt');

//var url = '50.177.97.139';
var url = '50.177.97.139';
var port = '8088'

var Pond = new React.createClass({
	imfo: {
		but:{height:110, width:110, float:'left', marginLeft: 40, marginBottom: 20}, 
		txt:{left:'3%', top:'3%', color: 'white', fontSize: '1.2em', margin: 6, textShadow: '2px 2px blue'}
	},	
	turnwhat: function(){
		var auth = this.props.auth;
		var state = this.props.spot.state;
		//console.log('state is :'+state)
		if (state=='off'){
			if(auth){
				var message = 'turn ON for: '+ this.state.value + ' min';
				//return{message: message, img: "img/Waterfall_off.gif"}
				this.pime = {message: message, img: "img/waterfall_off.gif", imginfo: {img:'img/waterfall_off.gif', clickable:true}}
				return this.pime
			} else{
				var message = 'registed users can control water';
				//return{message: message, img: "img/Waterfall_off.gif"}
				this.pime = {message: message, img: "img/waterfall_off.gif", imginfo: {img:'img/waterfall_off.gif', clickable:false}}
				return this.pime				
			}
		} else if (state=='timer'|state=='on'){
			if(auth){
				var message = this.props.spot.tleft + 1 + ' to go click Off'
				//return{message: message, img: "img/Waterfall_on.gif"}
				this.pime = {message: message, img: "img/waterfall_on.gif",imginfo: {img:'img/waterfall_on.gif', clickable:true}}
				return this.pime;				
			} else{
				var message = this.props.spot.tleft + 1 + ' to go'
				//return{message: message, img: "img/Waterfall_on.gif"}
				this.pime = {message: message, img: "img/waterfall_on.gif",imginfo: {img:'img/waterfall_on.gif', clickable:false}}
				return this.pime;
			}

		} else if (state=='waiting'){
			this.pime = {message: 'waiting', img: "img/waiting.gif", imginfo: {img:'img/waiting.gif', clickable:false}}
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
				<Butt imginfo={this.turnwhat().imginfo} imfo={this.imfo} onButClick={this.handleClick}>{this.turnwhat().message} </Butt>
				<br/>
				<input  type="range" min="1" max="120" step="1" value={this.state.value} onChange={this.handleChange}></input><br/>
			</div>
		);
	}

});


var Spot = new React.createClass({
	waitSlide: false,
	tval: -1,
	imfo: {
		but:{height:60, width:60}, 
		txt:{left:'34%', top:'28%', color: 'green', fontWeight: 'bold', fontSize: '1.2em', fontFamily: '"Comic Sans MS", cursive, sans-serif'}
	},
	getInitialState: function() {
		//return {value: 10, selectedValue: 'timed', img: 'img/loading60.gif', tval:6};
		return {value: 10};
	},
	componentDidMount: function() {
		//console.log(this.props.spot.tleft);
		return {value: this.props.spot.tleft};
	},
	handleRangeChange: function(event) {
		this.waitSlide = true;
		this.setState({value: event.target.value});
		this.tval= event.target.value;
	},
	handleRadio: function(value){
		//console.log(value)
		if (this.props.auth){
			if (value=='on'){
				this.props.onUserInput({spot: this.props.spot.spot, til: -1, state: 'on'});
				this.waitSlide=false;
			} else if(value=='off'){
				this.props.onUserInput({spot: this.props.spot.spot, til: -1, state: 'off'});	
				this.waitSlide=false;	
			} else {
				this.rbut='timed';
				this.waitSlide='true'
				console.log(this.props.spot.tleft)
				this.props.onUserInput({spot: this.props.spot.spot, til: 1, state: 'timer'});
				console.log('dealin  w timed')
				//this.ima = {img:'img/loadno60.gif', clickable:true};
				this.ima.img = 'img/loadno60.gif';
				this.ima.clickable = true;			
			}
			this.setState({
		      selectedValue: value//, img: ima
		    });			
		}
	},
	radioLand: function(){ //fires whenever state changes
		var state = this.props.spot.state;
		var til = this.props.spot.tleft;
		if (this.waitSlide){
		} else if (state=='on'){
			this.rbut='on'
			this.tval='';
			this.ima= {img:'img/on100.gif', clickable:false}
		} else if (state=='off'){
			this.rbut='off';
			this.tval='';
			this.ima= {img:'img/off100.gif', clickable:false}
		} else if (state=='timer'){
			this.rbut='timed';
			this.tval = til;
			this.ima= {img:'img/loading60.gif', clickable:true}
		} else if (state=='waiting'){
			console.log('radioland is waiting')
			this.tval='';
			this.ima = {img:'img/waiting.gif', clickable:false};
		}
		this.waitSlde = false;
		return{
			ima: this.ima, rbut:this.rbut
		}
	},

	handleTimerButClick: function(){
		console.log('handle TimerBut clicked');
		this.waitSlide=false;
		var til = this.props.spot.tleft;
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
		        <Butt imginfo={this.radioLand().ima} imfo={this.imfo} onButClick={this.handleTimerButClick}>{this.tval}</Butt>
				<br/>
				<div>
					<br/><br/><br/>
					<input  type="range" min="1" max="120" step="1" value={this.state.value} onChange={this.handleRangeChange}></input>
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
	componentDidMount: function() {
		this.checkAuth()
	},	
	checkAuth: function(){
		if (!this.props.auth){
			return 'those registered can make changes'
		} else {
			//this.setState({message: ''})
			return ''
		}
	},	
	render: function() {
		return (
			<div className="sprklr"> 
			   <h1>Cascada</h1>
			   <p style={{color:'red', fontSize: 18, textShadow: '1px 1px white'}}>{this.checkAuth()}</p>
   				<Pond onUserInput={this.comingUserInput} spot={this.props.spots.pond} auth={this.props.auth}/>
   				<Spot onUserInput={this.comingUserInput} spot={this.props.spots.bridge} auth={this.props.auth}/>
				<Spot onUserInput={this.comingUserInput} spot={this.props.spots.center} auth={this.props.auth}/>
			</div>
		);
	}
});

var socket, sse;

var Yard = React.createClass({
	mixins: [Navigation],
	authorized: false,
	getInitialState: function() {
		return {spots: {"pond": {"spot": "pond", "tleft": -99, "state": "waiting"}, "center": {"spot": "center", "tleft": -99, "state": "waiting"}, "bridge": {"spot": "bridge", "tleft": -99, "state": "waiting"}}};

	},
	handleUserInput: function(timerSet){
		if (this.authorized){
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
		this.check4token()
		console.log(this.authorized)
//		this.mounted=true;
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
	componentWillUnmount: function(){
		console.log('yard unmountd')
		sse.close();
	},
	check4token: function(){
		if (localStorage.casc){
			var ls = JSON.parse(localStorage.casc)
			if(ls.token){
				$.ajax({
					url: 'http://sitebuilt.net:3002/api/account',
					headers: {"Authorization": "Bearer "+ ls.token},
					success: function(data){
						console.log(data.name)
						if (data.name==ls.user){
							console.log(ls.user + ' = ' +data.name)
							this.authorized = true

						} else {
							this.authorized = false
							this.transitionTo('reg')
						}
						console.log(this.authorized)
					}.bind(this)
				})
				console.log(ls.token)
			} else {
				this.authorized = false
				this.transitionTo('reg')
			}
		} else {
			this.authorized = false
			//this.transitionTo('reg')
		}
	},	
	render: function(){
		return (
			<div> 
			<Spots spots={this.state.spots} onUserInput={this.handleUserInput} auth={this.authorized}/>
			</div>
			)
	}
})

module.exports = Yard;