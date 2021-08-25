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


const App = () => {
  /* Main States of the Contact List */
  const [selectedUser, setSelectedUser] = useState("");
  const [pagination, setPagination] = useState(0);
  const [users, setUsers] = useState([]);
  const [openUserDetailsModal, setOpenUserDetailsModal] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);

/* Request the List of Person */

  useEffect(() => {
    requestPersons()
  },[])

  /* Open and Close the Modals */

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

  const handleCloseBackBtn = () => {
    setOpenUserDetailsModal(false);
    setOpenCreateUserModal(false);
  }

  /* React DnD functions */

  const reorder = (users, startIndex, endIndex) => {
    const result = Array.from(users);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onEnd = (result) => {
/*     console.log(result)       To check the path
 */    setUsers(reorder(users, result.source.index, result.destination.index))
  }

/* API Requests - GET Persons */

 const requestPersons = () => {
  axios.get('https://api.pipedrive.com/v1/persons', {
    params: {
      api_token: "X",
      limit: 10,
      start: pagination
    }
  }).then((response) => {
    setUsers((previous) => [...previous, ...response.data.data])  /* Bring the first 10 Persons */
    setPagination((previous) => previous + 10)  /* Bring 10 more */
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    console.log('request finished')
  })
 }

 /* API Requests - GET Single Person */

 const getPerson = (id) => {
  axios.get(`https://api.pipedrive.com/v1/persons/${id}`, {
    params: {
      api_token: 'X',
    }
  }).then((response) => {
    setSelectedUser(response.data.data)  /* Brings the data of Person_id selected */
    handleOpenUserDetails()  /* Opens the Person Modal */
  }).catch((error) => {
    console.log(error)
  }).then(() => {
    console.log('request finished')
  })
 }

 /* API Requests - DELETE Person */

 const deletePerson = (id) => {
  axios.delete(`https://api.pipedrive.com/v1/persons/${id}`, {
    params: {
      api_token: 'X',
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
      <DragDropContext onDragEnd={onEnd}>            {/* It provides and saves the new index position */}
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {users.map((user, index) => (
                <Draggable draggableId={`${user.id}`} key={user.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div>
                        <CardComponent name={user.name} org={user.org_name} picture={user.picture_id} key={user.id} 
                        details={ () => getPerson(user.id)} />
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
      <UserModal open={openUserDetailsModal} handleClose={handleCloseUserDetails} user={selectedUser} 
        backBtn={handleCloseBackBtn} deleteUser={ () => deletePerson(selectedUser.id)}/>
      <CreateUserModal open={openCreateUserModal} handleClose={handleCloseCreateUser} backBtn={handleCloseBackBtn} />
      <LoadItems moreUsers={requestPersons}/>
      <FooterComponent />
    </div>
  );
}

export default App;
