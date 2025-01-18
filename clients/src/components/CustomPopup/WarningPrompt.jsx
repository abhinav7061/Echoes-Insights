import { useState, useEffect } from 'react'
import CustomPopup from '.';

const WarningPrompt = ({ visibility, onClose, warningMessage = '', setAccepted }) => {
    const [showPopup, setShowPopup] = useState(false);
    const popupCloseHandler = () => {
        setShowPopup(false);
        onClose(false);
    };

    useEffect(() => {
        setShowPopup(visibility);
    }, [visibility]);

    return (
        <CustomPopup
            onClose={popupCloseHandler}
            visibility={showPopup}
        >
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-neutral-400 w-12 h-12 dark:text-neutral-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-neutral-700 dark:text-neutral-300">{warningMessage}</h3>
                <button
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-neutral-900 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 hover:text-blue-700 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700"
                    onClick={() => setAccepted(true)}
                >
                    Yes, I'm sure
                </button>
                <button
                    type="button"
                    className="text-white ms-3 bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    onClick={() => setAccepted(false)}
                >
                    No, cancel
                </button>
            </div>
        </CustomPopup>
    )
}

export default WarningPrompt