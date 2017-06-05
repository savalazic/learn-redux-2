import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export default (props) => {
  return (
    <div>
      <Sparklines height={50} width={180} data={props.data}>
        <SparklinesLine color={props.color}></SparklinesLine>
      </Sparklines>
    </div>
  )
}