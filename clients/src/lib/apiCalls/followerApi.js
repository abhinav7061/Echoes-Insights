// followerApi.js
import apiRequest from './apiHelper';

// Check follow status
export const checkFollowStatus = async (authorId) => {
    return apiRequest(`/follow/${authorId}/follow-status`, 'GET');
};

// Toggle follow/unfollow
export const toggleFollow = async (authorId) => {
    return apiRequest(`/follow/${authorId}/follow-unfollow`, 'POST');
};
