import { useState, useEffect } from "react";
import axios from 'axios';
import { Modal } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

/* Material UI Modal styles */

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));


const CreateUserModal = ({open, handleClose, backBtn }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [org_id, setOrgId] = useState('');
  const [organizations, setOrganizations] = useState('');
  const [assistant, setAssistant] = useState('');
  const [groups, setGroups] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    requestOrganizations()
  },[])

  const requestOrganizations = () => {
    axios.get('https://api.pipedrive.com/v1/organizations', {
      params: {
        api_token: '8610b4332627a0d69688ddb3f12f1d246339361c',
      }
    }).then((response) => {
      setOrganizations(response.data.data)
    }).catch((error) => {
      console.log(error)
    }).then(() => {
      console.log('request finished')
    })
   }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://api.pipedrive.com/v1/persons?api_token=8610b4332627a0d69688ddb3f12f1d246339361c', {
      name, 
      phone, 
      email, 
      org_id,
      '334f8bfe885814233f46c34393750a141410f8b8': assistant, 
      '4f87d77f9a870537b7d2619018f6d7d18fb5fab8': groups, 
      postal_address_formatted_address: location 
    }).then((response) => {
      handleClose()
    }).catch((error) => {
      console.log(error)
    }).then(() => {
      console.log('Person Added')
    })
  }

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description">
    <div className={classes.paper}>
      <div className="modal-header">
        <h2 id="simple-modal-title">Create Person</h2>
        <CloseIcon fontSize="small" className="close-icon" onClick={backBtn} />
      </div>

      <div className="contact-table">
        <div className="contact-groups">
          <h4>Name:</h4>
          <h4>Phone:</h4>
          <h4>Email:</h4>
          <h4>Organization:</h4>
          <h4>Assistant:</h4>
          <h4>Groups:</h4>
          <h4>Location:</h4>
        </div>
        <div className="contact-details">
          <form className="standard-basic" >
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" autoComplete='off'/>
          
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field"/>
          
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field"/>
        
            <Autocomplete
              id="combo-box-demo"
              options={organizations}
              getOptionLabel={(option) => option.name}
              style={{ width: 162 }}
              onChange={(event, newValue) => setOrgId(newValue.id)}
              renderInput={(params) => <TextField {...params} label="" autoComplete='off' />}
            />
            <input type="text" value={assistant} onChange={(e) => setAssistant(e.target.value)} className="input-field"/>
          
            <input type="text" value={groups} onChange={(e) => setGroups(e.target.value)} className="input-field"/>
          
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input-field"/>
          </form>
        </div>
      </div>
      <div className="contact-table-footer">
        <button type="submit" className="create-person-btn"  onClick={handleSubmit}>Create Person</button>
        <button className="create-back-btn" onClick={backBtn} >Back</button>
      </div>
    </div>
  </Modal>
  )
}

export default CreateUserModal