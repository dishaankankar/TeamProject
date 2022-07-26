
import React, { useState } from "react";
import axios from 'axios'
import Loader from "../components/Loader.js";
import Error from "../components/Error.js";
function Loginscreen() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState()
  

  async function Login() {

    const user={
         email,
         password,
    }
    
    try {
      setLoading(true)
      const result = await (await axios.post('/api/users/login',user)).data
      setLoading(false)

      localStorage.setItem('currentUser',JSON.stringify(result))
      window.location.href='/home'
     } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
     }
   
  }

  return (
   
    <div className="bs">
      {loading && (<Loader/>)}  
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
           {error && (<Error message= 'Invalid Credentials'/>)}
          <div>
            <h1>Login</h1>
            <input
              type="Email"
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

            <button className="btn btn-primary mt-3" onClick={Login}>
              login
            </button>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;


// import React, { useState } from "react";
// import axios from 'axios'
// import Loader from "../components/Loader.js";
// import Error from "../components/Error.js";
// function Loginscreen() {
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [loading,setLoading]=useState(false)
//   const[error,setError]=useState()
  

//   async function Login() {

//     const user={
//          email,
//          password,
//     }
//     try {
//       setLoading(true)
//       const result = await (await axios.post('/api/users/login',user)).data
//       setLoading(false)

//       localStorage.setItem('currentUser',JSON.stringify(result))
//       window.location.href='/home'
//      } catch (error) {
//       console.log(error)
//       setLoading(false)
//       setError(true)
//      }
   
//   }

//   return (
   
//     <div className="bs">
//       {loading && (<Loader/>)}  
//       <div className="row justify-content-center mt-5">
//         <div className="col-md-5">
//            {error && (<Error message= 'Invalid Credentials'/>)}
//           <div>
//             <h1>Login</h1>
//             <input
//               type="Email"
//               className="form-control"
//               placeholder="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               className="form-control"
//               placeholder="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button className="btn btn-primary mt-3" onClick={Login}>
//               login
//             </button>
//           </div>  
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loginscreen;