import React from 'react'
import { browserHistory } from 'react-router'

export const GoBack = () => (
  <div className="">
    <button onClick={browserHistory.goBack}>Back</button>
  </div>
)