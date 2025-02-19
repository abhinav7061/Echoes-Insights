import { useEffect, useState, useRef } from "react";
import { toast } from 'sonner'
import useTextSelection from "../../hooks/useTextSelection";
import ShareSocialList from "../BlogActions/shareSocialList";
import CopyBtn from "../BlogActions/copyBlogLink";

const BlogContents = ({ content, className }) => {
    const [isContentLoaded, setIsContentLoaded] = useState(false);
    const contentRef = useRef(null);
    const { text: selectedText, x, y } = useTextSelection(contentRef);
    const [sharePosition, setSharePosition] = useState({ top: 0, left: 0 });
    const [shareUrl, setShareUrl] = useState('');
    const currentUrl = window.location.href;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const addStylesCopyBtn = () => {
        const snippets = document.querySelectorAll('.ql-syntax');
        const numberOfSnippets = snippets.length;
        for (let i = 0; i < numberOfSnippets; i++) {
            const currentSnippet = snippets[i];

            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'relative bg-neutral-100 dark:bg-neutral-800 mt-4 rounded-lg border border-neutral-300 dark:border-neutral-800';

            const lngDiv = document.createElement('div');
            lngDiv.className = 'px-4 py-1.5 sm:py-2 rounded-t-lg bg-transparent flex justify-end items-center sticky z-10 top-[70px]';

            const copyButton = document.createElement('button');
            copyButton.className = 'px-2 text-[14px] py-[4px] flex items-center gap-1 rounded bg-neutral-100 dark:bg-neutral-800 cursor-pointer';
            const copyHtml = '<ion-icon name="copy-outline"></ion-icon><p style="font-size: 11px; line-height:12px;">Copy code</p>';
            copyButton.innerHTML = copyHtml;

            // Add the click event listener for the copy functionality
            copyButton.addEventListener('click', function () {
                let code = snippets[i].textContent; // get the text content
                navigator.clipboard.writeText(code).then(() => {
                    this.innerHTML = '<span style="display: flex; gap: 4px; align-items: center; color: #128617"><ion-icon name="checkmark-circle"></ion-icon> <p style="font-size: 11px; line-height:12px;">Copied!</p></span>';
                    setTimeout(() => {
                        this.innerHTML = copyHtml;
                    }, 1000);
                }).catch(err => {
                    console.error('Failed to copy code: ', err);
                    this.innerText = 'Failed!';
                    setTimeout(() => {
                        this.innerHTML = copyHtml;
                    }, 1000);
                });
            });

            const lngName = document.createElement('span');
            lngName.className = 'text-[11px] absolute top-2 sm:top-2.5 left-4 z-[15]';
            const detectedLanguage = hljs.highlightAuto(snippets[i]?.textContent).language || 'Plain Text'
            lngName.innerText = detectedLanguage;
            wrapperDiv.appendChild(lngName);
            lngDiv.appendChild(copyButton);
            wrapperDiv.appendChild(lngDiv);
            currentSnippet.parentNode.insertBefore(wrapperDiv, currentSnippet);
            wrapperDiv.appendChild(currentSnippet);
        }
    };

    const addLinkToHeadings = () => {
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
            if (!heading.id) {
                return;
            }
            heading.classList.add("relative", "group", 'hover:underline', 'cursor-pointer')
            heading.setAttribute('aria-hidden', 'true');
            heading.setAttribute('title', 'copy link of this heading');

            const linkIcon = document.createElement('span');
            linkIcon.innerHTML = '🔗';
            linkIcon.className = "w-7 cursor-pointer font-thin dark:text-neutral-400 text-neutral-800 absolute -left-5 text-base hidden group-hover:block top-1"

            heading.appendChild(linkIcon);

            heading.addEventListener('click', () => {
                const url = `${currentUrl}#${heading.id}`;
                navigator.clipboard.writeText(url).then(() => {
                    toast.success('Link copied to clipboard', { position: "top-center" });
                }).catch((err) => {
                    console.error('Failed to copy: ', err);
                });
            });
        });
    }

    const scrollToElement = (element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - 80;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (isContentLoaded) {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const element = document.getElementById(hash);
                if (element) {
                    scrollToElement(element);
                }
            }
            const urlToShare = currentUrl.startsWith(`${baseUrl}/blog/`)
                ? `\n\nVisit ${currentUrl} for more details and full article`
                : `\n\nVisit ${baseUrl} for more`;
            setShareUrl(urlToShare);
        }
    }, [isContentLoaded]);

    useEffect(() => {
        if (content) {
            setIsContentLoaded(true);
        }
        addStylesCopyBtn();
        addLinkToHeadings();
    }, [content]);

    useEffect(() => {
        const handleResize = () => {
            if (contentRef.current) {
                const containerWidth = contentRef.current.offsetWidth;
                const containerLeftPosition = contentRef.current.offsetLeft;
                const shareWidth = window.innerWidth > 1024 ? 220 : 180;

                let top = y + 20;
                let left = x - shareWidth / 2;

                if (left + shareWidth > containerWidth + containerLeftPosition) {
                    left = containerWidth + containerLeftPosition - shareWidth;
                    left = left + shareWidth > window.innerWidth ? window.innerWidth - shareWidth : left;
                } else {
                    left = left < -10 ? -10 : left;
                }

                setSharePosition({ top, left });
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [selectedText, x, y]);

    return (
        <>
            <div
                ref={contentRef}
                className={`content ${className}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            {selectedText && (
                <ShareSocialList
                    url={shareUrl}
                    title={selectedText}
                    style={{ top: sharePosition.top, left: sharePosition.left }}
                    extraItems={[
                        <CopyBtn
                            btnClassName='text-blue dark:text-sky-500'
                            title="Copy selected text"
                            copy={selectedText}
                        />
                    ]}
                />
            )}
        </>
    )
}

export default BlogContents