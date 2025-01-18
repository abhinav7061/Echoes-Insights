import apiRequest from './apiHelper';

export const updateReadingProgress = async (blogId, progress) => {
    return apiRequest('/reading-progress/update', 'POST', { blogId, progress });
};

export const getReadingProgress = async (blogId) => {
    return apiRequest(`/reading-progress/last-read?blogId=${blogId}`, 'GET');
};
