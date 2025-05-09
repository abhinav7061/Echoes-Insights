const ReviewSidebar = ({ stats, onQuickAction }) => {
    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 rounded-xl shadow-sm p-6 space-y-6 sticky top-6">
            <div>
                <h2 className="text-lg font-semibold mb-3">Review Stats</h2>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Pending Review</span>
                        <span className="font-medium">{stats.pending}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Flagged Content</span>
                        <span className="font-medium">{stats.flagged}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Approved Today</span>
                        <span className="font-medium">{stats.approvedToday}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-neutral-600 dark:text-neutral-400">Avg. Review Time</span>
                        <span className="font-medium">{stats.avgReviewTime}</span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
                <div className="space-y-2">
                    <button
                        onClick={() => onQuickAction('approve-all-pending')}
                        className="w-full px-3 py-2 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg flex items-center gap-2"
                    >
                        <ion-icon name="checkmark-outline"></ion-icon>
                        Approve All Pending
                    </button>
                    <button
                        onClick={() => onQuickAction('view-flagged')}
                        className="w-full px-3 py-2 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg flex items-center gap-2"
                    >
                        <ion-icon name="flag-outline"></ion-icon>
                        View Flagged Only
                    </button>
                    <button
                        onClick={() => onQuickAction('view-reports')}
                        className="w-full px-3 py-2 text-sm bg-sky-100 hover:bg-sky-200 dark:bg-sky-900/20 dark:hover:bg-sky-900/30 text-sky-800 dark:text-sky-200 rounded-lg flex items-center gap-2"
                    >
                        <ion-icon name="alert-circle-outline"></ion-icon>
                        View Reported Content
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-3">Review Guidelines</h2>
                <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
                    <li className="flex items-start gap-2">
                        <ion-icon name="checkmark-circle-outline" className="text-green-500 mt-0.5"></ion-icon>
                        Check for plagiarism
                    </li>
                    <li className="flex items-start gap-2">
                        <ion-icon name="checkmark-circle-outline" className="text-green-500 mt-0.5"></ion-icon>
                        Verify factual accuracy
                    </li>
                    <li className="flex items-start gap-2">
                        <ion-icon name="checkmark-circle-outline" className="text-green-500 mt-0.5"></ion-icon>
                        Ensure proper formatting
                    </li>
                    <li className="flex items-start gap-2">
                        <ion-icon name="checkmark-circle-outline" className="text-green-500 mt-0.5"></ion-icon>
                        Check for inappropriate content
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ReviewSidebar;