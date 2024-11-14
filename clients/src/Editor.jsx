import React, { useRef, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor({ value, onChange }) {
    const quillRef = useRef(null);

    useEffect(() => {
        const editor = quillRef.current.getEditor();
        const root = editor.root;

        // Function to add IDs to headings
        const addIdsToHeadings = () => {
            const headings = root.querySelectorAll('h1, h2, h3, h4, h5, h6');
            headings.forEach((heading, index) => {
                const id = `section-${index}`;
                heading.setAttribute('id', id);
            });
        };

        addIdsToHeadings();

        // Optional: Run the function on content change
        editor.on('text-change', addIdsToHeadings);

        // Prevent default behavior for internal links
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

        root.addEventListener('click', handleClick);

        return () => {
            root.removeEventListener('click', handleClick);
        };
    }, []);

    const modules = {
        // placeholder: 'Compose an epic...',
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
        <ReactQuill
            ref={quillRef}
            placeholder={'Compose an epic...'}
            value={value}
            theme={'snow'}
            onChange={onChange}
            modules={modules}
            style={{
                backgroundColor: 'rgb(199, 195, 195)',
                color: 'black',
            }}
            require
        />
    );
}
