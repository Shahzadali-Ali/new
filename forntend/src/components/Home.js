import React, {useState, useEffect} from 'react';
import axois from 'axios';

export const Home = (props) => {
   const [user, setUser] = useState(null);
   const getUser = async () => {
       const res = await axois.get("/auth",
       {
           headers: {
               Authorization :  `Bearer ${localStorage.getItem("token")}`,
           }
       });
       setUser(res.data);
   };
   useEffect(() =>{
       getUser();
   },[]);

   const logout = () =>{
       localStorage.removeItem("token");
       props.history.push('/login');

   }

   if(!localStorage.getItem("token"))
   {
    props.history.push('/login'); 
   }
    return (
        <section className="py-md-5 jumbotron text-center">
<div class="">
  <h1>Hello  {user && user.name}</h1>
  <h4 className="text-center">Welcome To Mern Project</h4>
 <br/>
  <center><button onClick={logout} className="btn btn-danger">Logout</button></center>
</div>
        
       
            
        </section>
    )
}
