import React from 'react'
import { cn } from '../../lib/utils'

const CancelBtn = ({ title="Cancel", className, ...rest }) => {
    return (
        <button
            className={cn("px-4 py-1 rounded-full border border-red-500 text-red-500 hover:bg-red-500 transition-colors duration-300 ease-in-out hover:text-white hover:shadow-[0px_0px_40px_5px_rgba(236,_7,_3,_0.5)]", className)}
            {...rest}
        >
            {title}
        </button>
    )
}

export default CancelBtn