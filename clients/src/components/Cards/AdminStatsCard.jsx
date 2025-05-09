import React from 'react'
import { cn } from '../../lib/utils'

const AdminStatsCard = ({ name, desc, value, descClass }) => {
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{name}</p>
            <p className="text-2xl font-semibold">{value}</p>
            <p className={cn("text-sm text-green-600 dark:text-green-400 mt-1", descClass)}>{desc}</p>
        </div>
    )
}

export default AdminStatsCard