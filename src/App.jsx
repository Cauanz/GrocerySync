import { Header } from './components/HeaderComponent/Header'

import './App.css'
import { useState } from 'react'

function App() {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [completedItems, setCompletedItems] = useState(0);

  const createItem = () => {
    if(newItem !== ''){

      const id = items.length + 1;

      setItems((prev) => [
        ...prev,
        {
          id: id,
          item: newItem,
          completed: false,
        },
      ]);
      setNewItem("");

    } else {
      alert('Digite um item para adicionar a lista');
    }
  };

  function handleCompletedItem(id) {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    });
    setItems(updatedItems);

    const item = updatedItems.find((item) => item.id === id);
    if (item) {
      if (item.completed) {
        setCompletedItems(completedItems + 1);
      } else {
        setCompletedItems(completedItems - 1);
      }
  }
}

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const completedItem = items.find((item) => item.id === id);
    if(completedItem && completedItem.completed) {
      setCompletedItems(completedItems - 1);
    }
  }


  return (
    <>
      <Header />
      <main>
        <div className="content">

          <form action="#" className="addItem" onSubmit={(e) => { e.preventDefault(); createItem(); }} >
            <input type="text" name="TextItem" id="TextItem" placeholder='Adicione um novo item' value={newItem} onChange={(e) => setNewItem(e.target.value)} />
            <button type="submit" className='CreateButton'>Criar<img src="../plus-circle-light.svg" alt="plus-circle" /></button>
          </form>

          <div className="resumoCompras">
            <div className="criados">
              <p className="criadosText">Itens criados</p>
              <span>{items.length}</span>
            </div>
            <div className="concluidos">
              <p className="concluidosText" >Concluídas</p>
              <span>{completedItems} de {items.length}</span>
            </div>
          </div>
          
                {items.length > 0 ? (
          <ul className="items">

            {items.map((item, index) => (
              <li key={index} className='Item'>

                  <input type="checkbox" className="completedItem" checked={item.completed} onChange={() => handleCompletedItem(item.id)} />

                <span>{item.item}</span>
                
                <button className='Remove' onClick={() => removeItem(item.id)}><img src="../trash-light.svg" alt="trash" /></button>

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
