import React, { Component } from 'react';

import pin from './pin.svg';

export default class Venues extends Component {

	constructor(props){
		super(props);
	}

	showPopup(event){

	}

	render(){
		const style = {
		  position: 'absolute',
		  width: 30,
		  height: 30,
		  borderRadius: '50%',
		  textAlign: 'center',
		  fontSize: 16,
		  padding: 0,
		  fontWeight: 'bold',
		  backgroundSize: 'cover',
		  background: `url(${pin})`,   
		  };

		return (
			<div onClick={(event) => this.showPopup(event.target)} style={style}></div>
		)
	}
}