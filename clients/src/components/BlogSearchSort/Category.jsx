import React from 'react'

const Category = ({ className, onSelect }) => {
    const categories = ['Mockups', 'Templates', 'Styles', 'Modules', 'Design', 'Logos'];
    return (
        <select className={`flex-shrink-0 lg:py-2.5 px-2 text-xs ss:text-sm font-medium text-center text-slate-900 border border-sky-300 rounded-s-lg dark:bg-slate-800 cursor-pointer dark:hover:bg-slate-600 dark:text-white relative ${className}`}>
            <option onClick={() => onSelect('all')}>
                All Category
            </option>
            {
                categories.map((category, idx) => (
                    <option key={idx} onClick={() => onSelect(category)} className='cursor-pointer'>
                        {category}
                    </option>
                ))
            }
        </select>
    )
}

export default Category