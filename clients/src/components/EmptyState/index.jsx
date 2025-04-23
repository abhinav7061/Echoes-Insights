const EmptyState = ({ icon, title, messages }) => {
    return (
        <div className="py-1 px-7">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
                {icon} {title}
            </h1>
            <div className='ms-4'>
                {messages.map((msg, index) => (
                    <p key={index} className="text-neutral-500">{msg}</p>
                ))}
            </div>
        </div>
    );
};

export default EmptyState;
