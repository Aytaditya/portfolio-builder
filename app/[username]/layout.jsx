import React from 'react'
import Provider from './Provider'

const layout = ({children}) => {
  return (
    <div>
      <Provider>
        {children}
      </Provider>
    </div>
  )
}

export default layout
