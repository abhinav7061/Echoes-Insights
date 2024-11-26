import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import BlogEditor from './BlogEditor';
import addIdsToHeadingsInContents from '../../lib/addIdsToHeadingsInContents';
import preprocessContent from '../../lib/preprocessContent';

const apiUrl = import.meta.env.VITE_API_URL;

export default function CreateBlog() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(false);

    async function createNewPost(ev) {
        ev.preventDefault();
        if (title == '' || summary == '' || content == '' || !files) {
            toast.error('Please fill in all the fields');
            return;
        }
        setLoading(true);
        try {
            const data = new FormData();
            data.set('title', title);
            data.set('summary', summary);
            data.set('content', preprocessContent(addIdsToHeadingsInContents(content)));
            data.set('cover', files[0]);
            ev.preventDefault();
            const response = await fetch(`${apiUrl}/blog/createBlog`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: data,
                credentials: 'include'
            });
            const responseData = await response.json();
            console.log(responseData);
            if (response.ok && responseData.success) {
                toast.success("Blog created!");
                // setTitle("");
                // setSummary('');
                // setContent('')
                // setFiles(null);
                // navigate('/blog');
            } else {
                throw responseData.message;
            }
        } catch (error) {
            toast.error("Error while creating blog!");
            console.log("Error while creating blog:- ", error);
        } finally {
            // setTimeout(() => {
            setLoading(false);
            // }, 2000);
        }
    }

    return (
        <>
            <BlogEditor
                onSubmit={createNewPost}
                title={title}
                setTitle={setTitle}
                summary={summary}
                setSummary={setSummary}
                content={content}
                setContent={setContent}
                setFiles={setFiles}
                loading={loading}
            />
        </>
    );
}

