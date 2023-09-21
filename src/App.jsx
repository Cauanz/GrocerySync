import { Header } from './components/HeaderComponent/Header'

import './App.css'
import { useState } from 'react'

function App() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const createItem = (e) => {
    e.preventDefault();

    if(newItem.trim() !== ''){
      setItems([...items, newItem]);
      setNewItem('');
    }
  }

  return (
    <>
      <Header />
      <main>
        <div className="content">

          <form action="#" className="addItem" onSubmit={createItem}>
            <input type="text" name="item" id="item" placeholder='Adicione um novo item' />
            <button type="submit" >Criar<img src="../plus-circle-light.svg" alt="plus-circle" /></button>
          </form>

          <div className="resumoCompras">
            <div className="criados">
              <p className="criadosText">Itens criados</p>
              <span>{items.length}</span>
            </div>
            <div className="concluidos">
              <p className="concluidosText" >Concluídas</p>
              <span>0</span>
            </div>
          </div>
          
                {items.length > 0 ? (
          <ul className="items">
            {items.map((item, index) => (
              <li key={index}>
                <input type="checkbox" name="item" id="item" />
                <span>{item}</span>
                <button>Remover<img src="../trash-light.svg" alt="trash" /></button>
              </li>
            ))}
          </ul>
                ) : (
          <div className="empty">
            <img src="../Clipboard.svg" alt="empty" />
            <span>Sua lista está vazia</span>
          </div>
                )
                }
        </div>
      </main>
    </>
  )
}

export default App
