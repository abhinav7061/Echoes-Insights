import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import BlogEditor from './BlogEditor';
import addIdsToHeadingsInContents from '../../lib/addIdsToHeadingsInContents';
import preprocessContent from '../../lib/preprocessContent';
import useApi from '../../hooks/useApi';

export default function CreateBlog() {
    const navigate = useNavigate();
    const { callApi: create, loading } = useApi('/blog/createBlog', {}, false, true);
    const createNewPost = async (data) => {
        const formData = new FormData();
        formData.set('title', data.title);
        formData.set('summary', data.summary);
        formData.set('content', preprocessContent(addIdsToHeadingsInContents(data.content)));
        formData.set('cover', data.cover);
        console.log(data)

        const responseData = await create({
            data: formData,
            method: 'POST',
        });
        if (responseData?.error) {
            return toast.error(responseData.error || "Error while creating blog!");
        }

        toast.success("Blog Created!");
        console.log(responseData.data);
        // navigate(`/blog/${responseData.data._id}`);
    }

    return (
        <>
            <BlogEditor
                onSubmit={createNewPost}
                loading={loading}
            />
        </>
    );
}

