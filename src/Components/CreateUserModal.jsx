import { Modal } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react";
import axios from 'axios';


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
  const [organization, setOrganization] = useState('');
  const [assistant, setAssistant] = useState('');
  const [groups, setGroups] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const personCreated = { name, phone, email, organization, assistant, groups, location };

    axios.post('https://api.pipedrive.com/v1/persons', {
      params: {
        api_token: '8610b4332627a0d69688ddb3f12f1d246339361c',
      }
    }).then((response) => {
      personCreated()
    }).catch((error) => {
      console.log(error)
    }).then(() => {
      console.log('request finished')
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
          <form className="standard-basic"  autoComplete="off">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field"/>
          
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="input-field"/>
          
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field"/>
          
            <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} className="input-field"/>
          
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