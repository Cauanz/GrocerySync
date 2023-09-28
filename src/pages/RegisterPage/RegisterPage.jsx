/* import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../supabase/client';
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"; */

import { supabase } from '../../supabase/client';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'


export function RegisterPage() {

   const navigate = useNavigate()

   const [name, setName] = useState('') /* NEW */
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   
   const handleSubmit = async (e) => {
      e.preventDefault()
   
      try {
         const { data: authData, error: authError } = await supabase.auth.signUp({
         email: email,
         password: password,
         });

         if (authError) {
               console.error('Erro ao registrar usuário:', authError.message);
            } else {
               console.log('Usuário registrado com sucesso:', authData);
            }

            const userId = authData.user.id;

         const { data: userData, error: userError } = await supabase
         .from('users')
         .insert([
            {id: userId ,userName: name, email: email, password: password},
         ])
         .select();
      
         if (userError) {
         console.error('Erro ao inserir no banco de dados:', userError.message);
         } else {
         console.log('Dados inseridos no banco de dados:', userData);
         }
      

      
      } catch (error) {
         console.error('Erro geral:', error.message);
      }


      navigate('/login')
   }

   return (
      <div className="register">
         <div className="container">
            <div className="left">
               <h2>Simple and Fast</h2>
            </div>
            <div className="right">
            <form>
               <h1>Register</h1>
               <input type="text" placeholder="Nome" value={name} onChange={(e) => {setName(e.target.value)}}  />
               <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <button type="submit" onClick={handleSubmit}>Register</button>

               <div className="otherWays">
                  <p>Or register with</p>
                  <div className="social">
                     <button><img src="./google-light.svg" alt="google" /></button>
                     <button><img src="./facebook.svg" alt="facebook" /></button>
                  </div>
               </div>

               <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
            </div>
         </div>
      </div>
   )
}