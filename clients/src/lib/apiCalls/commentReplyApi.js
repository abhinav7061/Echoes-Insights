import apiRequest from './apiHelper';

export const addReply = async (commentId, reply) => {
    return apiRequest(`/comment-reply/add/${commentId}`, 'POST', { reply });
};

export const editReply = async (replyId, newReplyValue) => {
    return apiRequest(`/comment-reply/update/${replyId}`, 'PATCH', { newReplyValue });
};

export const deleteReply = async (replyId) => {
    return apiRequest(`/comment-reply/delete/${replyId}`, 'DELETE');
}

export const getAllReplies = async (commentId, page, limit) => {
    return apiRequest(`/comment-reply/all-reply/${commentId}?page=${page}&limit=${limit}`, 'GET');
}