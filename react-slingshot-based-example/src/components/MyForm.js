import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions'
import React from 'react';

class MyForm extends React.Component {
		constructor(props) {
		super(props);		
		this.state = { value: '' };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);	
	}

	handleSubmit(event) {
		this.props.actions.addToStore(this.state.value);
		this.props.actions.updateFromService();
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({ value :event.target.value });
		//this.props.actions.saveChangedValue(event.target.value);	
		event.preventDefault();	
	}
	render () {
		const listItems = this.props.values.map((value, index) =>
			<li  key={index}>{value}</li>
		);
		return (
			<div>
				<h1>Form</h1>
				<form>
					<label>
					Entered Value:
					<input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
					</label>
					<h4>Entered Value: {this.props.value}</h4>
					<input type="button" value="Submit" onClick={this.handleSubmit} />
					<ul>{listItems}</ul>,
				</form>
			</div>
			);
	}
}

//sudo tee /etc/modprobe.d/iwlwifi-opt.conf <<< "options iwlwifi 11n_disable=1"

MyForm.propTypes = {
  actions: PropTypes.object.isRequired,
  value: PropTypes.string,
  values: PropTypes.any
};

MyForm.defaultProps = {
	
}


function mapStateToProps(state) {
  return {
    value: state.app.value,
    values : state.app.values
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyForm);
