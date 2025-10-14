import React, {useState} from 'react';
import './App.css';

// Importar os componentes
import Login from './components/Login/Login.js';
import Menu from './components/Menu/Menu.js';
import Welcome from './components/Welcome/Welcome.js';
import ContactList from './components/ContactList/ContactList.js';
import ContactForm from './components/ContactForm/ContactForm.js';

function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Welcome');
  const [contacts, setContacts] = useState([
    {id:1,name:'Tatiana Silva',phone:'1621068702'},
    {id:2,name:'Graziela Carozelli',phone:'1621068702'}]);

  const [contactToEdit, setContactToEdit] = useState(null);

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === '123'){
      setIsLoggedIn(true);
    } else {
      alert('Usuario ou Senha INVALIDOS!!!')
    }
  };

  const handleSaveContact = (contact) => {
    if(contact.id){ // Se o contato ja tem ID, é uma atualização
      setContacts(contacts.map(c => c.id === contact.id ? contact : c));
      alert('Contado alterado com sucesso!');
    } else { // Cadastra-se um contato novo
      contact.id = Date.now();
      setContacts([...contacts, contact]);
      alert('Contato cadastrado com sucesso!');
    };
    setActiveScreen('list');
    setContactToEdit(null);
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
    alert('Contato removido com sucesso!');
  };

  const startEdit = (contact) => {
    setContactToEdit(contact);
    setActiveScreen('form');
  };

  const showCreatForm = () => {
    setContactToEdit(null);
    setActiveScreen('form')
  };

  const handleNavigate = (screen) => {
    if(screen === 'logout'){
      setIsLoggedIn(false);
    } else{
      setActiveScreen(screen);
    }
  };

  if (!isLoggedIn){
    return(
    <Login onLogin={handleLogin}/>
    )
  };

  return(
    <div className='app-container'>
      <Menu onNavigate={handleNavigate} onCreate={showCreatForm}/>
      <main className='content'>
        {activeScreen === 'Welcome' && <Welcome/>}
        {activeScreen === 'list' && <ContactList 
                                    contacts={contacts} 
                                    onEdit={startEdit} 
                                    onDelete={handleDeleteContact}/>}
        {activeScreen === 'form' && <ContactForm 
                                    contactToEdit={contactToEdit}  
                                    onSave={handleSaveContact}/>}
      </main>
    </div>
  )

};
export default App;