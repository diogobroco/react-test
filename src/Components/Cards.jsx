const CardComponent = ({name, details}) => {
  return (
    <div onClick={details}>
      {name}
    </div>
  )
}

export default CardComponent