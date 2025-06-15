import React, { useState, useEffect } from 'react'
import Editor from '../../Editor'
import Button from '../../components/Button'
import BlogContents from '../../components/BlogContents';
import addIdsToHeadingsInContents from '../../lib/addIdsToHeadingsInContents';
import preprocessContent from '../../lib/preprocessContent';
import { FileUpload } from '../../components/Inputs/fileUpload';
import Input from '../../components/Inputs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import getBlogSchema from '../../schemas/blog';

const BlogEditor = ({ onSubmit, title = '', summary = '', content = '', isUpdate = false, loading = false }) => {

    const [preview, setPreview] = useState(false);
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(getBlogSchema(!isUpdate)),
        defaultValues: {
            title,
            summary,
            content,
            cover: null
        }
    })

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
    }, [])
    return (
        <div className={`py-10`}>
            {
                preview ? (
                    <div>
                        <Button type={'button'} className={'px-3 py-1 mt-3 rounded-md'} title={`${preview ? 'Hide Preview' : 'Preview'}`} onClick={() => { window.scrollTo(0, 0); setPreview(pre => !pre) }} />
                        <BlogContents content={preprocessContent(addIdsToHeadingsInContents(watch('content')))} className="content mt-7 p-8 border border-blue dark:border-golden rounded-2xl" />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="title" label="Title" control={control} required />
                        <Input name="summary" label="Summary" control={control} required />
                        <FileUpload name="cover" control={control} label="Cover Image" accept="image/*" maxSize={2 * 1024 * 1024} required={!isUpdate} />
                        <Editor value={watch('content')} onChange={(val) => setValue("content", val, { shouldValidate: true })} />
                        <p className='text-red-500 text-xs mt-1'>{errors?.content?.message}</p>
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