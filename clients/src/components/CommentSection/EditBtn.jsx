import React, { useRef, useState } from 'react'
import TemplateBtn from '../BlogActions/templateBtn'
import CommentInputForm from './CommentInputForm';
import useOutsideClick from '../../hooks/useOutsideClick';

const EditBtn = ({ value, handleEdit, className }) => {
    const container = useRef();
    const [show, setShow] = useState(false);
    useOutsideClick(container, () => setShow(false));
    return (
        <div className={`relative w-full ${className}`}>
            <TemplateBtn
                className={`${show ? 'pointer-events-none' : ''}`}
                icon='create'
                showName={true}
                name='Edit'
                onClick={() => setShow(!show)}
            />
            {show && <div
                ref={container}
                className='absolute right-0 w-[400px] xs:w-[200px] ss:w-[250px] sm:w-[350px] md:w-[450px] max-w-[90vw] bg-neutral-200 px-4 py-2 rounded-lg dark:bg-neutral-700 xs:dark:bg-neutral-800  top-6 z-[100] shadow-sm shadow-neutral-400 dark:shadow-neutral-600 '
            >
                <CommentInputForm className='font-normal' value={value} onSubmit={(value) => handleEdit(value)} isReply={true} autoFocus={true} />
            </div>}
        </div>
    )
}

export default EditBtn