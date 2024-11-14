import React from 'react'
import Category from './Category'

const BlogSearchSort = ({ className, search, handleSearchChange, setSort, onSubmit, placeholder }) => {
    return (
        <form className={`max-w-xl ${className}`} onSubmit={onSubmit}>
            <div className="flex">
                <Category onSelect={(category) => setSort(category)} />

                <div className="relative w-full ">
                    <input
                        type="search"
                        className="block p-2 lg:p-2.5 w-full z-20 text-xs ss:text-sm text-gray-900 bg-slate-100 dark:bg-slate-800 focus:bg-slate-50 rounded-e-lg border-y border-sky-300 md:00 dark:placeholder-slate-400 dark:text-white outline-none"
                        placeholder={placeholder || "Search Blogs..."}
                        value={search}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="absolute top-0 end-0 py-2 lg:py-2.5 text-xs ss:text-sm font-bold h-full rounded-e-lg bg-blue-gradient text-black px-4">
                        Search
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default BlogSearchSort