import React from 'react'
import { resourceSections } from '../../../constants';

const Resources = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>

            {resourceSections.map((section, idx) => (
                <div key={idx} className="bg-neutral-50 dark:bg-neutral-900 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <ion-icon name={section.icon}></ion-icon>
                        {section.title}
                    </h3>
                    <ul className="space-y-3">
                        {section.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                                <a href={link.href} className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                                    <ion-icon name={link.icon}></ion-icon>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Resources