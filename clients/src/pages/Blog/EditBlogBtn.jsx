import React from 'react'
import { color } from '../../style';
import { Link } from 'react-router-dom';

const EditBlogBtn = ({ blogId }) => {

    return (
        <div className={`${color.textBlackWhite} text-xs md:text-sm`}>
            <Link className="flex items-center gap-2" to={`/edit_blog/${blogId}`}>
                <ion-icon name="create-outline"></ion-icon>
                Edit this Blog
            </Link>
        </div>
    )
}

export default EditBlogBtn