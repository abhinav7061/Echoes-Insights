import React from 'react'
import { Link } from 'react-router-dom';

const EditBlogBtn = ({ blogId }) => {

    return (
        <Link className="flex items-center gap-2 text-sm px-2 py-1 hover:bg-neutral-700/10 hover:dark:bg-neutral-700/60 rounded-md" to={`/edit_blog/${blogId}`}>
            <ion-icon name="create-outline"></ion-icon>
            Edit this Blog
        </Link>
    )
}

export default EditBlogBtn