import { Modal } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';


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

const UserModal = ({open, handleClose, user, deleteUser }) => {
  const classes = useStyles();
  const { name } = user;
  const defaultPicture = "https://www.nicepng.com/png/full/522-5226533_get-beyond-the-usual-suspects-profile-pic-icon.png";
  const pictureUrl = user.picture_id ? user.picture_id.pictures["128"] : defaultPicture;

  
  return (

<Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description">
    <div className={classes.paper}>
      <div className="modal-header">
        <h2 id="simple-modal-title">Person Information</h2>
        <CloseIcon fontSize="small" className="close-icon"/>
      </div>
      <div id="simple-modal-description">
        <img src={pictureUrl} alt="user" />
        <h1>{name}</h1>
        PHONE
        {/* <h1>{mainPhone}</h1> */}
        <p></p>
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
          <h4>{user.email?.length > 0 ? user.email[0].value : "No email"}</h4>
          <h4>{user.org_name}</h4>
          <h4>Cpdsadsad</h4>
          <h4>{user['4f87d77f9a870537b7d2619018f6d7d18fb5fab8']}</h4>
          <h4>{user.postal_address_formatted_address}</h4>
        </div>
      </div>
      <div className="contact-table-footer">
        <button onClick={deleteUser}>Delete</button>
        <button className="back-btn">Back</button>
      </div>
    </div>
  </Modal>
  )
}

export default UserModal
