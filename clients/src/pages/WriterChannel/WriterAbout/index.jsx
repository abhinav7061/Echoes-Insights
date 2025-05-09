import React from 'react';
import { useOutletContext } from 'react-router-dom';

const WriterAboutTab = () => {
    const { writer } = useOutletContext();

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">About {writer.name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-neutral-700 dark:text-neutral-300">
                        {writer.bio || 'No description provided.'}
                    </p>

                    <h3 className="font-medium mt-6 mb-2">Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Joined</p>
                            <p className="font-medium">January 2022</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Location</p>
                            <p className="font-medium">San Francisco, CA</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Website</p>
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                                janedoe.dev
                            </a>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Social</p>
                            <div className="flex gap-3">
                                <a href="#" className="text-blue-600 dark:text-blue-400">
                                    <ion-icon name="logo-twitter"></ion-icon>
                                </a>
                                <a href="#" className="text-blue-600 dark:text-blue-400">
                                    <ion-icon name="logo-github"></ion-icon>
                                </a>
                                <a href="#" className="text-blue-600 dark:text-blue-400">
                                    <ion-icon name="logo-linkedin"></ion-icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-medium mb-2">Stats</h3>
                    <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 space-y-3">
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Total views</p>
                            <p className="font-medium">124,842</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Subscribers</p>
                            <p className="font-medium">{writer.followers.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">Content</p>
                            <p className="font-medium">41 publications</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriterAboutTab;