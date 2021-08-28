import React from 'react'

const SearchStatus = ({ length }) => {
  const renderPharse = (number) => {
    const badgeColor = number > 0 ? 'primary' : 'danger'
    let humans = 'человек тусанет'
    const lastOne = Number(number.toString().slice(-1))

    if ([2, 3, 4].indexOf(lastOne) >= 0) humans = 'человека тусанут'

    if (number > 4 && number < 15) humans = 'человек тусанет'

    if (lastOne === 0 || lastOne === 1) humans = 'человек тусанет'
    const pharse = number === 0 ? 'Никто с тобой не тусанет' : `${number} ${humans} с тобой сегодня`
    return <span className={`badge bg-${badgeColor}`}>{pharse}</span>
  }
  return <h3>{renderPharse(length)}</h3>
}

export default SearchStatus
