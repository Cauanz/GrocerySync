import './LoginPage.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase/client';

export function LoginPage() {

   const navigate = useNavigate()

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()

      if(email === '' || password === '') {
         alert('Preencha todos os campos')
      } else {

         try {
            const { data, error } = await supabase.auth.signInWithPassword({
               email: email,
               password: password,
            });
         
            if (error) {
               console.error(error.message)
               return
            }
            console.log(data.user.id)
         
            navigate('/')
            } catch (error) {
            console.error(error.message)
            }
      }
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
               <input className='Email' type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
               <input className='Password' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}required />
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