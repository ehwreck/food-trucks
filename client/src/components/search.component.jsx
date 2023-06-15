import React from 'react';

export default function Search({placeholder, className, setSearchText}){

  const onChangeHandler = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <input type='search' placeholder={placeholder} className={className} onChange={onChangeHandler}/>
  )
}