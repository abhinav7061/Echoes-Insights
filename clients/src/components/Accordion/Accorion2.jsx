import React from 'react'

const Accorion2 = ({ title, description }) => {
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg shadow-sm p-4">
            <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h3 className="font-medium text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {title}
                    </h3>
                    <ion-icon
                        name="chevron-down-outline"
                        className="text-neutral-500 group-hover:text-blue-500 transform group-open:rotate-180 transition-transform"
                    ></ion-icon>
                </summary>
                <p className="mt-2 text-neutral-500">
                    {description}
                </p>
            </details>
        </div>
    )
}

export default Accorion2