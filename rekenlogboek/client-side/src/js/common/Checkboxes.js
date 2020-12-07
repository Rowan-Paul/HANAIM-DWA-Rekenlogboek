import React from 'react'

export default function Checkboxes() {
  const getCheckBoxOptions = () => { return props.checkboxes.map(checkbox => {
    return (
      <div></div>
    ) 
  })

  return ( 
    <div className="checkboxes">
      {getCheckBoxOptions()} 
	  </div>
  )
}
