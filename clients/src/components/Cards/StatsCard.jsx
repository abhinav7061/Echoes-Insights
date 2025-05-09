import React from 'react'
import { cn } from '../../lib/utils'

const StatsCard = ({ name, value, changeType, change, className }) => {
    return (
        <div className={cn("bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6", className)}>
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{name}</p>
            <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-semibold">{value}</p>
                <span className={`ml-2 text-sm font-medium ${changeType === 'positive'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                    }`}>
                    {change}
                </span>
            </div>
        </div>
    )
}

export default StatsCard