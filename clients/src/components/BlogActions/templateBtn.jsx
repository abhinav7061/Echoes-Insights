import React from 'react'

const TemplateBtn = ({ name, showName = false, icon, onClick, title, className = '', onMouseEnter, onMouseLeave, iconClassName = '', loading = false, children }) => {
    return (
        <span
            className={`dark:text-neutral-200 hover:text-blue dark:hover:text-golden flex gap-1 items-center ${loading ? "opacity-70 cursor-not-allowed pointer-events-none" : "cursor-pointer"} ${className}`}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            title={title}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <p className={`flex ${loading ? "animate-spin" : ""} ${iconClassName}`}><ion-icon name={loading ? 'reload-circle-outline' : icon}></ion-icon></p>
            {children}
            {showName && <p className="whitespace-nowrap"> {loading ? "wait..." : name}</p>}
        </span>
    )
}

export default TemplateBtn