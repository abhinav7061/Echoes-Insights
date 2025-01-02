import React, { useState, useRef } from 'react';
import TemplateBtn from './templateBtn';
import { toast } from 'sonner';
import useOutsideClick from '../../hooks/useOutsideClick';
import Button from '../Button';

const ReportIssue = ({ blogId, icon = 'flag', showName, btnClassName, className }) => {
    const formRef = useRef();
    const [showReportForm, setShowReportForm] = useState(false);
    useOutsideClick(formRef, () => setShowReportForm(false));
    return (
        <span className={`relative flex items-center ${className}`}>
            <TemplateBtn
                icon={icon}
                title={`Report an issue`}
                onClick={() => setShowReportForm(true)}
                showName={showName}
                className={btnClassName}
                name={'Report an issue'}
            />
            {showReportForm && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-green-800/30 flex items-center justify-center text-black dark:text-white">
                    <div ref={formRef} className="bg-white dark:bg-neutral-700 p-4 rounded-md shadow-base w-96">
                        <h2 className="text-lg font-bold mb-4">Report an issue</h2>
                        <textarea
                            className="w-full p-2 border bg-transparent outline-none border-gray-300 focus:border-blue dark:focus:border-golden rounded-md mb-4"
                            placeholder="Describe the issue"
                        ></textarea>
                        <div className='flex gap-3'>
                            <Button title='Submit' onClick={() => {
                                toast.success('Issue reported successfully');
                                setShowReportForm(false);
                            }} className='px-4 py-2 rounded-md before:bg-gradient-to-br dark:before:from-neutral-600/80 dark:before:bg-neutral-600/20' />
                            <Button title='Cancel' onClick={() => setShowReportForm(false)} className='px-4 py-2 rounded-md hover:bg-gradient-to-br hover:from-red-500/60 hover:to-neutral-600/30 dark:before:bg-gradient-to-br dark:before:from-neutral-600/80 dark:before:bg-neutral-600/20' style={{ color: 'red' }} />
                        </div>
                    </div>
                </div>)}
        </span>
    )
}

export default ReportIssue