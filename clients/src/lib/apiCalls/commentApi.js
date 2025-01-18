import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import apiRequest from './apiHelper';

export const addComment = async (blogId, comment) => {
    return apiRequest(`/comment/add/${blogId}`, 'POST', { comment });
};

export const editComment = async (commentId, comment) => {
    return apiRequest(`/comment/update/${commentId}`, 'PATCH', { comment });
};

export const deleteComment = async (commentId) => {
    return apiRequest(`/comment/delete/${commentId}`, 'DELETE');
}

export const getAllComments = (blogId) => {
    return useInfiniteScroll(`/comment/all-comment/${blogId}`, 'GET');
}