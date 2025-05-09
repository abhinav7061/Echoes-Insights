const Section = ({ title, children, className = '' }) => {
    return (
        <section className={`space-y-3 ${className}`}>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {title}
            </h3>
            {children}
        </section>
    );
};

export default Section;