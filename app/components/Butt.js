var Radium = require('radium');
var React = require('react');

@Radium
class Butt extends React.Component{
	static propTypes = {
		kind: React.PropTypes.oneOf(['primary', 'warning']).isRequired
	};
	sbBut() {
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

	};
	render() {
		// Radium extends the style attribute to accept an array. It will merge
		// the styles in order. We use this feature here to apply the primary
		// or warning styles depending on the value of the `kind` prop. Since its
		// all just JavaScript, you can use whatever logic you want to decide which
		// styles are applied (props, state, context, etc).
		return (
			<div>
			<button
			key="button"
			style={[
				styles.base,
				this.sbBut().div
				]}>
				{this.props.children}
				
			</button>
			{Radium.getState(this.state, 'button', ':hover') ? (
          		<span>{' '}Hovering!</span>
        		) : null}
			</div>
		);
	}
};
//Butt=Radium(Butt)

// You can create your style objects dynamically or share them for
// every instance of the component.
var styles = {
  base: {
    color: '#fff',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
    }
  },

  primary: {
    background: '#0074D9'
  },

  warning: {
    background: '#FF4136'
  }
};

module.exports = Butt;