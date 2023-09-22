import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {

   const [menu, setMenu] = useState(false);

   const toggleMenu = () => {
      setMenu(!menu);
   }

   return (
      <header className="header">
         <h1>GrocerySync</h1>

         <div className="user">
            <Link to={"/login"} ><button className="username" onClick={toggleMenu}><img src="./profile-circle.svg" alt="" /></button></Link>
            {menu && (
               <ul className='menu'>
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Logout</a></li>
               </ul>
            )}
         </div>
      </header>
   )
}