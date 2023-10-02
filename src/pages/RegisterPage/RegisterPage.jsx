import { useFormik } from 'formik';
import * as Yup from 'yup';

import { supabase } from '../../supabase/client';

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css'


export function RegisterPage() {

   const navigate = useNavigate()

   const [isLoading, setIsLoading] = useState(false);

   const overlay = document.querySelector('.overlay');

   const formik = useFormik({
      initialValues: {
      name: '',
      email: '',
      password: '',
      },
      validationSchema: Yup.object({
      name: Yup.string().required('Campo obrigatório'),
      email: Yup.string().email('Email inválido').required('Campo obrigatório'),
      password: Yup.string().required('Campo obrigatório'),
      }),
      onSubmit: async (values) => {
      try {
         setIsLoading(true);
         const { data: authData, error: authError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
         });

         if (authError) {
            console.error('Erro ao registrar usuário:', authError.message);
         } else {
            console.log('Usuário registrado com sucesso:', authData);
         }

         const userId = authData?.user?.id;

         const { data: userData, error: userError } = await supabase.from('users').insert([
            { id: userId, userName: values.name, email: values.email, password: values.password },
         ]).select();

         if (userError) {
            console.error('Erro ao inserir no banco de dados:', userError.message);

            setIsLoading(false);
            alert('Erro ao registrar usuário, tente mudar as credenciais, Se o erro persistir, contate o suporte');
         } else {
            console.log('Dados inseridos no banco de dados:', userData);

            setIsLoading(false);
            overlay.style.display = 'flex';

            setTimeout(() => {
               navigate('/login');
            }, 2500);
         }

      } catch (error) {
         console.error('Erro geral:', error.message);
      }
      },
   });

   return (
      <div className="register">
         <div className="container">

         <div className="overlay">
            <div className="overlay-content">
               <h2>Registro Bem-sucedido</h2>
               <p>Um email de confirmação foi enviado para sua caixa de entrada</p>
               <img src="./system-outline-31-check.gif" alt="" />
            </div>
         </div>

            <div className="left">
               <h2>Simple and Fast</h2>
            </div>
            <div className="right">
            <form onSubmit={formik.handleSubmit}>

               <h1>Register</h1>

               <input 
               type="text"
               placeholder="Nome"
               {...formik.getFieldProps('name')}
               />
               {formik.touched.name && formik.errors.name ? (
               <div className="errorMessage">{formik.errors.name}</div>
               ) : null}

               <input 
               type="text"
               placeholder="Email"
               {...formik.getFieldProps('email')}
               />
               {formik.touched.email && formik.errors.email ? (
               <div className="errorMessage">{formik.errors.email}</div>
               ) : null}

               <input 
               type="password"
               placeholder="Password"
               {...formik.getFieldProps('password')}
               />
               {formik.touched.password && formik.errors.password ? (
               <div className="errorMessage">{formik.errors.password}</div>
               ) : null}

               <button type="submit" disabled={isLoading}>
               {isLoading ? 'Carregando...' : 'Register'}
               </button>

               <div className="otherWays">
                  <p>Or register with</p>
                  <div className="social">
                     <button><img src="./google-light.svg" alt="google" /></button>
                     <button><img src="./facebook.svg" alt="facebook" /></button>
                  </div>
               </div>

               <p className='RedirectLogin'>Already have an account? <Link to="/login">Login</Link></p>
            </form>
            </div>
         </div>
      </div>
   )
}