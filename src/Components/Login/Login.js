import React,{useEffect, useState} from "react";
import axios from "axios";
import { useNavigate,NavLink } from "react-router-dom";
import { useAuth } from "../../Contexter/AuthContext";

export function Login() {
	const { isUserLoggedIn, setIsUserLoggedIn, token } = useAuth();
	const navigate = useNavigate();
	const usernameRef = React.useRef();
	const passwordRef = React.useRef();
	
	/* useEffect(() => {
		(async function () {
			const userId = "60b4af4ee2cd0c0028a55988";
			const password = "12345";
		  const { data } = await axios.get(
			"https://ecommercedata.saurabhsharma11.repl.co/v1/userData/60b4af4ee2cd0c0028a55988",{userId:userId, password: password}
		  );
		  console.log("this is user data",data);
		})();
	  },[]); */

	async function handleSubmit() {
		console.log(usernameRef.current.value, passwordRef.current.value);

		axios.interceptors.request.use(
			config => {
				config.headers.authorization = token;
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		)

		if(!isUserLoggedIn){
			const userId = usernameRef.current.value;
			const password = passwordRef.current.value;
			const { data,status } = await axios.post(
				"https://ecommercedata.saurabhsharma11.repl.co/v1/userData/60b4af4ee2cd0c0028a55988",
				{ userId:userId, password: password }
			);
			console.log("this is user data",data);
			if(status === 200){
				setIsUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn);
				isUserLoggedIn || navigate("/");
				localStorage?.setItem(
					"login",
					JSON.stringify({ isUserLoggedIn: true,token: 'abcdef' })
				  );
			}
		} else {
			setIsUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn);
			isUserLoggedIn || navigate("/");
			localStorage?.removeItem("login");
		}
	};

	function SignUp(){
		navigate("/Register")
	}

	return (
		<>
			<h1>Login</h1>
			<label>	Username :- 
				<input type="text" ref={usernameRef} disabled={isUserLoggedIn ? true : false}/>
			</label>
			<br /><br />
			<label>
				Password :- 
				<input type="password" ref={passwordRef} disabled={isUserLoggedIn ? true : false}/>
			</label>
			<br />
			<button	onClick={handleSubmit}>
				{isUserLoggedIn ? "Logged In" : "Logged out"}
			</button>
			<div>
				<span onClick={SignUp}>SignUp?</span>
			</div>
		</>
	);
}
