import './LoginPage.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/app';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function LoginPage() {

   const navigate = useNavigate()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()

      console.log(email, password)

      await signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            // Signed in

            const user = userCredential.user;
            navigate('/')
            console.log(user)

         })
         .catch((error) => {
            console.log(error.code);
            console.log(error.message);
         });
   }


   return (
      <div className="login">
         <div className="container">
            <div className="left">
               <h2>Simple and Fast</h2>
            </div>
            <div className="right">
            <form>
               <h1>Login</h1>
               <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <button type="submit" onClick={handleSubmit}>Login</button>

               <div className="otherLoginWays">
                  <p>Or login with</p>
                  <div className="social">
                     <button><img src="./google-light.svg" alt="google" /></button>
                     <button><img src="./facebook.svg" alt="facebook" /></button>
                  </div>
               </div>

                  <p className='RedirectRegister'>Don&apos;t have an account? <Link to="/register">Register</Link></p>
            </form>
            </div>
         </div>
      </div>
   )
}