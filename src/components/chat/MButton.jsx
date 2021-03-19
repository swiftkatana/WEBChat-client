import React from 'react'

export default function MButton({ text, ...rest }) {
  return (
    <button {...rest} >{text}</button>
  )
}
