import { useReducer, createContext, useEffect } from 'react';

const INITIAL_STATE = {
    user: null, 
    loading: false,
    error: null
};

const savedUser = localStorage.getItem("user");

if (savedUser) {
    try {
        INITIAL_STATE.user = JSON.parse(savedUser);
    } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
    }
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{
            user: state.user,
            loading: state.loading,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );
};
