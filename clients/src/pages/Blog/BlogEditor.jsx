import React, { useState, useEffect } from 'react'
import Editor from '../../Editor'
import Button from '../../components/Button'
import BlogContents from '../../components/BlogContents';
import addIdsToHeadingsInContents from '../../lib/addIdsToHeadingsInContents';
import preprocessContent from '../../lib/preprocessContent';

const BlogEditor = ({ onSubmit, title, setTitle, summary, setSummary, setFiles, content, setContent, isUpdate = false, loading = false }) => {

    const [preview, setPreview] = useState(false);

    const handleLinkClick = (event) => {
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

    useEffect(() => {
        document.addEventListener('click', handleLinkClick);
        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);
    return (
        <div className={`py-10`}>
            {
                preview ? (
                    <div>
                        <Button type={'button'} className={'px-3 py-1 mt-3 rounded-md'} title={`${preview ? 'Hide Preview' : 'Preview'}`} onClick={() => { window.scrollTo(0, 0); setPreview(pre => !pre) }} />
                        {/* <div className="content mt-7 p-8 border border-sky-500 rounded-2xl" dangerouslySetInnerHTML={{ __html: content }} /> */}
                        <BlogContents content={preprocessContent(addIdsToHeadingsInContents(content))} className="content mt-7 p-8 border border-blue dark:border-golden rounded-2xl" />
                    </div>
                ) : (
                    <form onSubmit={onSubmit}>
                        <div className=' flex flex-col'>
                            <input
                                type="title"
                                placeholder={'Title'}
                                value={title}
                                onChange={ev => setTitle(ev.target.value)}
                                className='py-1 px-3 mb-6 rounded-md outline-none'
                            />
                            <input
                                type="summary"
                                placeholder={'Summary'}
                                value={summary}
                                onChange={ev => setSummary(ev.target.value)}
                                className='py-1 px-3 mb-6 rounded-md outline-none'
                            />
                            <input
                                type="file"
                                onChange={ev => setFiles(ev.target.files)}
                                className='border mb-6 p-1'
                            />
                        </div>
                        <Editor onChange={setContent} value={content} />
                        <span className='flex gap-4 mt-4'>
                            <Button type={'submit'} className={`px-3 py-1 rounded-md ${loading ? "opacity-80 pointer-events-none cursor-wait" : ""}`} title={isUpdate ? `${loading ? 'Updating..' : 'Update'} Blog` : `${loading ? 'Creating..' : 'Create'} Blog`} />
                            <Button type={'button'} className={'px-3 py-1 rounded-md'} title={`${preview ? 'Hide Preview' : 'Preview'}`} onClick={() => { window.scrollTo(0, 0); setPreview(pre => !pre) }} />
                        </span>
                    </form>
                )
            }
        </div>
    )
}

export default BlogEditor