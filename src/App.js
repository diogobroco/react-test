import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import CardComponent from './Components/Cards';
import HeaderComponent from './Components/HeaderComponent';
import SearchComponent from './Components/SearchComponent';
import UserModal from './Components/UserModal';
import LoadItems from './Components/LoadItems';
import FooterComponent from './Components/Footer';
import CreateUserModal from './Components/CreateUserModal';



function App() {
  const [selectedUser, setSelectedUser] = useState("");
  const [pagination, setPagination] = useState(0);
  const [users, setUsers] = useState([]);
  const [openUserDetailsModal, setOpenUserDetailsModal] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);


  useEffect(() => {
    requestPersons()
  },[])

  const handleOpenUserDetails = () => {
    setOpenUserDetailsModal(true);
  };

  const handleCloseUserDetails = () => {
    setOpenUserDetailsModal(false);
  };

  const handleOpenCreateUser = () => {
    setOpenCreateUserModal(true);
  };

  const handleCloseCreateUser = () => {
    setOpenCreateUserModal(false);
  };

 const requestPersons = () => {
  axios.get('https://api.pipedrive.com/v1/persons', {
    params: {
      api_token: '8610b4332627a0d69688ddb3f12f1d246339361c',
      limit: 10,
      start: pagination
    }
  }).then((response) => {
    setUsers((previous) => [...previous, ...response.data.data])
    setPagination((previous) => previous + 10)
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
    handleOpenUserDetails()
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    console.log('request finished')
  })
 }

 const deletePerson = (id) => {
  axios.delete(`https://api.pipedrive.com/v1/persons/${id}`, {
    params: {
      api_token: '8610b4332627a0d69688ddb3f12f1d246339361c',
    }
  }).then((response) => {
    requestPersons()
    handleCloseUserDetails()
  }).catch((error) => {
    console.log(error)
  }).then(() => {
  })
 }

  return (
    <div className="App">
      <HeaderComponent />
      <SearchComponent createUser={handleOpenCreateUser}/>
      <DragDropContext>
        <Droppable droppableId="persons">
          {(provided, snapshot)=> (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {users.map((user, index) => (
                <Draggable draggableId="persons-cards" key={user.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div>
                        <CardComponent name={user.name} org={user.org_name} picture={user.picture_id} key={user.id} details={ () => getPerson(user.id)} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <UserModal open={openUserDetailsModal} handleClose={handleCloseUserDetails} user={selectedUser} deleteUser={ () => deletePerson(selectedUser.id)}/>
      <CreateUserModal open={openCreateUserModal} handleClose={handleCloseCreateUser}/>
      <LoadItems moreUsers={requestPersons}/>
      <FooterComponent />
    </div>
  );
}

export default App;
