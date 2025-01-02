import apiRequest from './apiHelper';

export const toggleBlogSave = async (blogId) => {
    return apiRequest(`/save-blog/${blogId}/save-unsave`, 'POST');
};

export const checkBlogSave = async (blogId) => {
    return apiRequest(`/save-blog/${blogId}/save-status`, 'GET');
};