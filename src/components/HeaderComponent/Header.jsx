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
         <button className="username" onClick={toggleMenu}><img src="./profile-circle.svg" alt="" /></button>
            {menu && (
               <ul className='menu'>
                  {/* <Link to={"/userInfo"} ></Link><li><a href="#">Profile</a></li></Link> */}
                  <Link to={"/login"} ><li>Logout</li></Link>
               </ul>
            )}
         </div>
      </header>
   )
}