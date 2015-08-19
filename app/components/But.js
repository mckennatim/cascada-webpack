var React = require('react');

var But = new React.createClass({
	getInitialState: function(){
		return {}
	},
	componentDidMount: function(){
		return {}
	},
	sbBut: function(){
		var ima = this.props.imginfo.img;
		var st = {sz:60, left:'42%', top:'30%'};
		var bu = {bs: '', hover: {}};
		if (this.props.imginfo.clickable){
			bu.bs =  'inset 0px 1px 0px #3e9cbf, 0px 5px 0px 0px #205c73, 0px 10px 5px #999';
		}
		return {
			div: {
				float: 'right',
				borderRadius: '10',
				height: st.sz,
				width: st.sz,
				background: 'white',
				backgroundImage: 'url('+ima+')',
				backgroundSize: st.sz,
				boxShadow: bu.bs
			},
			li: {

			},
		 	span: {
		 	  color: 'black',
			  position: 'relative',
			  left:st.left,
			  top:st.top
		 	},
		 	a: {
		 	}			
		}

	},
	handleTimerButClick: function(){
		//if (this.props.imginfo.img=='img/loading60.gif' || this.props.imginfo.img=='img/loadno60.gif'){
		if (this.props.imginfo.clickable){
			console.log(this.props.message+':  '+this.props.imginfo.img);
			this.props.onButClick();
		}
	
	},	
	render: function(){
		return (
			<div>
			    <a style={this.sbBut().a} onClick={this.handleTimerButClick}>
			      	<div style={this.sbBut().div} >
			      		<div style={this.sbBut().span}>{this.props.message}</div> 
				    </div>
				</a> 

			</div>
			)
	}
});

module.exports = But;