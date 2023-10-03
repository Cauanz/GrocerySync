import './Header.css';
import { useState } from 'react';
import { supabase } from '../../supabase/client';
import { Link, useNavigate } from 'react-router-dom';

export function Header() {

   const navigate = useNavigate();

   const [menu, setMenu] = useState(false);

   const toggleMenu = () => {
      setMenu(!menu);
   }

   async function signOut() {
      const { error } = await supabase.auth.signOut()

      if (error) {
         console.log('Erro ao sair:', error.message)
      } else {
         navigate('/login')
      }
    }

   return (
      <header className="header">
         <h1>GrocerySync</h1>

         <div className="user">
         <button className="username" onClick={toggleMenu}><img src="./profile-circle.svg" alt="" /></button>
            {menu && (
               <ul className='menu'>
                  {/* <Link to={"/userInfo"} ></Link><li><a href="#">Profile</a></li></Link> */}
                  <button onClick={signOut}><li>Logout</li></button>
               </ul>
            )}
         </div>
      </header>
   )
}