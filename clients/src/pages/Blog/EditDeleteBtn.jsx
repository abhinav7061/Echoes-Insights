import { useEffect, useState } from "react";
import EditBlogBtn from "./EditBlogBtn";
import DeleteBlog from "./DeleteBlog";
import { useUserAuthentication } from "../../context/userContext";

const apiUrl = import.meta.env.VITE_API_URL;

const EditDeleteBtn = ({ blogId }) => {
    const { isAuthenticatedUser, jwtToken } = useUserAuthentication();
    const [isAuthor, setIsAuthor] = useState(false);

    const checkAuthor = async () => {
        try {
            const response = await fetch(`${apiUrl}/blog/isAuthor/${blogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${jwtToken}`
                },
                credentials: 'include'
            })
            const data = await response.json();
            if (response.ok && data.success) {
                setIsAuthor(true);
            } else {
                setIsAuthor(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthor(false);
        }
    }

    useEffect(() => {
        checkAuthor();
    }, [isAuthenticatedUser])

    return (
        <>
            {isAuthenticatedUser && isAuthor && <div>
                <EditBlogBtn blogId={blogId} />
                <DeleteBlog blogId={blogId} />
            </div>}
        </>
    )
}

export default EditDeleteBtn