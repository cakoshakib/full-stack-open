import React from 'react'

const Filter = ({handleFilterChange, newFilter}) => 
  <p>filter shown with <input onChange={handleFilterChange} value={newFilter}/></p>

export default Filter