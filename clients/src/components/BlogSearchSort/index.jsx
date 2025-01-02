import React from 'react'
import Category from './Category'
import Button from '../Button'

const BlogSearchSort = ({ className, search, handleSearchChange, setSort, onSubmit, placeholder }) => {
    return (
        <form className={`max-w-xl ${className}`} onSubmit={onSubmit}>
            <div className="flex">
                <Category onSelect={(category) => setSort(category)} />
                <div className="relative w-full overflow-hidden">
                    <input
                        type="search"
                        className="block p-2 lg:p-2.5 w-full z-20 text-xs ss:text-sm text-gray-900 bg-neutral-200 dark:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-700 rounded-e-lg border-y border-e  border-blue dark:border-neutral-700 dark:placeholder-neutral-400 dark:text-white outline-none"
                        placeholder={placeholder || "Search Blogs..."}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <Button title='Search' type='submit' className='top-[1px] end-[1px] h-[calc(100%-2px)] dark:h-full dark:top-0 dark:bottom-0 right-0 px-4 rounded-e-lg before:inset-[1px] text-sky-500' style={{ position: 'absolute' }} />
                </div>
            </div>
        </form>
    )
}

export default BlogSearchSort