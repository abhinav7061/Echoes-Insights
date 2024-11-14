import React, { createContext, useContext, useState } from 'react';

const userContext = createContext();

export function useUserAuthentication() {
    return useContext(userContext);
}

export function UserContext({ children }) {
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
    const [user, setUser] = useState(null);
    return (
        <userContext.Provider value={{ user, setUser, isAuthenticatedUser, setIsAuthenticatedUser }}>
            {children}
        </userContext.Provider>
    );
}
