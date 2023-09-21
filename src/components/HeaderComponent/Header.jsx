import './Header.css';

export function Header() {
   return (
      <header className="header">
         <h1>GrocerySync</h1>

         <div className="user">
            <span className="username"><img src="./profile-circle.svg" alt="" /></span>
         </div>
      </header>
   )
}