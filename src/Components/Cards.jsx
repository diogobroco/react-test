import BusinessIcon from '@material-ui/icons/Business';

const CardComponent = ({name, org, picture, details}) => {
  const defaultPicture = "https://www.nicepng.com/png/full/522-5226533_get-beyond-the-usual-suspects-profile-pic-icon.png";
  const pictureUrl = picture ? picture.pictures["128"] : defaultPicture;
  return (
    <div onClick={details}>
      <div className="main-card">
        <div className="card-details">
            <p id="contact-name">{name}</p>
          <div className="business-details">
            <span><BusinessIcon className="business-icon"/></span>  
            <p id="org-name">{org}</p> 
          </div>
        </div>
        <div className="contact-picture">
          <img src={pictureUrl} alt="user" />
        </div>
      </div>
    </div>
  )
}

export default CardComponent