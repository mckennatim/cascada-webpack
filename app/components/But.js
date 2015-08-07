var React = require('react');
var imgUrl = 'img/loading.gif';
var sz = '60';
// var sbBut = {
// 	div: {
// 		float: 'right',
// 		borderRadius: '10',
// 		height: sz,
// 		width: sz,
// 		background: 'white',
// 		backgroundImage: 'url('+imgUrl+')',
// 		backgroundSize: sz
// 	},
//  	span: {
//  	  color: 'black',
// 	  position: 'relative',
// 	  left:'30%',
// 	  top:'30%'
//  	},
//  	span2: {
//  	  color: 'green',
// 	  position: 'relative',
// 	  left:'33%',
// 	  top:'3%'
//  	}
//  };

var But = new React.createClass({
	getInitialState: function(){
		return {}
	},
	componentDidMount: function(){
		return {}
	},
	sbBut: function(){
		var ima = this.props.img;
		var st = {sz:60, left:'42%', top:'30%'};
		return {
			div: {
				float: 'right',
				borderRadius: '10',
				height: st.sz,
				width: st.sz,
				background: 'white',
				backgroundImage: 'url('+ima+')',
				backgroundSize: st.sz
			},
		 	span: {
		 	  color: 'black',
			  position: 'relative',
			  left:st.left,
			  top:st.top
		 	}			
		}

	},
	handleTimerButClick: function(){
		if (this.props.img=='img/loading60.gif' || this.props.img=='img/loadno60.gif'){
			console.log(this.props.tleft+':  '+this.props.img);
			this.props.onButClick();
		}
	
	},	
	render: function(){
		return (
			<div>
			    <a onClick={this.handleTimerButClick}>
			      	<div style={this.sbBut().div} >
			      		<div style={this.sbBut().span}>{this.props.tleft}</div> 
				    </div>
				</a>    
			</div>
			)
	}
});

module.exports = But;