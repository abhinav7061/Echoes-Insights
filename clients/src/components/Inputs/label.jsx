import React from 'react'
import { cn } from '../../lib/utils'

const Label = ({ label, required, className, ...rest }) => {
    return label ? (
        <label className={cn('block mb-1 font-medium', className)} {...rest}>
            {label}{required && <span className='text-red-500 ml-1'>*</span>}
        </label>
    ) : null
}

export default Label