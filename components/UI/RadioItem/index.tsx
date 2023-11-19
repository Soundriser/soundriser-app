import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group';
import {CheckIcon} from '../../Icons'
import cn from 'clsx'
import s from './RadioItem.module.css'

interface props {
 value : string
 variant?: any
}


const  RadioItem : React.FC<props> = (props) => { 
    const {
        value,
        variant = 'default',
        ...rest
      } = props
  
  
    const rootClassName = cn(
      s.root,
      {
        [s.dark]: true
      
      }
    )
    
  return (
    <RadioGroup.Item value = {value} title='Test'  className={rootClassName}  > 
        <RadioGroup.Indicator className="absolute">
            <span>{value}</span>
        </RadioGroup.Indicator>
    </RadioGroup.Item>
  )
}

export default RadioItem