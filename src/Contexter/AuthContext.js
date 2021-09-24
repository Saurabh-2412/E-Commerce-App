import { createContext, useContext, useState } from "react";
//import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

	const { isUserLoggedIn:isUserLogin, token: savedToken } = JSON.parse(
	localStorage?.getItem("login")
	) || {};

	const [isUserLoggedIn, setIsUserLoggedIn] = useState(isUserLogin);
	const [ token ] = useState(savedToken);

/* 	useEffect(() => {
		token && setupAuthHeaderForServiceCalls(token);
	},[token]) */

	return (
		<AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, token }} >
			{children}
		</AuthContext.Provider>
	);
};

/* export const setupAuthHeaderForServiceCalls = (token) => {
	if (token) {
	  return (axios.defaults.headers.common["Authorization"] = token);
	}
	delete axios.defaults.headers.common["Authorization"];
}; */