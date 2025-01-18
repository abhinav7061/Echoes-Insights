import apiRequest from './apiHelper';

export const createBlog = async ({ title, summary, content, files }) => {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', preprocessContent(addIdsToHeadingsInContents(content)));
    data.set('cover', files[0]);

    return apiRequest('/blog/createBlog', 'POST', data, {}, true);
};

export const deleteBlog = (blogId) => {
    return apiRequest(`/blog/deleteBlog/${blogId}`, 'DELETE' );
}