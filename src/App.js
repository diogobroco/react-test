import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from './Components/Cards';
import HeaderComponent from './Components/HeaderComponent';
import SearchComponent from './Components/SearchComponent';
import UserModal from './Components/UserModal';


function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    requestPersons()
  },[])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 /*  const handleNameChange = (event) => {
    setName(event.currentTarget.value)
  } */

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
    setSelectedUser(response.data.data)
    handleOpen()
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
      {/* <TextField value={name} onChange={handleNameChange} id="standard-basic" label="Standard" /> */}
     {/*  <Button onClick={requestPersons} variant="contained">Default</Button> */}
      {users.map(user => (
      <CardComponent name={user.name} org={user.org_name} picture={user.picture_id} key={user.id} details={ () => getPerson(user.id)} />
     ))}
      <UserModal open={open} handleClose={handleClose} user={selectedUser} />
    </div>
  );
}

export default App;
