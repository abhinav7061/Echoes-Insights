import React, { useState, useRef } from 'react';
import TemplateBtn from './templateBtn';
import useOutsideClick from '../../hooks/useOutsideClick';
import ShareSocialList from './shareSocialList';

const ShareBtn = ({ url, showName = false, icon = 'arrow-redo-outline', name = 'Share', className = '', btnClassName = '', shareBtnsClassName = '-left-5 bottom-4' }) => {
    const [showByHover, setShowByHover] = useState(false);
    const [showByClick, setShowByClick] = useState(false);
    const shareRef = useRef();
    useOutsideClick(shareRef, () => {
        setShowByHover(false);
        setShowByClick(false);
    });

    return (
        <span ref={shareRef} className={`relative flex items-center ${className}`} onMouseLeave={() => setShowByHover(false)}>
            <TemplateBtn
                icon={icon}
                title='Share the blog'
                onClick={() => {
                    setShowByClick(!showByClick);
                    setShowByHover(false);
                }}
                onMouseEnter={() => setShowByHover(true)}
                showName={showName}
                className={btnClassName}
                name={name}
            />
            {(showByHover || showByClick) && <ShareSocialList className={shareBtnsClassName} url={url} title='Checkout this amazing blog' />}
        </span>
    );
};

export default ShareBtn;
