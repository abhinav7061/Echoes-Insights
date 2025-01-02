import React from 'react'

const Category = ({ className, onSelect }) => {
    const categories = ['Mockups', 'Templates', 'Styles', 'Modules', 'Design', 'Logos'];
    return (
        <select className={`flex-shrink-0 lg:py-2.5 px-2 text-xs ss:text-sm font-medium text-center border border-blue dark:border-neutral-700 rounded-s-lg dark:bg-neutral-800 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 text-blue relative dark:text-neutral-400 ${className}`}>
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