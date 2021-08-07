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
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const UserModal = ({open, handleClose, user}) => {
  const classes = useStyles();
  const { name } = user;
  return (

<Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description">
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Person Information</h2>
      <div id="simple-modal-description">
        <h1>{name}</h1>

      </div>
    </div>
  </Modal>
  )
}

export default UserModal
