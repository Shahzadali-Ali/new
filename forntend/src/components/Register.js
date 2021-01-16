/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, {useState} from 'react';
import axois from 'axios';

export const Register = (props) => {
    const [data, setData] = useState({
name : '',
email : '',
password : '',
error : null,
    })
    const {name , email, password, error} = data;

    const a = (e) =>{
        console.log("HandChange");
        setData({...data,[e.target.name] : e.target.value})
    }


    const handleSubmit = async(e) =>
    { //console.log('hello')
        e.preventDefault();
        try {
            setData({...data, error : null});
            await axois.post('auth/register',
            {name, email, password},
            {header:{
                "Content-Type" : "application/json",
            }});
            console.log("User Hase Been Added");
        props.history.push('/login');

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
        <input type="text" name="name" placeholder="Name" value={name} onChange={a} className="form-control" required/>
            <br/>
        <input type="text" name="email" className="form-control" placeholder="Email" value={email} onChange={a} required/>
            <br/>
            <input type="password" name="password" required className="form-control" placeholder="Password" value={password} onChange={a}/>
            <br></br>
            <button onClick={handleSubmit} className="btn btn-block btn-success">Register</button>
            <br/>
            <center><a href='/login'>Click To Login</a></center>
            </div>
            </div> 
        </section>
    )
}
