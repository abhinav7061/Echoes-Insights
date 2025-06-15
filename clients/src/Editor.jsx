import React, { useRef, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
    const quillRef = useRef(null);
    const [selectionRange, setSelectionRange] = useState(null);
    const [showFloatingToolbar, setShowFloatingToolbar] = useState(false);
    const [floatingToolbarPosition, setFloatingToolbarPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();
        const root = editor.root;

        // Add IDs to headings
        const addIdsToHeadings = () => {
            const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach((heading, index) => {
                const id = `section-${index}`;
                heading.setAttribute('id', id);
            });
        };

        // Handle text selection changes
        const handleSelectionChange = (range) => {
            if (range && range.length > 0) {
                setSelectionRange(range);

                // Get bounding rect of selection
                const bounds = editor.getBounds(range.index, range.length);
                setFloatingToolbarPosition({
                    top: bounds.top - 20,
                    left: bounds.left
                });
                setShowFloatingToolbar(true);
            } else {
                setShowFloatingToolbar(false);
            }
        };

        // Handle click events for internal links
        const handleClick = (event) => {
            const target = event.target;
            if (target.tagName === 'A' && target.href.startsWith(window.location.href + '#')) {
                event.preventDefault();
                const id = target.getAttribute('href').substring(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        addIdsToHeadings();
        editor.on('text-change', addIdsToHeadings);
        editor.on('selection-change', handleSelectionChange);
        root.addEventListener('click', handleClick);

        return () => {
            editor.off('text-change', addIdsToHeadings);
            editor.off('selection-change', handleSelectionChange);
            root.removeEventListener('click', handleClick);
        };
    }, []);

    // Format selected text
    const formatText = (format, value) => {
        if (quillRef.current && selectionRange) {
            const editor = quillRef.current.getEditor();
            editor.formatText(selectionRange.index, selectionRange.length, format, value);
            setShowFloatingToolbar(false);
        }
    };

    const modules = {
        syntax: true,
        toolbar: [
            [{ 'font': [] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'code'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean'],
        ],
    };

    return (
        <div className="relative">
            <ReactQuill
                ref={quillRef}
                placeholder={'Compose an epic...'}
                value={value}
                theme={'snow'}
                onChange={onChange}
                modules={modules}
            />

            {/* Floating format toolbar */}
            {showFloatingToolbar && (
                <div
                    className="floating-toolbar bg-neutral-100 dark:bg-neutral-800 rounded-md shadow dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] p-2 flex gap-2 z-50 absolute"
                    style={{
                        top: `${floatingToolbarPosition.top}px`,
                        left: `${floatingToolbarPosition.left}px`
                    }}
                >
                    <button className='cursor-pointer p-1.5 rounded flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300' onClick={() => formatText('bold', true)}>
                        <strong>Aa</strong>
                    </button>
                    <button className='cursor-pointer p-1.5 rounded flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300' onClick={() => formatText('italic', true)}>
                        <i>Aa</i>
                    </button>
                    <button className='cursor-pointer p-1.5 rounded flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300' onClick={() => formatText('underline', true)}>
                        <span className="underline">Aa</span>
                    </button>
                    <button className='cursor-pointer p-1.5 rounded flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300' onClick={() => formatText('color', '#000000')}>
                        <ion-icon name="color-fill"></ion-icon>
                    </button>
                    <button className='cursor-pointer p-1.5 rounded flex items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300' onClick={() => formatText('link', prompt('Enter URL:'))}>
                        <ion-icon name="link"></ion-icon>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Editor;