import React from 'react'

export const Title = ({ children }) =>
{
  return (
    <h1 className="title is-size-1 has-text-weight-bold has-text-centered is-family-secondary">
      {children}
    </h1>
  )
}

export const Subtitle = ({ children }) =>
{
  return (
    <h3 className="subtitle is-size-2 has-text-centered has-text-weight-bold is-family-secondary">
      {children}
    </h3>
  )
}