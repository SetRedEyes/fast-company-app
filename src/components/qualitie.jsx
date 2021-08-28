import React from 'react'

const Qualitie = ({ color, name, _id }) => {
  return (
    <span className={`badge bg-${color} ms-2`} key={_id}>
      {name}
    </span>
  )
}

export default Qualitie
