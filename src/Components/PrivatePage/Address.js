import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Address() {
  const  { token,id } = JSON.parse(localStorage?.getItem("login")) || {};
  const navigate = useNavigate();
  const [user, setUserData] = useState([]);
  
  //for fetching data
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  useEffect(() => {
    (async function () {
      try{
        const { data } = await axios.get(
          `https://ecommercedata.saurabhsharma11.repl.co/v1/userData`,{userID:id}
        );
        console.log("this is user details",data.userData);
        const filteredUser = data.userData.filter((currentUser) => currentUser._id === id);
        setUserData(filteredUser);
      }
      catch(err){
        if(err.status){
          return navigate('/login');
        }
      }
    })();
  },[token]);

  return (
    <>
      <h1><em> User Details</em></h1>
      <hr></hr>
      <ul style={{margin:"0",padding:"0"}}>
        {user.map((userDetail) => {
          return (
            <li key={userDetail._id} style={{listStyleType:"none"}}>
              <div>Name : {userDetail.name}</div>
              <div>User-ID : {userDetail._id}</div>
              <div>Email-ID: {userDetail.mail}</div>
              <div>Contact-No : {userDetail.phone}</div>
            </li>
          )
        })}
      </ul>
    </>
  );
}
