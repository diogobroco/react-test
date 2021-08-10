import { Modal } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

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


const CreateUserModal = ({open, handleClose}) => {
  const classes = useStyles();

  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description">
    <div className={classes.paper}>
      <div className="modal-header">
        <h2 id="simple-modal-title">Create User</h2>
      </div>

      <div className="contact-table">
        <div className="contact-groups">
          <h4>Email</h4>
          <h4>Organization</h4>
          <h4>Assistant</h4>
          <h4>Groups</h4>
          <h4>Location</h4>
        </div>
        <div className="contact-details">
         
        </div>
      </div>
      <div className="contact-table-footer">
        <button className="back-btn">Back</button>
      </div>
    </div>
  </Modal>
  )
}

export default CreateUserModal