import { useState } from "react";
const ContentPreviewModal = ({ content, onApprove, onReject, onRequestChanges, onClose }) => {
    const [rejectReason, setRejectReason] = useState('');
    const [feedback, setFeedback] = useState('');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-6 flex justify-between items-center border-b border-neutral-200 dark:border-neutral-700">
                    <h2 className="text-xl font-bold">{content.title}</h2>
                    <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700" title="'close">
                        <ion-icon name="close-outline" className="text-xl"></ion-icon>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <div className="mb-6">
                        <div className="flex gap-4 mb-4">
                            <div>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">Author:</span>
                                <span className="ml-2 font-medium">{content.author}</span>
                            </div>
                            <div>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">Type:</span>
                                <span className="ml-2 font-medium capitalize">{content.type}</span>
                            </div>
                            <div>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">Submitted:</span>
                                <span className="ml-2 font-medium">{content.submitted}</span>
                            </div>
                        </div>

                        {content.flags > 0 && (
                            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mb-4">
                                <h3 className="font-medium text-red-700 dark:text-red-300 flex items-center gap-2">
                                    <ion-icon name="flag-outline"></ion-icon>
                                    {content.flags} flag{content.flags !== 1 ? 's' : ''} reported
                                </h3>
                                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                                    This content has been flagged by users for review.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content.content }}></div>
                </div>

                <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/30 rounded-b-xl">
                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <div className="flex gap-2">
                            <button
                                onClick={onApprove}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2"
                            >
                                <ion-icon name="checkmark-outline"></ion-icon>
                                Approve
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => document.getElementById('rejectDropdown').classList.toggle('hidden')}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2"
                                >
                                    <ion-icon name="close-outline"></ion-icon>
                                    Reject
                                </button>
                                <div
                                    id="rejectDropdown"
                                    className="hidden absolute left-0 mt-1 w-48 bg-white dark:bg-neutral-800 rounded-md shadow-lg z-10 border border-neutral-200 dark:border-neutral-700"
                                >
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            value={rejectReason}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                            placeholder="Reason for rejection"
                                            className="w-full p-2 mb-2 border border-neutral-300 dark:border-neutral-600 rounded dark:bg-neutral-700"
                                        />
                                        <button
                                            onClick={() => {
                                                if (rejectReason.trim()) {
                                                    onReject(rejectReason);
                                                }
                                            }}
                                            className="w-full px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                                        >
                                            Confirm Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Feedback for changes"
                                className="flex-1 p-2 border border-neutral-300 dark:border-neutral-600 rounded-lg dark:bg-neutral-700"
                            />
                            <button
                                onClick={() => {
                                    if (feedback.trim()) {
                                        onRequestChanges(feedback);
                                    }
                                }}
                                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg"
                            >
                                Request Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentPreviewModal;