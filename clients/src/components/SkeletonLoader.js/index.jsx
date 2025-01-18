const SkeletonDiv = ({ className, children, style }) => {
    return <div
        className={`bg-neutral-400 dark:bg-neutral-600 mb-1 xs:mb-1.5 relative overflow-hidden ${className}`}
        style={style}
    >
        {children}
    </div>
}

export default SkeletonDiv;