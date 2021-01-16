/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, {useState} from 'react';
import axois from 'axios';

export const Login = (props) => {
    const [data, setData] = useState({

email : '',
password : '',
error : null,
    })
    const {email, password, error} = data;

    const a = (e) =>{
        console.log("HandChange");
        setData({...data,[e.target.name] : e.target.value})
       
    }


    const handleSubmit = async(e) =>
    { console.log('Submit Handle');
   
        e.preventDefault();
        try {
            setData({...data, error : null});
            const res = await axois.post('auth/login',
            {email, password},
            {header:{
                "Content-Type" : "application/json",
            }});
           localStorage.setItem("token", res.data.token);
        props.history.push('/');

        } catch (error) {
            console.log(error);
            setData({...data,error:error.response.data.error})
        }
    }
    return (
        <section className="py-md-5">
        <div className="col-md-6 offset-md-3"> 
        <div className="border shadow bg-light p-3">          
        {error ? <p className="text-danger">{error}</p> : null}
        
        <input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={a} required/>
            <br/>
            <input type="text" name="password" className="form-control" placeholder="Password" value={password} onChange={a}/>
            <br/>
            <button onClick={handleSubmit} className="btn btn-block btn-success">Login</button>
            <br/>
            <center><a href='/register'>Click To Register</a></center>
            </div>
            </div> 
        </section>
    )
}
