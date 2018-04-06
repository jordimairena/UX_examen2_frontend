import React, { Component } from 'react'
import axios from 'axios'

class ClimaForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
      ciudad: this.props.clima.ciudad,
      temp: this.props.clima.temp,
			estado: this.props.clima.estado
		}
	}

  handleInput = (e) => {
		this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const clima = {ciudad: this.state.ciudad, temp: this.state.temp, estado: this.state.estado }
    axios.put(`https://ux-examen2backend.herokuapp.com/api/v1/climas${this.props.clima.id}`,{clima: clima})
    .then(response => {
      console.log(response)
      this.props.updateClima(response.data)
    })
    .catch(error => console.log(error))
  }
	//ref={this.props.titleRef}
	//value={this.state.body} onChange={this.handleInput}>
	render() {
    return (
      <div className="tile">
      	<form onBlur={this.handleBlur}>
					<input className='input' type="text" name="ciudad" placeholder='Ingrese nombre de ciudad'
						value={this.state.ciudad} onChange={this.handleInput}/>
					<input className='input' type="integer" name="temp" placeholder='Ingrese Temperatura'
						value={this.state.temp} onChange={this.handleInput}/>
					<input className='input' type="text" name="estado" placeholder='Ingrese Estado'
						value={this.state.estado} onChange={this.handleInput}/>
      	</form>
      </div>
    );
  }
}

export default ClimaForm
