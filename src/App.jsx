import { Header } from './components/HeaderComponent/Header'
import './App.css'
import { useEffect, useState } from 'react';

import { supabase } from '../src/supabase/client';


function App() {


  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [completedItems, setCompletedItems] = useState(0);


  useEffect(() => {
    if(items.length === 0) {

      const getListItems = async () => {

        // Obtenha o usuário atual do banco de dados
        const { data: { user } } = await supabase.auth.getUser();

        /* console.log(user); */ // Verificação para fins de testes
    
      if (user) { // Se o usuário estiver conectado ele irá executar o código abaixo
        try {

            // Obtenha o usuário atual do banco de dados
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select()
              .eq('id', user.id)
              .single();
    
            if (userError) {
              console.error('Erro ao obter o usuário:', userError.message);
              return;
            }
    

            // Obtenha a lista atual do usuário
            const currentList = userData.list || [];

            /* console.log(currentList); */ // Verificação para fins de testes / se a lista é retornada corretamente

            setItems(currentList);

        } catch (error) {
          console.error('Erro ao recuperar a lista:', error.message);
        }
      }
    }
    getListItems();
    }
  }, []);


  function create() {    
    createDBItem();
  }

  function completedItem(index) {
    updateDBItem(index);
  }

  function removedItem(index) {
    removeDBItem(index);
  }


  const createLocalItem = () => {
    if (newItem !== '') {
      const newItemData = {
        id: items.length,
        item: newItem,
        completed: false,
      };
  
      setItems((prev) => [
        ...prev,
        newItemData,
      ]);
      setNewItem('');
    }
  };

  const createDBItem = async () => {
    if (newItem !== '') {
      const newItemData = {
        id: items.length,
        item: newItem,
        completed: false,
      };
  
      const { data: { user } } = await supabase.auth.getUser();
      console.log(user);
  
      if (user) {
        try {
          // Obtenha o usuário atual do banco de dados
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select()
            .eq('id', user.id)
            .single();
  
          if (userError) {
            console.error('Erro ao obter o usuário:', userError.message);
            return;
          }
  
          // Obtenha a lista atual do usuário
          const currentList = userData.list || [];
  
          // Adicione o novo item à lista
          currentList.push(newItemData);
  
          // Atualize o registro do usuário com a lista atualizada
          const { data: updateData, error: updateError } = await supabase
            .from('users')
            .update({ list: currentList })
            .eq('id', user.id);
  
          if (updateError) {
            console.error('Erro ao atualizar o usuário:', updateError.message);
          } else {
            console.log('Item criado e atualizado com sucesso:', updateData);
          }
          createLocalItem();
        } catch (error) {
          console.error('Erro ao criar o item:', error.message);
        }
      }
    }
  };


  const updateLocalItem = (id) => {
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
  };

  const updateDBItem = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
  
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('id', user.id)
        .single();
  
      if (userError) {
        console.error('Erro ao obter o usuário:', userError.message);
        return;
      }
  
      const currentList = userData.list || [];
  
      const itemFound = currentList.find(item => item.id === id);
      itemFound.completed = !itemFound.completed;

      console.log(itemFound);
  
      const updatedList = currentList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            completed: item.completed
          };
        }
        return item;
      });
  
      const { data, error } = await supabase
        .from('users')
        .update({
          // Atualize a lista no banco de dados para refletir o novo status do item
          list: updatedList,
        })
        .eq('id', user.id);
  
      if (error) {
        console.error('Erro ao atualizar o item:', error.message);
      } else {
        console.log('Item atualizado com sucesso:', data);
      }
      updateLocalItem(id);
    } catch (err) {
      console.log("Erro no SUPABASE DATABASE COMPLETED", err);
    }
  };


  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const completedItem = items.find((item) => item.id === id);
    if(completedItem && completedItem.completed) {
      setCompletedItems(completedItems - 1);
    }
  }

  const removeDBItem = async (id) => {
    const { data: { user } } = await supabase.auth.getUser();
  
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select()
        .eq('id', user.id)
        .single();
  
      if (userError) {
        console.error('Erro ao obter o usuário:', userError.message);
        return;
      }
  
      const currentList = userData.list || [];
  
      const itemIndex = currentList.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        currentList.splice(itemIndex, 1);
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          // Atualize a lista no banco de dados para refletir o novo status do item removido
          list: currentList,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Erro ao atualizar o item:', error.message);
      } else {
        console.log('Item atualizado com sucesso:', data);
      }
      removeItem(id);
    } catch (err) {
      console.log("Erro no SUPABASE DATABASE COMPLETED", err);
    }
  }


  return (
    <>
      <Header />
      <main>
        <div className="content">

          <form action="#" className="addItem" onSubmit={(e) => { e.preventDefault(); create(); }} >
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

                  <input type="checkbox" className="completedItem" checked={item.completed} onChange={() => completedItem(item.id)} />

                <span>{item.item}</span>
                
                <button className='Remove' onClick={() => removedItem(item.id)}><img src="../trash-light.svg" alt="trash" /></button>

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