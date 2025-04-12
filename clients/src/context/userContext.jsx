import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    isAuthenticatedUser: false,
    user: null,
    jwtToken: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticatedUser: true,
                user: action.payload.user,
                jwtToken: action.payload.jwtToken,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticatedUser: false,
                user: null,
                jwtToken: null,
            };
        default:
            return state;
    }
};

const userContext = createContext();

export const UserContext = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = (user, jwtToken) => {
        dispatch({
            type: 'LOGIN',
            payload: { user, jwtToken },
        });
        localStorage.setItem('jwtToken', jwtToken);
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('jwtToken');
        document.cookie = "jwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (
        <userContext.Provider value={{ ...state, login, logout }}>
            {children}
        </userContext.Provider>
    );
};

export const useUserAuthentication = () => useContext(userContext);
