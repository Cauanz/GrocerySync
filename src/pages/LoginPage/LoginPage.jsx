import './LoginPage.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { supabase } from '../../supabase/client';

export function LoginPage() {

   const navigate = useNavigate()

   const [isLoading, setIsLoading] = useState(false);

   const overlay = document.querySelector('.overlay');

   const formik = useFormik({
   initialValues: {
      email: '',
      password: '',
   },
   validationSchema: Yup.object({
      email: Yup
      .string()
      .email('Email inválido')
      .required('Campo obrigatório'),

      password: Yup
      .string()
      .required('Campo obrigatório'),
   }),

   onSubmit: async (values) => {
      try {
      setIsLoading(true);
         // eslint-disable-next-line no-unused-vars
         const { data, error } = await supabase.auth.signInWithPassword({
         email: values.email,
         password: values.password,
      });
      
      if (error) {
         alert(error.message);
      } else {
         setIsLoading(false);
         overlay.style.display = 'flex';

         setTimeout(() => {
            navigate('/');
         }, 1000);

      }
      } catch (error) {
      console.error(error.message);
      }
   },
   });

   return (
      <div className="login">
         <div className="container">

         <div className="overlay">
            <div className="overlay-content">
               <h2>Login Bem-sucedido</h2>
               <p>Seja bem vindo</p>
               <img src="./system-outline-31-check.gif" alt="" />
            </div>
         </div>

            <div className="left">
               <h2>Simple and Fast</h2>
            </div>
            <div className="right">
            <form onSubmit={formik.handleSubmit}>
               <h1>Login</h1>
               <input 
               className={formik.touched.email && formik.errors.email ? 'error' : ''}
               type="text"
               placeholder="Email"
               {...formik.getFieldProps('email')}
               />
               {formik.touched.email && formik.errors.email ? (
               <div className="errorMessage">{formik.errors.email}</div>
               ) : null}

               <input 
               className={formik.touched.password && formik.errors.password ? 'error' : ''}
               type="password"
               placeholder="Password"
               {...formik.getFieldProps('password')}
               />
               {formik.touched.password && formik.errors.password ? (
               <div className="errorMessage">{formik.errors.password}</div>
               ) : null}

               <button type="submit" disabled={isLoading}>
               {isLoading ? 'Carregando...' : 'Entrar'}
               </button>

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