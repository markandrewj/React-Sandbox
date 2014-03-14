/** @jsx React.DOM */
window.NewContact = React.createClass({


	getInitialState : function(){
		return {
			data : '',
			disabled: true,
			name : null,
			invalid: false
		}
	},

	getDefaultProps : function(){
		return {
			invalid : false
		}
	},
	handleSubmit: function(){
		this.props.invalid = true;
		var name = this.refs.name.getDOMNode().value.trim(),
			email = this.refs.email.getDOMNode().value.trim(),
			phone = this.refs.phone.getDOMNode().value.trim();
		if(name === '') {
			this.props.invalid = true;
			this.setState({
				invalid: true
			});
			return false;
		}
		this.props.onContactSubmit({name: name, email: email, phone: phone});


		this.refs.name.getDOMNode().value = '';
		this.refs.email.getDOMNode().value = '';
		this.refs.phone.getDOMNode().value = '';
		return false;

	},
	nameState : function(e){
		var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
			invalid = false;
		if(this.state.name !== ""){
			if(e.target.value.length > 3){
				this.setState({
					name : e.target.value,
					disabled : false
				});
			}
			if(EMAIL_REGEXP.test(this.state.email)){
				invalid = true;
				this.setState({
					disabled: false
				});
			}
		}
	},
	emailState : function(e){
		var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
		if(EMAIL_REGEXP.test(this.state.email)){
			invalid = true;
			this.setState({
				disabled: false
			});
		}
	},

	render: function(){
		return (
				React.DOM.form( {className:"large-6 columns", onSubmit:this.handleSubmit}, 
					React.DOM.fieldset(null, 
						React.DOM.legend(null, "Add New Contact"),
						React.DOM.label( {htmlFor:"name"}, 
							React.DOM.input( {type:"text", placeholder:"Name", ref:"name", value:this.state.name, onChange:this.buttonState})
						),

						React.DOM.label( {htmlFor:"email"}, 
							React.DOM.input( {type:"email", placeholder:"Email", onChange:this.emailState, value:this.state.email, ref:"email"})
						),
						React.DOM.label( {htmlFor:"phone"}, 
							React.DOM.input( {type:"text", placeholder:"Phone Number", value:this.state.phone, ref:"phone"})
						),

						React.DOM.button( {type:"submit", className:"button {this.state.disabled ? 'disabled' : ''}"}, "Save")
					)
				)
			)

	}
});
//React.renderComponent(<NewContact />, document.getElementById("example"));