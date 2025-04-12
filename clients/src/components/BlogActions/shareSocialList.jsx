import React from 'react'
import { shareSocialButtons } from '../../constants';

const ShareSocialList = ({ url, title, className, style, extraItems = [] }) => {
    return (
        <span className={`p-2 absolute ${className}`} style={style}>
            <div className="flex gap-3 dark:border border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shadow-md dark:shadow-neutral-800 rounded-lg py-2 px-3 md:px-5 z-10">
                {shareSocialButtons.map(({ Component, key, logoColor }, index) => (
                    <span className="up-down flex" style={{ animationDelay: `${index * 0.1}s` }} key={key} title={`Share on ${key}`}>
                        <Component url={url} title={title}>
                            <span className={`text-xl sm:text-2xl md:text-[28px] flex ${logoColor}`}>
                                <ion-icon name={`logo-${key}`}></ion-icon>
                            </span>
                        </Component>
                    </span>
                ))}
                {extraItems.map((ExtraItem, index) => (
                    <span className="up-down flex text-xl sm:text-2xl md:text-[28px]" style={{ animationDelay: `${(shareSocialButtons.length + index) * 0.1}s` }} key={`extra-${index}`}>
                        {ExtraItem}
                    </span>
                ))}
            </div>
        </span>
    );
};

export default ShareSocialList;