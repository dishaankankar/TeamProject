
import React, { useState } from "react";
import axios from 'axios'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";
import Success from "../components/Success.js";
function Registerscreen() {
  const [name, setName] = useState(); 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState()
  const[success,setSuccess]=useState()

  async function Register(){

    if(password===cpassword){
        const user={
            name,
            email, 
            password,
            cpassword
         }
        //  console.log(user);
         try {
          setLoading(true)
          const result = (await axios.post('/api/users/register',user)).data
          setLoading(false)
          setSuccess(true)
         
          setName('')
          setEmail('')
          setPassword('')
          setCpassword('')

         } catch (error) {
          setLoading(false)
          setError(true)
          console.log(error)
         } 
    }else {
        alert('passwords not matched ')
    }
    
 }

  return (
    <div>
       {loading && (<Loader/>)}
       {error && (<Error/>)}
       

    <div className="bs">
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 ">
        {success && (<Success message='Registration success'/>)}
          <div>
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)} 
            />
            <button className="btn btn-primary mt-3" onClick={Register}>Register</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Registerscreen;

