import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import BlogEditor from "./BlogEditor";
import addIdsToHeadingsInContents from "../../lib/addIdsToHeadingsInContents";
import preprocessContent from "../../lib/preprocessContent";
import ErrorMessage from "../../components/ErrorMessage";
import useApi from "../../hooks/useApi";
import LogoLoader from "../../components/Loader/logo_loader";

export default function EditBlog() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { callApi: update, loading: updating } = useApi(`/blog/editBlog/${id}`, {}, false, true);
    const { data, loading: getting } = useApi(`/blog/getBlog/${id}`, {}, true, true);

    if (getting) {
        return <LogoLoader />;
    }
    if (data?.error) {
        return <ErrorMessage heading='Unable to fetch blog' message={data?.error} action={getBlog} />
    }

    async function updateBlog(data) {
        const formData = new FormData();
        formData.set('title', data.title);
        formData.set('summary', data.summary);
        formData.set('content', preprocessContent(addIdsToHeadingsInContents(data.content)));
        formData.set('id', id);
        if (data.cover) {
            data.set('file', data.cover);
        }
        const responseData = await update({
            data: formData,
            method: 'PUT',
        });
        if (responseData?.error)
            return toast.error(responseData.error || "Error while updating blog!");

        toast.success("Blog Updated!");
        navigate(`/blog/${id}`);
    }

    return (
        <BlogEditor
            onSubmit={updateBlog}
            title={data?.data?.title}
            summary={data?.data?.summary}
            content={data?.data?.content}
            loading={updating}
            isUpdate={true}
        />
    );
}