import React from 'react'
import { cn } from '../../lib/utils'

const AcceptBtn = ({ title = "Accept", className, ...rest }) => {
    return (
        <button
            className={cn("px-4 py-1 rounded-full border border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white hover:shadow-[0px_0px_40px_5px_rgba(0,_0,_0,_0.5)] dark:border-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-black dark:hover:shadow-[0px_0px_40px_5px_rgba(255,_255,_255,_0.5)] transition-colors duration-300 ease-in-out", className)}
            {...rest}
        >
            {title}
        </button>
    )
}

export default AcceptBtn
