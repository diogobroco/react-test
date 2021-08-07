import './App.css';
import { Button, TextField, Modal } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import CardComponent from './Components/Cards';
import HeaderComponent from './Components/HeaderComponent';
import SearchComponent from './Components/SearchComponent';


function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event) => {
    setName(event.currentTarget.value)
  }

 const requestPersons = () => {
  axios.get('https://api.pipedrive.com/v1/persons', {
    params: {
      api_token: '8610b4332627a0d69688ddb3f12f1d246339361c',
      limit: 10
    }
  }).then((response) => {
    setUsers(response.data.data)
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    console.log('request finished')
  })
 }

 const getPerson = (id) => {
  axios.get(`https://api.pipedrive.com/v1/persons/${id}`, {
    params: {
      api_token: '8610b4332627a0d69688ddb3f12f1d246339361c',
    }
  }).then((response) => {
    setEmail(response.data.data.email[0].value)
    if (email) {
      handleOpen()
    }
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    console.log('request finished')
  })
 }

  return (
    <div className="App">
      <HeaderComponent />
      <SearchComponent />
      <TextField value={name} onChange={handleNameChange} id="standard-basic" label="Standard" />
      <Button onClick={requestPersons} variant="contained">Default</Button>
        {users.map(user => (
      <CardComponent name={user.name} key={user.id} details={ () => getPerson(user.id)} />
     ))}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">

      <div style={{
        position: 'fixed',
        width: 100,
        top: 100,
        right: 100,
        }}> <h1>{email}</h1> </div> 
      </Modal>
    </div>
  );
}

export default App;
