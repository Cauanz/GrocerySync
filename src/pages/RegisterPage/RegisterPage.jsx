import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useState } from 'react';
import { getFirestore } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'


export function RegisterPage() {

   const navigate = useNavigate()

   const [name, setName] = useState('') /* NEW */
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = async (e) => {
      e.preventDefault()

      console.log(name, email, password)

      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in 
         const user = userCredential.user;
         navigate('/')
      })
      .catch((error) => {
         console.error(error.code, error.message)
      });
      const db = getFirestore();

      try {
         // Add a new document with a generated id.
         const docRef = await addDoc(collection(db, "users"), {
            displayName: 'cauan'
         });
         console.log("Document written with ID: ", docRef.id);
         } catch (error) {
            console.error("Error adding document: ", error);
         }

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