import React, { Component } from 'react';
import axios from 'axios'
import Clima from './Clima'
import ClimaForm from './ClimaForm'
import update from 'immutability-helper'

class ClimasContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      climas: [],
      editingClimaId: null,
      notification: ''
    }
  }

  componentDidMount(){
    // AQUI PONER LINK DE HEROKU
    axios.get('https://ux-examen2backend.herokuapp.com/api/v1/climas.json')
    .then(response => {
      console.log(response);
      this.setState({climas: response.data})
     })
    .catch(error => console.log(error))
  }
  addNewClima = () => {
    axios.post('https://ux-examen2backend.herokuapp.com/api/v1/climas', {clima: {ciudad: '', temp: '', estado: ''}})
    .then(response => {
      console.log(response);
      const climas = update(this.state.climas, { $splice: [[0,0,response.data]]})
      this.setState({climas: climas, editingClimaId: response.data.id})
     })
    .catch(error => console.log(error))
  }
  updateClima = (clima) => {
    const climaIndex = this.state.climas.findIndex(x => x.id === clima.id)
    const climas = update(this.state.climas, {[climaIndex]: { $set: clima }})
    this.setState({climas: climas, notification: "Cambios Guardados"})
  }
  resetNotification = () => {this.setState({notification: ''})}
  render() {
    return (
      <div>
        <div>
          <button className="newClimaButton" onClick={this.addNewClima} >
            Nuevo Clima
          </button>
          <span className="notification">
          {this.state.notification}
          </span>
        </div>
      {this.state.climas.map((clima) => {
        if(this.state.editingClimaId === clima.id) {
            return(<ClimaForm clima={clima} key={clima.id} updateClima={this.updateClima} resetNotification={this.resetNotification}/>)
          } else {
            return (<Clima clima={clima} key={clima.id}/>)
          }
      })}
      </div>
    );
  }
}

export default ClimasContainer;
