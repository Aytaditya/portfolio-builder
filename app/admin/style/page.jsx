import React from 'react'
import Preview from '../_components/Preview'
import ThemeOptions from './_components/ThemeOptions'

const Style = () => {
  return (

     <div className="p-5">
      <div className="grid grid:cols-1 lg:grid-cols-3  ">
      <div className="col-span-2">
      <ThemeOptions/>
      </div>
      <div>
        <Preview/>
      </div>
    </div>
    </div>
   
  )
}

export default Style
