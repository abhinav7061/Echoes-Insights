import React from 'react'

const Error = ({ showError, error }) => {
  return (showError && error) ? (
    <p className="text-red-500 text-xs mt-1">{error.message}</p>
  ) : null
}

export default Error