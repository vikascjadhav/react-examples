import React from 'react';
import MyForm from './MyForm';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let value = 'value1';
		return (
			<div> 
				<MyForm value={value}/>
			</div>);
	}
}