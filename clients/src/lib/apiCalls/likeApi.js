import apiRequest from './apiHelper';

export const toggleBlogLike = async (blogId) => {
    return apiRequest(`/like/blog/${blogId}/like-dislike`, 'POST');
};

export const toggleCommentLike = async (commentId) => {
    return apiRequest(`/like/comment/${commentId}/like-dislike`, 'POST');
};

export const toggleCommentReplyLike = async (commentReplyId) => {
    return apiRequest(`/like/comment-reply/${commentReplyId}/like-dislike`, 'POST');
};

export const checkBlogLike = async (blogId) => {
    return apiRequest(`/like/blog/${blogId}/like-status`, 'GET');
};

export const checkCommentLike = async (commentId) => {
    return apiRequest(`/like/comment/${commentId}/like-status`, 'GET');
};

export const checkCommentReplyLike = async (commentReplyId) => {
    return apiRequest(`/like/comment-reply/${commentReplyId}/like-status`, 'GET');
};
