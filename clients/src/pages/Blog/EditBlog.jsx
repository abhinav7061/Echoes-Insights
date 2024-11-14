import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import BlogEditor from "./BlogEditor";
import addIdsToHeadingsInContents from "../../lib/addIdsToHeadingsInContents";
import preprocessContent from "../../lib/preprocessContent";
import ErrorMessage from "../../components/ErrorMessage";

const apiUrl = import.meta.env.VITE_API_URL;

export default function EditBlog() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)

    const getBlog = async (id) => {
        setLoading(true);
        setErrorMessage(null);
        try {
            const res = await fetch(`${apiUrl}/blog/getBlog/${id}`);
            const data = await res.json();
            if (res.ok && data.success) {
                setTitle(data.data.title);
                setContent(data.data.content);
                setSummary(data.data.summary);
            } else {
                throw new Error(data?.message || "error fetching the blog");
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlog(id);
    }, [id]);

    if (loading) {
        return <div className="opacity-50 w-full py-32 flex justify-center"><img src='/favicon.svg' alt="Loading..." className="w-1/6 h-1/6 animate-spin" /></div>;
    }
    if (errorMessage) {
        return <ErrorMessage heading='Unable to fetch blog' message={errorMessage} action={getBlog} />
    }

    async function updateBlog(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', preprocessContent(addIdsToHeadingsInContents(content)));
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        try {
            const response = await fetch(`${apiUrl}/blog/editBlog/${id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });
            const responseData = await response.json();
            console.log({ responseData });
            if (response.ok && responseData.success) {
                toast.success("Blog Updated!");
                navigate(`/blog/${id}`);
            }
            else {
                throw new Error(responseData.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <BlogEditor
            onSubmit={updateBlog}
            title={title}
            setTitle={setTitle}
            summary={summary}
            setSummary={setSummary}
            content={content}
            setContent={setContent}
            setFiles={setFiles}
            isUpdate={true}
        />
    );
}