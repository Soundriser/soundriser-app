import React from 'react'
import './CheckboxItem.module.css';

interface props {
 value : string
 label: string;
 sub: string;
 onClick: () => void;
 checked: boolean;
}


const  CheckboxItem : React.FC<props> = (props) => { 
    const {
        value,
        sub,
        label,
        onClick,
        checked,
        ...rest
      } = props
  
    
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="flex items-center mb-2">
          <input id={value} onClick={onClick} checked={checked} type="checkbox" value="" className="cursor-pointer w-[20px] h-[20px] accent-[#F99940] bg-gray-100 outline-none bg-white rounded text-white"/>
          <label htmlFor={value} className="ml-2 font-medium text-[#6b755a] cursor-pointer"><span className='font-bold'>{label}</span> <span className='text-xs'>{sub}</span></label>
      </div>

    </div>
  )
}

export default CheckboxItem