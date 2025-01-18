import apiRequest from './apiHelper';

export const authenticateUser = async (login, logout) => {
    try {
        const response = await apiRequest('/user/isAuthenticatedUser');
        if (response.success) {
            login(response.user, localStorage.getItem("jwtToken"));
            return true;
        } else {
            logout();
            throw new Error(response?.message || 'Could not login');
        }
    } catch (error) {
        logout();
        console.error(error.message);
    }
};
