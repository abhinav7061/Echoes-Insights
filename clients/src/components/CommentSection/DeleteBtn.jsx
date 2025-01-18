import React, { useState } from 'react'
import TemplateBtn from '../BlogActions/templateBtn';
import WarningPrompt from '../CustomPopup/WarningPrompt';

const DeleteBtn = ({ handleDelete, type, className }) => {
    const [showPrompt, setShowPrompt] = useState(false);
    const handleAcceptance = async (accepted) => {
        if (accepted) {
            await handleDelete();
        }
        setShowPrompt(false);
    }
    return (
        <div className={`${className}`}>
            <TemplateBtn
                name="Delete"
                icon='trash'
                showName={true}
                title={`delete this ${type}`}
                onClick={() => setShowPrompt(true)}
            />
            <WarningPrompt
                visibility={showPrompt}
                warningMessage={`Are you sure you want to delete this ${type}?`}
                onClose={(val) => setShowPrompt(val)}
                setAccepted={handleAcceptance}
            />
        </div>
    )
}

export default DeleteBtn