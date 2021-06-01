import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register() {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [visible,setVisible] = useState("none")
    const [userRegisteration, setUserRegisteration] = useState({
        username : "",
        email : "",
        number : "",
        password : ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegisteration({ ...userRegisteration, [name] : value});
    }

    const min = 1;
    const max = 100;
    const rand = Math.floor(min + Math.random() * (max - min));

    async function handleSubmit(e) {
        e.preventDefault();
        //const newRecord = { ...userRegisteration, userId : new Date().getTime().toString()};
        //setRecords([ ...records, newRecord]);
        
        try {
            const { resp, status } = await axios.post("https://ecommercedata.saurabhsharma11.repl.co/v1/userData",
            {
                _id:rand, name: userRegisteration.username, password: userRegisteration.password, mail: userRegisteration.email,
                number: userRegisteration.number
            })
            if(status === 200){
                //navigate("/Login")
                setUserRegisteration({username:"",email:"",number:"",password:""})
                setVisible("block");
            }
            //console.log("server response", resp );
        }
        catch(err){
            console.log(err);
        }
        //console.log("old record",records,"new record=>",newRecord)
    }

    const HandleReset = () => {
        setUserRegisteration([...records])
    }

    return (
        <div style={{padding:"10px"}}>
            <h3>SignUp</h3>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" style={{margin:"10px"}}>FullName</label>
                    <input type="text" onChange={handleInput} id="username" name="username" value={userRegisteration.username}/>
                </div><br/>
                <div>
                    <label htmlFor="email" style={{margin:"20px"}}>E-Mail</label>
                    <input type="text" onChange={handleInput} id="email" name="email" value={userRegisteration.email}/>
                </div><br/>
                <div>
                    <label htmlFor="number" style={{margin:"18px"}}>Number</label>
                    <input type="text" onChange={handleInput} id="number" name="number" value={userRegisteration.number}/>
                </div><br/>
                <div>
                    <label htmlFor="password" style={{margin:"12px"}}>Password</label>
                    <input type="password" onChange={handleInput} autoComplete="off" id="password" name="password" value={userRegisteration.password}/>
                </div><br/>
                <button type="submit">Register</button>
                <button type="reset" onClick={HandleReset}>Reset</button>
            </form>
            <div style={{display:visible}}>
                {records.map((currentUser) => {
                    return (
                        <p>
                            <p>Hello {currentUser.name},<br/></p>
                            <p>Please use this userId for LogingIn {rand}</p>
                        </p>
                    )
                })}
            </div>
        </div>
    )
}
