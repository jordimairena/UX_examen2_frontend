import React from 'react'

const Clima = ({clima}) =>
<div className="tile" key={clima.id}>
  <h4> {clima.ciudad}</h4>
  <p>{clima.temp}</p>
  <p>{clima.estado}</p>
</div>

export default Clima
